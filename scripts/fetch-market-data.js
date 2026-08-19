// scripts/fetch-market-data.js
// 매일 아침(KST 06:00) 자동 실행:
//   1. 사업부별 키워드로 산업 뉴스 수집 (승용/SDV/AVP/수소/AAM/로보틱스 + 경쟁사)
//   2. 원/달러 환율 수집 (해외 CAPEX·원자재 비용에 직결되는 실제 시장 지표)
//   3. data/market.json 으로 저장 (기존 뉴스는 유지하고 새 뉴스만 누적)

import { writeFileSync, readFileSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';

// 사업부(division) 별 검색 키워드. division 값은 index.html의 project.division과 동일하게 맞춤.
const DIVISION_QUERIES = {
  '승용사업부': ['현대차 전기차 하이브리드 생산'],
  'SDV본부': ['SDV 소프트웨어 정의 차량'],
  'AVP본부': ['자율주행 레벨4 자동차'],
  '수소연료전지': ['현대차 수소 연료전지 HTWO'],
  'AAM본부': ['도심항공교통 eVTOL 현대'],
  '로보틱스LAB': ['보스턴 다이내믹스 로봇'],
  '경쟁사': ['테슬라 GM 폭스바겐 전기차 투자'],
};

const ITEMS_PER_QUERY = 3;

const parser = new XMLParser({ ignoreAttributes: false });

function titleTokens(title) {
  const cleaned = (title || '')
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .toLowerCase();
  return new Set(cleaned.split(/\s+/).filter((w) => w.length >= 2));
}

function titleSimilarity(a, b) {
  const setA = titleTokens(a);
  const setB = titleTokens(b);
  if (!setA.size || !setB.size) return 0;
  let overlap = 0;
  for (const w of setA) if (setB.has(w)) overlap++;
  return overlap / Math.min(setA.size, setB.size);
}

async function fetchNewsFor(division, query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&hl=ko&gl=KR&ceid=KR:ko`;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`뉴스 요청 실패 (${query}): ${res.status}`);
    return [];
  }
  const xml = await res.text();
  const parsed = parser.parse(xml);
  const rawItems = parsed?.rss?.channel?.item ?? [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  return items.slice(0, ITEMS_PER_QUERY).map((it) => {
    const d = it.pubDate ? new Date(it.pubDate) : new Date();
    return {
      division,
      d: d.toISOString().slice(0, 10),
      _sortDate: d.toISOString(),
      t: (it.title || '').replace(/\s*-\s*[^-]+$/, ''),
      s: it?.source?.['#text'] ?? it?.source ?? '',
      u: it.link || '',
    };
  });
}

async function fetchFxRate() {
  try {
    // open.er-api.com: API 키 없이 무료로 쓸 수 있는 환율 조회 서비스
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error(`FX 요청 실패: ${res.status}`);
    const data = await res.json();
    const krw = data?.rates?.KRW;
    if (!krw) throw new Error('KRW 환율 필드 없음');
    return { usdkrw: Math.round(krw * 100) / 100, updatedAt: new Date().toISOString() };
  } catch (err) {
    console.warn('환율 수집 실패, 이번엔 건너뜀:', err.message);
    return null;
  }
}

function loadExisting() {
  try {
    const raw = readFileSync('data/market.json', 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { news: [], fx: null, updatedAt: null };
  }
}

function mergeDedupe(existing, fresh, cap) {
  const merged = [...existing, ...fresh];
  merged.sort((a, b) => (b._sortDate || '').localeCompare(a._sortDate || ''));

  const seenUrls = new Set();
  const kept = [];
  for (const n of merged) {
    if (!n.u || seenUrls.has(n.u)) continue;
    const isDuplicate = kept.some((k) => titleSimilarity(k.t, n.t) >= 0.5);
    if (isDuplicate) continue;
    seenUrls.add(n.u);
    kept.push(n);
    if (kept.length >= cap) break;
  }
  return kept.map(({ _sortDate, ...rest }) => rest);
}

// ── 데일리 브리핑: 오늘 수집된 뉴스를 근거로 제미나이가 CAPEX 투자 관점 요약을 새로 씀 ──
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function todayLabel() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} (${WEEKDAYS[d.getDay()]})`;
}

async function generateBriefing(news, fx) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY가 없어 데일리 브리핑 생성을 건너뜁니다 (뉴스/환율은 정상 갱신됨).');
    return null;
  }

  const headlines = news.slice(0, 15).map((n) => `- [${n.division}] ${n.t}`).join('\n');
  const fxLine = fx ? `현재 원/달러 환율: ${fx.usdkrw}원` : '환율 데이터 없음';

  const prompt = `너는 현대자동차 투자기획실 CAPEX 심사 담당자다. 아래는 오늘 수집된 사업부별/경쟁사 뉴스와 환율 정보다. 이를 근거로 "오늘의 투자 환경 브리핑"을 작성하라.

[오늘의 뉴스 헤드라인]
${headlines}

[시장 지표]
${fxLine}

다음 JSON 형식으로만 답하라 (다른 텍스트, 코드블록 없이 순수 JSON만):
{"headline": "한 줄 핵심 헤드라인, CAPEX 투자 의사결정 관점 (30자 내외)", "points": ["포인트1: 사업부 관련 동향 (50자 내외)", "포인트2: 경쟁사 동향 또는 리스크", "포인트3: 시사점(So what)"]}`;

  try {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 4096 },
        }),
      }
    );
    if (!res.ok) {
      console.warn('브리핑 생성 API 오류:', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const raw = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('\n').trim();
    let cleaned = raw.replace(/```json|```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      cleaned = cleaned.slice(start, end + 1);
    }
    const parsed = JSON.parse(cleaned);
    if (!parsed.headline || !Array.isArray(parsed.points)) throw new Error('형식 오류');
    return { date: todayLabel(), headline: parsed.headline, points: parsed.points, updatedAt: new Date().toISOString() };
  } catch (err) {
    console.warn('브리핑 생성 실패, 기존 브리핑 유지:', err.message);
    return null;
  }
}

async function main() {
  const existing = loadExisting();

  const fresh = [];
  for (const [division, queries] of Object.entries(DIVISION_QUERIES)) {
    for (const q of queries) {
      fresh.push(...(await fetchNewsFor(division, q)));
    }
  }

  const news = mergeDedupe(existing.news || [], fresh, 40);
  const fx = (await fetchFxRate()) || existing.fx;

  const output = { news, fx, updatedAt: new Date().toISOString() };
  writeFileSync('data/market.json', JSON.stringify(output, null, 2), 'utf-8');
  console.log(
    `market.json 갱신 완료: 뉴스 ${news.length}건 (기존 ${(existing.news || []).length}건에서 누적), 환율 ${
      fx ? fx.usdkrw + '원' : '갱신 실패, 기존값 유지'
    }`
  );

  const briefing = await generateBriefing(news, fx);
  if (briefing) {
    writeFileSync('data/briefing.json', JSON.stringify(briefing, null, 2), 'utf-8');
    console.log('briefing.json 갱신 완료:', briefing.headline);
  } else {
    console.log('briefing.json은 이번엔 갱신하지 않음 (기존 파일 유지)');
  }
}

main().catch((err) => {
  console.error('데이터 수집 실패:', err);
  process.exit(1);
});
