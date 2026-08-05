[index.html.html](https://github.com/user-attachments/files/30733195/index.html.html)
<!DOCTYPE html>
<html lang="ko" class="h-full dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H-Capital Matrix | 현대자동차 2025 공시 데이터 기반 CAPEX 투자 심사 및 스코어링 시스템</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        hyundai: {
                            950: '#060a12',
                            900: '#090d16',
                            800: '#111827',
                            700: '#1f293d',
                            600: '#2d3b54',
                            blue: '#002C5F',
                            cyan: '#00A3E0',
                            accent: '#38bdf8'
                        }
                    },
                    fontFamily: {
                        sans: ['Pretendard', 'Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Pretendard Font -->
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Pretendard', sans-serif; background-color: #090d16; color: #f3f4f6; }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #00A3E0;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 163, 224, 0.5);
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #090d16; }
        ::-webkit-scrollbar-thumb { background: #1f293d; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #2d3b54; }
    </style>
</head>
<body class="h-full bg-hyundai-900 text-slate-100 flex flex-col antialiased selection:bg-hyundai-cyan selection:text-black">

    <!-- Top Header Navigation -->
    <header class="bg-hyundai-950/90 backdrop-blur border-b border-slate-800/80 sticky top-0 z-40">
        <div class="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <!-- Hyundai Logo Emblem -->
                <div class="bg-hyundai-blue text-white px-3 py-1.5 rounded-md font-extrabold text-sm tracking-wider flex items-center shadow-lg shadow-hyundai-blue/30 border border-cyan-500/20">
                    <span class="text-xs mr-1 text-hyundai-cyan"><i class="fa-solid fa-layer-group"></i></span> HYUNDAI
                </div>
                <div class="h-5 w-px bg-slate-800"></div>
                <div>
                    <div class="flex items-center space-x-2">
                        <h1 class="text-base font-bold tracking-tight text-white">H-Capital Matrix</h1>
                        <span class="bg-hyundai-cyan/20 text-hyundai-cyan border border-hyundai-cyan/30 text-[10px] font-semibold px-2 py-0.5 rounded">2025 IR Reference</span>
                    </div>
                    <p class="text-[11px] text-slate-400 hidden sm:block">전사 CAPEX 투자 심사 및 사업부별 우선순위 스코어링 시스템</p>
                </div>
            </div>

            <!-- Header Right Controls & Scenario Selector -->
            <div class="flex items-center space-x-3">
                <!-- Scenario Mode Badge -->
                <div class="hidden md:flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span class="text-slate-400 font-medium">평가 시나리오:</span>
                    <select id="scenario-selector" onchange="changeScenario(this.value)" class="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer">
                        <option value="base" class="bg-slate-900 text-white">Base Case (기본)</option>
                        <option value="sdv" class="bg-slate-900 text-white">전동화·SDV 가속 (전략우선)</option>
                        <option value="conservative" class="bg-slate-900 text-white">보수적 리스크 강화 (수익우선)</option>
                    </select>
                </div>
                <button onclick="openAddModal()" class="bg-hyundai-cyan hover:bg-cyan-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg shadow-lg shadow-hyundai-cyan/20 transition duration-150 flex items-center">
                    <i class="fa-solid fa-plus mr-1.5 text-sm"></i> 신규 안건 등록
                </button>
            </div>
        </div>
    </header>

    <main class="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4 overflow-y-auto">

        <!-- 2025 Hyundai Public Disclosure Reference Banner -->
        <div class="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between text-xs gap-3">
            <div class="flex items-center space-x-2 text-slate-300">
                <span class="bg-blue-900/60 text-cyan-400 border border-cyan-500/30 font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">2025 공시 팩트시트</span>
                <span class="text-slate-400">현대자동차 '25년 경영실적 및 투자 가이던스 기준</span>
            </div>
            <div class="flex flex-wrap items-center gap-4 text-[11px] font-medium text-slate-300">
                <div><span class="text-slate-500">연결 매출액:</span> <span class="text-white font-bold">186.2조 원</span> <span class="text-emerald-400 text-[10px]">(+6.3%)</span></div>
                <div class="h-3 w-px bg-slate-800"></div>
                <div><span class="text-slate-500">영업이익:</span> <span class="text-white font-bold">11.5조 원</span></div>
                <div class="h-3 w-px bg-slate-800"></div>
                <div><span class="text-slate-500">전사 CAPEX 총예산:</span> <span class="text-amber-400 font-bold">9.0조 원</span> <span class="text-slate-500 text-[10px]">(R&D 7.4조 별도)</span></div>
            </div>
        </div>

        <!-- Top KPI Cards Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- KPI 1 -->
            <div class="bg-hyundai-800/90 p-4 rounded-xl border border-slate-800/80 shadow-md flex justify-between items-center relative overflow-hidden">
                <div class="space-y-1 z-10">
                    <p class="text-[11px] font-semibold text-slate-400">총 신청 CAPEX</p>
                    <div class="flex items-baseline space-x-1.5">
                        <h3 class="text-2xl font-black text-white tracking-tight" id="kpi-total-capex">72,800</h3>
                        <span class="text-xs font-bold text-slate-400">억 원</span>
                    </div>
                    <p class="text-[11px] text-slate-400" id="kpi-project-count-sub">전체 <span class="text-white font-bold">6개</span> 심사 안건</p>
                </div>
                <div class="p-3 bg-slate-900/80 border border-slate-800 text-cyan-400 rounded-xl z-10">
                    <i class="fa-solid fa-coins text-xl"></i>
                </div>
            </div>

            <!-- KPI 2 -->
            <div class="bg-hyundai-800/90 p-4 rounded-xl border border-slate-800/80 shadow-md flex justify-between items-center relative overflow-hidden">
                <div class="space-y-1 z-10">
                    <p class="text-[11px] font-semibold text-slate-400">통과 안건 (Pass)</p>
                    <div class="flex items-baseline space-x-2">
                        <h3 class="text-2xl font-black text-emerald-400 tracking-tight" id="kpi-pass-count">5</h3>
                        <span class="text-xs font-semibold text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20" id="kpi-pass-rate">83.3%</span>
                    </div>
                    <p class="text-[11px] text-slate-400">배정 확정 예산: <span class="text-white font-bold" id="kpi-approved-capex">64,000</span>억 원</p>
                </div>
                <div class="p-3 bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 rounded-xl z-10">
                    <i class="fa-solid fa-circle-check text-xl"></i>
                </div>
            </div>

            <!-- KPI 3 -->
            <div class="bg-hyundai-800/90 p-4 rounded-xl border border-slate-800/80 shadow-md flex justify-between items-center relative overflow-hidden">
                <div class="space-y-1 z-10">
                    <p class="text-[11px] font-semibold text-slate-400">평균 종합 Score</p>
                    <div class="flex items-baseline space-x-1">
                        <h3 class="text-2xl font-black text-amber-400 tracking-tight" id="kpi-avg-score">72.4</h3>
                        <span class="text-xs font-semibold text-slate-400">/ 100점</span>
                    </div>
                    <p class="text-[11px] text-slate-400">통과 기준점수(Hurdle): <span class="text-amber-400 font-bold" id="kpi-hurdle-disp">65</span>점</p>
                </div>
                <div class="p-3 bg-amber-950/40 border border-amber-800/40 text-amber-400 rounded-xl z-10">
                    <i class="fa-solid fa-chart-line text-xl"></i>
                </div>
            </div>

            <!-- KPI 4 -->
            <div class="bg-hyundai-800/90 p-4 rounded-xl border border-slate-800/80 shadow-md flex justify-between items-center relative overflow-hidden">
                <div class="space-y-1 z-10">
                    <p class="text-[11px] font-semibold text-slate-400">2025 CAPEX 예산 소진율</p>
                    <div class="flex items-baseline space-x-1.5">
                        <h3 class="text-2xl font-black text-hyundai-cyan tracking-tight" id="kpi-capex-budget-rate">80.9%</h3>
                        <span class="text-xs font-bold text-slate-400">/ 9.0조 원</span>
                    </div>
                    <p class="text-[11px] text-slate-400">잔여 CAPEX 여력: <span class="text-emerald-400 font-bold" id="kpi-remaining-capex">26,000</span>억 원</p>
                </div>
                <div class="p-3 bg-cyan-950/40 border border-cyan-800/40 text-hyundai-cyan rounded-xl z-10">
                    <i class="fa-solid fa-scale-balanced text-xl"></i>
                </div>
            </div>
        </div>

        <!-- Middle Main Section: Sliders Left (5 Cols) vs Matrix Right (7 Cols) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">

            <!-- LEFT: Weight Configuration Panel -->
            <div class="lg:col-span-5 bg-hyundai-800/90 p-5 rounded-xl border border-slate-800/80 shadow-md flex flex-col justify-between space-y-4">
                <div>
                    <!-- Panel Header -->
                    <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div class="flex items-center space-x-2">
                            <i class="fa-solid fa-sliders text-hyundai-cyan"></i>
                            <h2 class="text-sm font-bold text-white tracking-wide">평가 가중치(Weight) 및 파라미터 설정</h2>
                        </div>
                        <button onclick="resetWeights()" class="text-[11px] text-slate-400 hover:text-white transition flex items-center">
                            <i class="fa-solid fa-rotate-right mr-1"></i> 초기화
                        </button>
                    </div>

                    <!-- Sliders List -->
                    <div class="space-y-4 text-xs mt-4">
                        <!-- Weight 1: Financial Return -->
                        <div class="space-y-1.5">
                            <div class="flex justify-between items-center font-medium">
                                <span class="text-slate-200">1. 수익성 (Financial Return)</span>
                                <span class="text-hyundai-cyan font-bold text-sm" id="disp-w-fin">30%</span>
                            </div>
                            <input type="range" id="slider-w-fin" min="0" max="60" value="30" oninput="updateCalculations()" class="w-full bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer">
                            <p class="text-[10px] text-slate-500">2025 WACC(7.8%) 기준 $NPV$, $IRR$, Payback Period 평가</p>
                        </div>

                        <!-- Weight 2: Strategic Alignment -->
                        <div class="space-y-1.5">
                            <div class="flex justify-between items-center font-medium">
                                <span class="text-slate-200">2. 전략 가치 (Strategic Alignment)</span>
                                <span class="text-hyundai-cyan font-bold text-sm" id="disp-w-strat">30%</span>
                            </div>
                            <input type="range" id="slider-w-strat" min="0" max="60" value="30" oninput="updateCalculations()" class="w-full bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer">
                            <p class="text-[10px] text-slate-500">2030 전동화, SDV(Pleos OS), AVP 자율주행 전략 기여도</p>
                        </div>

                        <!-- Weight 3: Capital Efficiency -->
                        <div class="space-y-1.5">
                            <div class="flex justify-between items-center font-medium">
                                <span class="text-slate-200">3. 투자 효율 (Capital Efficiency)</span>
                                <span class="text-hyundai-cyan font-bold text-sm" id="disp-w-eff">20%</span>
                            </div>
                            <input type="range" id="slider-w-eff" min="0" max="50" value="20" oninput="updateCalculations()" class="w-full bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer">
                            <p class="text-[10px] text-slate-500">ROIC, 1,000억원당 EBITDA 창출 효율성</p>
                        </div>

                        <!-- Weight 4: Risk Penalty -->
                        <div class="space-y-1.5">
                            <div class="flex justify-between items-center font-medium">
                                <span class="text-slate-200">4. 리스크 감점 (Risk Penalty)</span>
                                <span class="text-rose-400 font-bold text-sm" id="disp-w-risk">20%</span>
                            </div>
                            <input type="range" id="slider-w-risk" min="0" max="40" value="20" oninput="updateCalculations()" class="w-full bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer">
                            <p class="text-[10px] text-slate-500">관세/공급망, 지정학적 리스크, 규제 대응성 차감</p>
                        </div>

                        <!-- Hurdle Score Input -->
                        <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                            <label class="text-xs font-semibold text-slate-300">통과 허들 점수 (Hurdle Score)</label>
                            <div class="flex items-center space-x-1">
                                <input type="number" id="inp-hurdle-score" value="65" min="40" max="90" oninput="updateCalculations()" class="w-16 bg-slate-900 border border-slate-700 text-amber-400 text-center font-bold text-xs py-1 rounded focus:outline-none focus:border-hyundai-cyan">
                                <span class="text-xs text-slate-400">점</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Guidance Box -->
                <div class="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3 text-[11px] space-y-1">
                    <div class="flex items-center text-amber-400 font-bold space-x-1.5">
                        <i class="fa-solid fa-lightbulb"></i>
                        <span>투자기획실 심사 가이드</span>
                    </div>
                    <p class="text-slate-400 leading-relaxed">
                        현대자동차 2025 공시 투자 예산(CAPEX 9.0조 원) 범위 내에서 각 사업부 제출 안건의 가중합산 스코어가 실시간 산출되며, Hurdle 달성 시 승인 확정(Pass)됩니다.
                    </p>
                </div>
            </div>

            <!-- RIGHT: Prioritization Matrix 4-Quadrant Bubble Chart -->
            <div class="lg:col-span-7 bg-hyundai-800/90 p-5 rounded-xl border border-slate-800/80 shadow-md flex flex-col justify-between">
                <div>
                    <!-- Header -->
                    <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div>
                            <div class="flex items-center space-x-2">
                                <i class="fa-solid fa-chart-pie text-hyundai-cyan"></i>
                                <h2 class="text-sm font-bold text-white tracking-wide">사업부별 투자 매트릭스 (Prioritization Matrix)</h2>
                            </div>
                            <p class="text-[11px] text-slate-400 mt-0.5">X축: 수익성 점수 | Y축: 전략 가치 점수 | 버블 크기: 필요 CAPEX 예산</p>
                        </div>
                        <div class="flex items-center space-x-3 text-xs">
                            <span class="flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block mr-1.5"></span> 통과 (Pass)</span>
                            <span class="flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block mr-1.5"></span> 보류/재검토 (Review)</span>
                        </div>
                    </div>

                    <!-- Chart Canvas Box -->
                    <div class="relative w-full h-[310px] mt-3 bg-slate-950/60 rounded-xl border border-slate-800/80 p-2">
                        <canvas id="matrixChart"></canvas>
                    </div>
                </div>

                <!-- Quadrant Navigation Buttons -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-center text-[11px]">
                    <button onclick="filterQuadrant('q1')" id="btn-q1" class="py-1.5 px-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-900/50 transition font-medium">
                        1분면: 우선 투자 (Pass)
                    </button>
                    <button onclick="filterQuadrant('q2')" id="btn-q2" class="py-1.5 px-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-800 transition font-medium">
                        2분면: 전략적 육성
                    </button>
                    <button onclick="filterQuadrant('q4')" id="btn-q4" class="py-1.5 px-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-800 transition font-medium">
                        4분면: 수익 창출
                    </button>
                    <button onclick="filterQuadrant('q3')" id="btn-q3" class="py-1.5 px-2 bg-rose-950/40 border border-rose-500/30 text-rose-300 rounded-lg hover:bg-rose-900/50 transition font-medium">
                        3분면: 축소/재검토
                    </button>
                </div>
            </div>
        </div>

        <!-- BOTTOM: Ranking Table Section -->
        <div class="bg-hyundai-800/90 p-5 rounded-xl border border-slate-800/80 shadow-md">
            <!-- Table Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                <div>
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-list-ol text-hyundai-cyan"></i>
                        <h2 class="text-sm font-bold text-white tracking-wide">사업부별 투자 안건 우선순위 랭킹 (Prioritization Ranking)</h2>
                    </div>
                    <p class="text-[11px] text-slate-400 mt-0.5">2025 공시 기반 가중합산 점수 및 Hurdle 통과 여부에 따른 자동 정렬 (행 클릭 시 $NPV$/$IRR$ 상세 조회)</p>
                </div>
                <!-- Filter Dropdown -->
                <div class="flex items-center space-x-2 text-xs">
                    <span class="text-slate-400 font-medium">필터:</span>
                    <select id="filter-status" onchange="updateCalculations()" class="bg-slate-900 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-hyundai-cyan">
                        <option value="ALL">전체 보기</option>
                        <option value="Pass">통과 (Pass)만 보기</option>
                        <option value="Review">보류/재검토 (Review)만 보기</option>
                    </select>
                </div>
            </div>

            <!-- Table Container -->
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/50">
                            <th class="py-3 px-3 text-center w-12">순위</th>
                            <th class="py-3 px-3 w-28">사업부</th>
                            <th class="py-3 px-3">프로젝트 안건명</th>
                            <th class="py-3 px-3 text-right">CAPEX (억 원)</th>
                            <th class="py-3 px-3 text-center">수익성</th>
                            <th class="py-3 px-3 text-center">전략가치</th>
                            <th class="py-3 px-3 text-center">투자효율</th>
                            <th class="py-3 px-3 text-center">리스크</th>
                            <th class="py-3 px-3 text-center font-bold text-white">종합 SCORE</th>
                            <th class="py-3 px-3 text-center">심사 결과</th>
                            <th class="py-3 px-3 text-center w-20">상세 / 삭제</th>
                        </tr>
                    </thead>
                    <tbody id="ranking-table-body" class="divide-y divide-slate-800/60 font-medium">
                        <!-- Populated Dynamic JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>

    </main>

    <!-- Modal: Add New Project -->
    <div id="modal-add" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
        <div class="bg-hyundai-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                <h3 class="text-sm font-bold text-white flex items-center">
                    <i class="fa-solid fa-plus-circle text-hyundai-cyan mr-2 text-base"></i> 신규 CAPEX 투자 심사 안건 등록
                </h3>
                <button onclick="closeAddModal()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>

            <form onsubmit="handleAddProject(event)" class="space-y-3.5">
                <div>
                    <label class="block text-slate-300 font-semibold mb-1">프로젝트 안건명</label>
                    <input type="text" id="add-name" required placeholder="예: 인도 스마트 모빌리티 신공장 라인 증설" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-hyundai-cyan">
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">주관 사업부</label>
                        <select id="add-division" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-hyundai-cyan">
                            <option value="SDV본부">SDV본부</option>
                            <option value="승용사업부">승용사업부</option>
                            <option value="AVP본부">AVP본부</option>
                            <option value="로보틱스LAB">로보틱스LAB</option>
                            <option value="수소연료전지">수소연료전지</option>
                            <option value="AAM본부">AAM본부</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">신청 CAPEX (억 원)</label>
                        <input type="number" id="add-capex" required value="1000" min="50" max="50000" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-hyundai-cyan">
                    </div>
                </div>

                <div class="border-t border-slate-700/80 pt-3">
                    <p class="font-bold text-slate-200 mb-2">평가 항목별 스코어 세팅 (0 ~ 100점)</p>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-slate-400 mb-1">수익성 점수 (Financial)</label>
                            <input type="number" id="add-fin" required value="75" min="0" max="100" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-slate-400 mb-1">전략가치 점수 (Strategic)</label>
                            <input type="number" id="add-strat" required value="85" min="0" max="100" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-slate-400 mb-1">투자효율 점수 (Efficiency)</label>
                            <input type="number" id="add-eff" required value="80" min="0" max="100" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-slate-400 mb-1">리스크 감점 (Penalty, 차감)</label>
                            <input type="number" id="add-risk" required value="10" min="0" max="50" placeholder="예: 10 입력시 -10점" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-rose-400 focus:outline-none">
                        </div>
                    </div>
                </div>

                <div class="pt-3 flex justify-end space-x-2 border-t border-slate-700">
                    <button type="button" onclick="closeAddModal()" class="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 font-semibold">취소</button>
                    <button type="submit" class="px-5 py-2 bg-hyundai-cyan text-slate-950 rounded-lg hover:bg-cyan-400 font-bold shadow-lg shadow-hyundai-cyan/20">등록 및 스코어링 반영</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal: Project NPV/IRR Detail Inspector -->
    <div id="modal-detail" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
        <div class="bg-hyundai-800 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-xs">
            <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                <div class="flex items-center space-x-2">
                    <span id="detail-badge" class="px-2 py-0.5 rounded text-[10px] font-bold bg-hyundai-blue text-cyan-400 border border-cyan-500/30">SDV본부</span>
                    <h3 class="text-sm font-bold text-white" id="detail-title">프로젝트 상세 심사 보고서</h3>
                </div>
                <button onclick="closeDetailModal()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>

            <div class="space-y-4">
                <div class="grid grid-cols-3 gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <div>
                        <p class="text-[10px] text-slate-400">신청 CAPEX</p>
                        <p class="text-sm font-black text-amber-400" id="detail-capex">15,000 억 원</p>
                    </div>
                    <div>
                        <p class="text-[10px] text-slate-400">추정 NPV (WACC 7.8%)</p>
                        <p class="text-sm font-black text-emerald-400" id="detail-npv">+3,420 억 원</p>
                    </div>
                    <div>
                        <p class="text-[10px] text-slate-400">추정 IRR</p>
                        <p class="text-sm font-black text-cyan-400" id="detail-irr">14.2%</p>
                    </div>
                </div>

                <div class="space-y-2">
                    <p class="font-bold text-slate-200 text-xs">2025 공시 연계 전략 타당성 분석</p>
                    <p class="text-slate-400 text-[11px] leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800" id="detail-desc">
                        본 안건은 현대자동차 2025년 주요 투자 지침인 SDV 전환 및 AI 핵심기술 투자군에 포함됩니다.
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-3 text-[11px]">
                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <span class="text-slate-400 font-medium">회수 기간 (Payback):</span>
                        <span class="text-white font-bold ml-1" id="detail-payback">3.8년</span>
                    </div>
                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <span class="text-slate-400 font-medium">1,000억당 EBITDA:</span>
                        <span class="text-white font-bold ml-1" id="detail-ebitda">240억 원</span>
                    </div>
                </div>
            </div>

            <div class="pt-3 flex justify-end border-t border-slate-700">
                <button type="button" onclick="closeDetailModal()" class="px-5 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 font-semibold">닫기</button>
            </div>
        </div>
    </div>

    <!-- JavaScript Data and Application Logic -->
    <script>
        // Datasets based on Hyundai Motor Company 2025 Public Financial Disclosures & Strategic IR Guidelines
        let initialProjects = [
            { 
                id: 1, 
                division: "승용사업부", 
                name: "북미 HMGMA EREV/HEV/EV 혼류생산 라인 전환", 
                capex: 28000, 
                fin: 92, 
                strat: 88, 
                eff: 88, 
                risk: -5,
                npv: 8900,
                irr: 18.5,
                payback: 3.2,
                ebitda: 310,
                desc: "2025 공시 발표에 기반한 북미 생산 유연성 확보 프로젝트. 전기차 캐즘에 대응하여 하이브리드(HEV) 및 주행거리 연장형 전기차(EREV) 혼류 생산 체계를 조기 구축함."
            },
            { 
                id: 2, 
                division: "SDV본부", 
                name: "차세대 SDV OS (Pleos) 및 AI SW 플랫폼 내재화", 
                capex: 15000, 
                fin: 78, 
                strat: 96, 
                eff: 82, 
                risk: -12,
                npv: 4200,
                irr: 15.1,
                payback: 4.1,
                ebitda: 250,
                desc: "전사 2025 핵심 연구개발 투자의 일환. 소프트웨어 중심 자동차(SDV) 전환을 위한 차세대 차량용 OS 및 중앙집중형 HW/SW 아키텍처 내재화."
            },
            { 
                id: 3, 
                division: "AVP본부", 
                name: "레벨4 자율주행 센서키트 & AI 딥러닝 모듈화", 
                capex: 9500, 
                fin: 68, 
                strat: 90, 
                eff: 72, 
                risk: -18,
                npv: 1850,
                irr: 11.8,
                payback: 4.8,
                ebitda: 190,
                desc: "Advanced Vehicle Platform 본부 주관 프로젝트. 자율주행 인공지능 알고리즘 및 고성능 라이다·카메라 융합 센서키트 양산 플랫폼 개발."
            },
            { 
                id: 4, 
                division: "수소연료전지", 
                name: "HTWO 3세대 수소연료전지 스택 양산 라인", 
                capex: 8800, 
                fin: 58, 
                strat: 85, 
                eff: 60, 
                risk: -22,
                npv: 450,
                irr: 8.9,
                payback: 6.2,
                ebitda: 140,
                desc: "현대차 수소 브랜드 HTWO 연계 투자. 내구성 및 출력 밀도가 향상된 3세대 수소연료전지 스택 및 발전/상용 라인업 공정 구축."
            },
            { 
                id: 5, 
                division: "AAM본부", 
                name: "Supernal eVTOL 미래항공모빌리티 시험생산 시설", 
                capex: 6500, 
                fin: 50, 
                strat: 88, 
                eff: 55, 
                risk: -25,
                npv: -320,
                irr: 6.2,
                payback: 7.5,
                ebitda: 95,
                desc: "미국 자회사 Supernal 연계 AAM(도심항공교통) 전기수직이착륙기 시제기 제작 및 미국 FAA 인증용 시험 생산 거점 투자."
            },
            { 
                id: 6, 
                division: "로보틱스LAB", 
                name: "스마트팩토리(E-FOREST) 협동로봇 및 물류자동화", 
                capex: 5200, 
                fin: 84, 
                strat: 82, 
                eff: 86, 
                risk: -8,
                npv: 2100,
                irr: 16.4,
                payback: 3.4,
                ebitda: 280,
                desc: "보스턴 다이내믹스 기술 융합 및 울산/지능형 신공장 적용을 위한 스마트팩토리 물류 로봇 및 생산 자동화 모듈 상용화."
            }
        ];

        let projects = [...initialProjects];
        let matrixChartInstance = null;

        // Recalculate weights and update UI
        function updateCalculations() {
            const wFin = parseInt(document.getElementById('slider-w-fin').value) / 100;
            const wStrat = parseInt(document.getElementById('slider-w-strat').value) / 100;
            const wEff = parseInt(document.getElementById('slider-w-eff').value) / 100;
            const wRisk = parseInt(document.getElementById('slider-w-risk').value) / 100;
            const hurdleScore = parseFloat(document.getElementById('inp-hurdle-score').value) || 65;

            // Display weight percentages
            document.getElementById('disp-w-fin').innerText = `${Math.round(wFin * 100)}%`;
            document.getElementById('disp-w-strat').innerText = `${Math.round(wStrat * 100)}%`;
            document.getElementById('disp-w-eff').innerText = `${Math.round(wEff * 100)}%`;
            document.getElementById('disp-w-risk').innerText = `${Math.round(wRisk * 100)}%`;

            document.getElementById('kpi-hurdle-disp').innerText = hurdleScore;

            // Calculate each project score
            projects.forEach(p => {
                const total = (p.fin * wFin) + (p.strat * wStrat) + (p.eff * wEff) + (p.risk * wRisk);
                p.totalScore = parseFloat(total.toFixed(1));
                p.status = p.totalScore >= hurdleScore ? 'Pass' : 'Review';
            });

            // Sort descending by totalScore
            projects.sort((a, b) => b.totalScore - a.totalScore);

            // Filter Table
            const filterVal = document.getElementById('filter-status').value;
            let filteredProjects = projects;
            if (filterVal !== 'ALL') {
                filteredProjects = projects.filter(p => p.status === filterVal);
            }

            renderTable(filteredProjects);
            renderKPIs();
            renderChart();
        }

        // Render Table Body
        function renderTable(dataset) {
            const tbody = document.getElementById('ranking-table-body');
            let html = '';

            dataset.forEach((p, idx) => {
                const passBadge = p.status === 'Pass' 
                    ? '<span class="px-2.5 py-1 rounded-md font-semibold text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">통과 (Pass)</span>'
                    : '<span class="px-2.5 py-1 rounded-md font-semibold text-[11px] bg-rose-500/10 text-rose-400 border border-rose-500/20">보류 (Review)</span>';

                html += `
                    <tr class="hover:bg-slate-800/40 transition cursor-pointer" onclick="openDetailModal(${p.id})">
                        <td class="py-3 px-3 text-center font-bold text-slate-300">${idx + 1}</td>
                        <td class="py-3 px-3 font-bold text-white">${p.division}</td>
                        <td class="py-3 px-3 text-slate-200 font-medium">${p.name}</td>
                        <td class="py-3 px-3 text-right font-bold text-amber-400">${p.capex.toLocaleString()}</td>
                        <td class="py-3 px-3 text-center text-slate-300">${p.fin}점</td>
                        <td class="py-3 px-3 text-center text-slate-300">${p.strat}점</td>
                        <td class="py-3 px-3 text-center text-slate-300">${p.eff}점</td>
                        <td class="py-3 px-3 text-center text-rose-400 font-bold">${p.risk}점</td>
                        <td class="py-3 px-3 text-center font-black text-sm text-hyundai-cyan">${p.totalScore.toFixed(1)}</td>
                        <td class="py-3 px-3 text-center" onclick="event.stopPropagation()">${passBadge}</td>
                        <td class="py-3 px-3 text-center space-x-2" onclick="event.stopPropagation()">
                            <button onclick="openDetailModal(${p.id})" class="text-slate-400 hover:text-cyan-400 transition text-xs"><i class="fa-solid fa-file-lines"></i></button>
                            <button onclick="deleteProject(${p.id})" class="text-slate-500 hover:text-rose-400 transition text-xs"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
                `;
            });

            if (dataset.length === 0) {
                html = `<tr><td colspan="11" class="py-6 text-center text-slate-500">조건에 일치하는 투자 심사 안건이 없습니다.</td></tr>`;
            }

            tbody.innerHTML = html;
        }

        // Render Top KPI Metrics based on 2025 Disclosures
        function renderKPIs() {
            const totalCapex = projects.reduce((sum, p) => sum + p.capex, 0);
            const passProjects = projects.filter(p => p.status === 'Pass');
            const passCount = passProjects.length;
            const passCapex = passProjects.reduce((sum, p) => sum + p.capex, 0);
            const passRate = projects.length > 0 ? ((passCount / projects.length) * 100).toFixed(1) : 0;
            const avgScore = projects.length > 0 
                ? (projects.reduce((sum, p) => sum + p.totalScore, 0) / projects.length).toFixed(1) 
                : "0.0";

            // HMC 2025 Annual Guidance Target CAPEX: 90,000 억원 (9.0조 원)
            const HMC_2025_CAPEX_BUDGET = 90000;
            const budgetRate = ((totalCapex / HMC_2025_CAPEX_BUDGET) * 100).toFixed(1);
            const remainingBudget = Math.max(0, HMC_2025_CAPEX_BUDGET - passCapex);

            document.getElementById('kpi-total-capex').innerText = totalCapex.toLocaleString();
            document.getElementById('kpi-project-count-sub').innerHTML = `전체 <span class="text-white font-bold">${projects.length}개</span> 심사 안건`;
            document.getElementById('kpi-pass-count').innerText = passCount;
            document.getElementById('kpi-pass-rate').innerText = `${passRate}%`;
            document.getElementById('kpi-approved-capex').innerText = passCapex.toLocaleString();
            document.getElementById('kpi-avg-score').innerText = avgScore;
            document.getElementById('kpi-capex-budget-rate').innerText = `${budgetRate}%`;
            document.getElementById('kpi-remaining-capex').innerText = remainingBudget.toLocaleString();
        }

        // Render 4-Quadrant Bubble Chart
        function renderChart() {
            const ctx = document.getElementById('matrixChart').getContext('2d');
            if (matrixChartInstance) {
                matrixChartInstance.destroy();
            }

            const chartData = projects.map(p => ({
                x: p.fin,
                y: p.strat,
                r: Math.max(8, Math.min(26, p.capex / 1200)), // Scale bubble by CAPEX
                name: p.name,
                division: p.division,
                capex: p.capex,
                status: p.status,
                totalScore: p.totalScore
            }));

            matrixChartInstance = new Chart(ctx, {
                type: 'bubble',
                data: {
                    datasets: [{
                        data: chartData,
                        backgroundColor: chartData.map(d => d.status === 'Pass' ? 'rgba(52, 211, 153, 0.75)' : 'rgba(244, 63, 94, 0.75)'),
                        borderColor: chartData.map(d => d.status === 'Pass' ? '#10B981' : '#EF4444'),
                        borderWidth: 2,
                        hoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            min: 40,
                            max: 100,
                            title: { display: true, text: '수익성 점수 (Financial Score)', color: '#94a3b8', font: { size: 10, family: 'Pretendard' } },
                            grid: { color: '#1e293b' },
                            ticks: { color: '#64748b' }
                        },
                        y: {
                            min: 40,
                            max: 100,
                            title: { display: true, text: '전략 가치 점수 (Strategic Alignment Score)', color: '#94a3b8', font: { size: 10, family: 'Pretendard' } },
                            grid: { color: '#1e293b' },
                            ticks: { color: '#64748b' }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#0f172a',
                            borderColor: '#334155',
                            borderWidth: 1,
                            titleColor: '#38bdf8',
                            bodyColor: '#f1f5f9',
                            callbacks: {
                                label: function(ctx) {
                                    const raw = ctx.raw;
                                    return [
                                        ` [${raw.division}] ${raw.name}`,
                                        ` 신청 CAPEX: ${raw.capex.toLocaleString()}억 원`,
                                        ` 종합 Score: ${raw.totalScore}점 (${raw.status})`
                                    ];
                                }
                            }
                        }
                    }
                }
            });
        }

        // Quadrant Filter Action
        function filterQuadrant(q) {
            let filtered = [];
            if (q === 'q1') filtered = projects.filter(p => p.fin >= 70 && p.strat >= 70);
            else if (q === 'q2') filtered = projects.filter(p => p.fin < 70 && p.strat >= 70);
            else if (q === 'q4') filtered = projects.filter(p => p.fin >= 70 && p.strat < 70);
            else if (q === 'q3') filtered = projects.filter(p => p.fin < 70 && p.strat < 70);

            renderTable(filtered);
        }

        // Change Preset Scenario
        function changeScenario(val) {
            if (val === 'base') {
                document.getElementById('slider-w-fin').value = 30;
                document.getElementById('slider-w-strat').value = 30;
                document.getElementById('slider-w-eff').value = 20;
                document.getElementById('slider-w-risk').value = 20;
                document.getElementById('inp-hurdle-score').value = 65;
            } else if (val === 'sdv') {
                document.getElementById('slider-w-fin').value = 20;
                document.getElementById('slider-w-strat').value = 50;
                document.getElementById('slider-w-eff').value = 15;
                document.getElementById('slider-w-risk').value = 15;
                document.getElementById('inp-hurdle-score').value = 60;
            } else if (val === 'conservative') {
                document.getElementById('slider-w-fin').value = 45;
                document.getElementById('slider-w-strat').value = 15;
                document.getElementById('slider-w-eff').value = 20;
                document.getElementById('slider-w-risk').value = 20;
                document.getElementById('inp-hurdle-score').value = 70;
            }
            updateCalculations();
        }

        // Reset Weights
        function resetWeights() {
            document.getElementById('scenario-selector').value = 'base';
            changeScenario('base');
        }

        // Modal Controls
        function openAddModal() {
            document.getElementById('modal-add').classList.remove('hidden');
        }

        function closeAddModal() {
            document.getElementById('modal-add').classList.add('hidden');
        }

        function handleAddProject(e) {
            e.preventDefault();
            const name = document.getElementById('add-name').value;
            const division = document.getElementById('add-division').value;
            const capex = parseInt(document.getElementById('add-capex').value);
            const fin = parseInt(document.getElementById('add-fin').value);
            const strat = parseInt(document.getElementById('add-strat').value);
            const eff = parseInt(document.getElementById('add-eff').value);
            const riskVal = parseInt(document.getElementById('add-risk').value);

            const newProj = {
                id: Date.now(),
                division,
                name,
                capex,
                fin,
                strat,
                eff,
                risk: -Math.abs(riskVal),
                npv: Math.round(capex * 0.18),
                irr: 12.5,
                payback: 4.0,
                ebitda: 180,
                desc: "사용자 신규 입력 안건. 2025 전사 가이던스 기준 가중치에 따른 스코어링 반영 완료."
            };

            projects.push(newProj);
            closeAddModal();
            updateCalculations();
        }

        function deleteProject(id) {
            projects = projects.filter(p => p.id !== id);
            updateCalculations();
        }

        // Detail Modal
        function openDetailModal(id) {
            const p = projects.find(item => item.id === id);
            if (!p) return;

            document.getElementById('detail-badge').innerText = p.division;
            document.getElementById('detail-title').innerText = p.name;
            document.getElementById('detail-capex').innerText = `${p.capex.toLocaleString()} 억 원`;
            document.getElementById('detail-npv').innerText = `${p.npv >= 0 ? '+' : ''}${p.npv.toLocaleString()} 억 원`;
            document.getElementById('detail-irr').innerText = `${p.irr}%`;
            document.getElementById('detail-payback').innerText = `${p.payback}년`;
            document.getElementById('detail-ebitda').innerText = `${p.ebitda}억 원`;
            document.getElementById('detail-desc').innerText = p.desc || "2025 공시 기반 상세 심사 타당성 보고서";

            document.getElementById('modal-detail').classList.remove('hidden');
        }

        function closeDetailModal() {
            document.getElementById('modal-detail').classList.add('hidden');
        }

        // Initialize App on DOM Load
        window.onload = function() {
            updateCalculations();
        };
    </script>
</body>
</html>
