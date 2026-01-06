'use client';

import { useState } from 'react';
import { 
  BookOpen, Calculator, Brain, Trophy, ChevronRight, 
  CheckCircle, XCircle, RefreshCw, TrendingUp, TrendingDown,
  AlertTriangle, Shield, DollarSign, Droplets, Activity,
  BarChart3, HelpCircle, Lightbulb, Target
} from 'lucide-react';

// ==================== TYPES ====================
type Mode = 'menu' | 'learn' | 'calculator' | 'quiz' | 'scenario';
type LearnTopic = 'overview' | 'C' | 'A' | 'M' | 'E' | 'L' | 'S' | 'gap' | 'formulas';

interface QuizQuestion {
  id: number;
  questionRu: string;
  questionEn: string;
  options: { ru: string; en: string }[];
  correct: number;
  explanationRu: string;
  explanationEn: string;
  category: string;
}

interface BankData {
  name: string;
  car: number;
  countryAvgCar: number;
  npl: number;
  countryAvgNpl: number;
  provisionCoverage: number;
  lcr: number;
  nsfr: number;
  roe: number;
  countryAvgRoe: number;
  roa: number;
  countryAvgRoa: number;
  fixedRateLoans: number;
  shortTermDeposits: number;
}

// ==================== DATA ====================
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionRu: "Банк имеет RSA = $5M, RSL = $4M. Чему равен Interest Sensitivity Ratio (ISR)?",
    questionEn: "Bank has RSA = $5M, RSL = $4M. What is the Interest Sensitivity Ratio (ISR)?",
    options: [
      { ru: "-$1 million", en: "-$1 million" },
      { ru: "$1 million", en: "$1 million" },
      { ru: "0.8", en: "0.8" },
      { ru: "1.25", en: "1.25" }
    ],
    correct: 3,
    explanationRu: "ISR = RSA / RSL = 5 / 4 = 1.25. ISR > 1 означает, что банк asset-sensitive.",
    explanationEn: "ISR = RSA / RSL = 5 / 4 = 1.25. ISR > 1 means the bank is asset-sensitive.",
    category: "GAP"
  },
  {
    id: 2,
    questionRu: "Что является основным источником погашения кредита (primary source of repayment)?",
    questionEn: "What is the primary source of loan repayment?",
    options: [
      { ru: "Залог (collateral)", en: "Collateral" },
      { ru: "Денежный поток (cash flow)", en: "Adequacy of cash flow" },
      { ru: "Гарантия", en: "Guarantee" },
      { ru: "Все вышеперечисленное", en: "All of the above" }
    ],
    correct: 1,
    explanationRu: "Основной источник — адекватность денежного потока заёмщика. Залог — это вторичный источник!",
    explanationEn: "Primary source is adequacy of cash flow. Collateral is the SECONDARY source!",
    category: "Credit"
  },
  {
    id: 3,
    questionRu: "LCR (Liquidity Coverage Ratio) измеряет какой риск?",
    questionEn: "LCR (Liquidity Coverage Ratio) measures which risk?",
    options: [
      { ru: "Операционный риск", en: "Operational Risk" },
      { ru: "Рыночный риск", en: "Market Risk" },
      { ru: "Кредитный риск", en: "Credit Risk" },
      { ru: "Риск ликвидности", en: "Liquidity Risk" }
    ],
    correct: 3,
    explanationRu: "LCR = HQLA / Net Cash Outflows (30 дней). Это показатель краткосрочной ликвидности.",
    explanationEn: "LCR = HQLA / Net Cash Outflows (30 days). It measures short-term liquidity.",
    category: "Liquidity"
  },
  {
    id: 4,
    questionRu: "В interest rate swap, две стороны обмениваются процентными платежами на notional amount. Верно?",
    questionEn: "In an interest rate swap, two parties exchange interest payments on a notional amount. True?",
    options: [
      { ru: "Верно (True)", en: "True" },
      { ru: "Неверно (False)", en: "False" }
    ],
    correct: 0,
    explanationRu: "Верно! Notional amount — это условная сумма для расчёта платежей. Сама сумма НЕ обменивается!",
    explanationEn: "True! Notional amount is used to calculate payments. The principal itself is NOT exchanged!",
    category: "Derivatives"
  },
  {
    id: 5,
    questionRu: "Assets = $240M, Equity = $170M, Net Income = $4.2M. Чему равен ROE?",
    questionEn: "Assets = $240M, Equity = $170M, Net Income = $4.2M. What is ROE?",
    options: [
      { ru: "1.75%", en: "1.75%" },
      { ru: "2.5%", en: "2.5%" },
      { ru: "6.0%", en: "6.0%" },
      { ru: "17.5%", en: "17.5%" }
    ],
    correct: 1,
    explanationRu: "ROE = Net Income / Equity = 4.2 / 170 = 0.0247 = 2.47% ≈ 2.5%",
    explanationEn: "ROE = Net Income / Equity = 4.2 / 170 = 0.0247 = 2.47% ≈ 2.5%",
    category: "Earnings"
  },
  {
    id: 6,
    questionRu: "Какой тип финансового института покупает КРАТКОСРОЧНЫЕ ценные бумаги?",
    questionEn: "Which type of financial institution purchases SHORT-TERM securities?",
    options: [
      { ru: "Pension Funds", en: "Pension Funds" },
      { ru: "Money Market Funds", en: "Money Market Funds" },
      { ru: "Commercial Banks", en: "Commercial Banks" },
      { ru: "Все вышеперечисленные", en: "All of the above" }
    ],
    correct: 1,
    explanationRu: "Money Market Funds покупают краткосрочные бумаги. Pension Funds — долгосрочные. Banks — выдают кредиты!",
    explanationEn: "Money Market Funds buy short-term securities. Pension Funds — long-term. Banks — make loans!",
    category: "Institutions"
  },
  {
    id: 7,
    questionRu: "Банк: RSA = $4M, RSL = $5M, Total Assets = $7M. Чему равен Relative GAP?",
    questionEn: "Bank: RSA = $4M, RSL = $5M, Total Assets = $7M. What is Relative GAP?",
    options: [
      { ru: "-0.14 (-14%)", en: "-0.14 (-14%)" },
      { ru: "$1 million", en: "$1 million" },
      { ru: "0.8", en: "0.8" },
      { ru: "1.25", en: "1.25" }
    ],
    correct: 0,
    explanationRu: "GAP = RSA - RSL = 4 - 5 = -$1M. Relative GAP = GAP / Assets = -1 / 7 = -0.143 ≈ -14%",
    explanationEn: "GAP = RSA - RSL = 4 - 5 = -$1M. Relative GAP = GAP / Assets = -1 / 7 = -0.143 ≈ -14%",
    category: "GAP"
  },
  {
    id: 8,
    questionRu: "Assets = $7M, Interest Income = $7M, Interest Expense = $4M. NIM = ?",
    questionEn: "Assets = $7M, Interest Income = $7M, Interest Expense = $4M. NIM = ?",
    options: [
      { ru: "43%", en: "43%" },
      { ru: "-43%", en: "-43%" },
      { ru: "47%", en: "47%" },
      { ru: "15%", en: "15%" }
    ],
    correct: 0,
    explanationRu: "NIM = (Interest Income - Interest Expense) / Assets = (7 - 4) / 7 = 3/7 = 0.428 = 43%",
    explanationEn: "NIM = (Interest Income - Interest Expense) / Assets = (7 - 4) / 7 = 3/7 = 0.428 = 43%",
    category: "Earnings"
  },
  {
    id: 9,
    questionRu: "Что такое Settlement в платёжной системе?",
    questionEn: "What is Settlement in payment systems?",
    options: [
      { ru: "Сверка информации между банками", en: "Reconciliation of information between banks" },
      { ru: "Финальный перевод денег со счёта на счёт", en: "Final transfer of money between accounts" }
    ],
    correct: 1,
    explanationRu: "Settlement — финальный перевод денег. Clearing — это сверка информации.",
    explanationEn: "Settlement — final money transfer. Clearing — reconciliation of information.",
    category: "Operations"
  },
  {
    id: 10,
    questionRu: "Инвертированная (inverted) yield curve предвещает:",
    questionEn: "An inverted yield curve predicts:",
    options: [
      { ru: "Экономический рост", en: "Economic growth" },
      { ru: "Рецессию", en: "Recession" },
      { ru: "Стабильность", en: "Stability" },
      { ru: "Инфляцию", en: "Inflation" }
    ],
    correct: 1,
    explanationRu: "Inverted yield curve (краткосрочные ставки > долгосрочных) — классический индикатор рецессии!",
    explanationEn: "Inverted yield curve (short-term rates > long-term) — classic recession indicator!",
    category: "Rates"
  },
  {
    id: 11,
    questionRu: "Provision/NPL часто используется для оценки:",
    questionEn: "Provision/NPL is often used to evaluate:",
    options: [
      { ru: "Capital adequacy", en: "Capital adequacy" },
      { ru: "Asset quality", en: "Asset quality" },
      { ru: "Earnings", en: "Earnings" },
      { ru: "Liquidity", en: "Liquidity" }
    ],
    correct: 1,
    explanationRu: "Provision/NPL (Provision Coverage) показывает, насколько резервы покрывают плохие кредиты — это Asset Quality.",
    explanationEn: "Provision/NPL (Provision Coverage) shows how much reserves cover bad loans — this is Asset Quality.",
    category: "CAMELS"
  },
  {
    id: 12,
    questionRu: "ROA часто используется для оценки:",
    questionEn: "ROA is often used to evaluate:",
    options: [
      { ru: "Capital adequacy", en: "Capital adequacy" },
      { ru: "Asset quality", en: "Asset quality" },
      { ru: "Earnings", en: "Earnings" },
      { ru: "Liquidity", en: "Liquidity" }
    ],
    correct: 2,
    explanationRu: "ROA = Net Income / Assets — это показатель прибыльности (Earnings).",
    explanationEn: "ROA = Net Income / Assets — this is a profitability (Earnings) measure.",
    category: "CAMELS"
  },
  {
    id: 13,
    questionRu: "Минимальный CAR по Basel III (с буферами) составляет:",
    questionEn: "Minimum CAR under Basel III (with buffers) is:",
    options: [
      { ru: "4.5%", en: "4.5%" },
      { ru: "8%", en: "8%" },
      { ru: "10.5%", en: "10.5%" },
      { ru: "15%", en: "15%" }
    ],
    correct: 2,
    explanationRu: "8% минимум + 2.5% conservation buffer = 10.5%. CET1 минимум 4.5% + 2.5% = 7%.",
    explanationEn: "8% minimum + 2.5% conservation buffer = 10.5%. CET1 minimum 4.5% + 2.5% = 7%.",
    category: "Capital"
  },
  {
    id: 14,
    questionRu: "Что такое Notional pooling?",
    questionEn: "What is Notional pooling?",
    options: [
      { ru: "Физическое перемещение денег между счетами", en: "Physical transfer of money between accounts" },
      { ru: "Виртуальное объединение балансов без физического перевода", en: "Virtual consolidation of balances without physical transfer" }
    ],
    correct: 1,
    explanationRu: "Notional pooling — виртуальное. Cash concentration / Zero balancing — физическое перемещение.",
    explanationEn: "Notional pooling — virtual. Cash concentration / Zero balancing — physical transfer.",
    category: "Operations"
  },
  {
    id: 15,
    questionRu: "Если GAP = -$100M и ставки выросли на 2%, то ΔNIM =",
    questionEn: "If GAP = -$100M and rates increased by 2%, then ΔNIM =",
    options: [
      { ru: "+$2M (прибыль)", en: "+$2M (profit)" },
      { ru: "-$2M (убыток)", en: "-$2M (loss)" },
      { ru: "0", en: "0" },
      { ru: "-$200M", en: "-$200M" }
    ],
    correct: 1,
    explanationRu: "ΔNIM = GAP × Δr = -100 × 0.02 = -$2M. Отрицательный GAP + рост ставок = убыток!",
    explanationEn: "ΔNIM = GAP × Δr = -100 × 0.02 = -$2M. Negative GAP + rising rates = loss!",
    category: "GAP"
  }
];

const scenarios: BankData[] = [
  {
    name: "Alpha Bank",
    car: 17.8, countryAvgCar: 16,
    npl: 5.5, countryAvgNpl: 3,
    provisionCoverage: 70,
    lcr: 184, nsfr: 149,
    roe: 13, countryAvgRoe: 14.6,
    roa: 1.3, countryAvgRoa: 2,
    fixedRateLoans: 60,
    shortTermDeposits: 80
  },
  {
    name: "Beta Bank",
    car: 17, countryAvgCar: 17.8,
    npl: 2.5, countryAvgNpl: 5,
    provisionCoverage: 70,
    lcr: 184, nsfr: 149,
    roe: 13, countryAvgRoe: 14.6,
    roa: 1.3, countryAvgRoa: 2,
    fixedRateLoans: 60,
    shortTermDeposits: 80
  },
  {
    name: "Gamma Bank",
    car: 12, countryAvgCar: 15,
    npl: 8, countryAvgNpl: 3,
    provisionCoverage: 50,
    lcr: 105, nsfr: 102,
    roe: 8, countryAvgRoe: 12,
    roa: 0.5, countryAvgRoa: 1.5,
    fixedRateLoans: 30,
    shortTermDeposits: 90
  }
];

// ==================== COMPONENTS ====================

function Header({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <header className="gradient-bg text-white py-6 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => setMode('menu')}>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-10 h-10" />
              CAMELS Trainer
            </h1>
            <p className="text-purple-200 mt-1">Тренажёр для экзамена | Exam Preparation Tool</p>
          </div>
          {mode !== 'menu' && (
            <button 
              onClick={() => setMode('menu')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              ← Меню / Menu
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuScreen({ setMode }: { setMode: (m: Mode) => void }) {
  const menuItems = [
    { mode: 'learn' as Mode, icon: BookOpen, titleRu: 'Изучить теорию', titleEn: 'Learn Theory', descRu: 'CAMELS, GAP, формулы с объяснениями', descEn: 'CAMELS, GAP, formulas explained', color: 'from-blue-500 to-blue-600' },
    { mode: 'calculator' as Mode, icon: Calculator, titleRu: 'Калькулятор', titleEn: 'Calculator', descRu: 'Рассчитай показатели банка', descEn: 'Calculate bank metrics', color: 'from-green-500 to-green-600' },
    { mode: 'quiz' as Mode, icon: Brain, titleRu: 'Тест (15 вопросов)', titleEn: 'Quiz (15 questions)', descRu: 'Проверь свои знания', descEn: 'Test your knowledge', color: 'from-purple-500 to-purple-600' },
    { mode: 'scenario' as Mode, icon: Target, titleRu: 'Сценарии банков', titleEn: 'Bank Scenarios', descRu: 'Анализ реальных кейсов', descEn: 'Analyze real cases', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Выбери режим / Choose Mode
        </h2>
        <p className="text-gray-600 text-lg">
          Полный тренажёр для подготовки к экзамену по Financial Institutions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <button
            key={item.mode}
            onClick={() => setMode(item.mode)}
            className={`card-hover bg-gradient-to-br ${item.color} text-white p-6 rounded-2xl text-left shadow-lg`}
          >
            <item.icon className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-1">{item.titleRu}</h3>
            <p className="text-white/80 text-sm mb-2">{item.titleEn}</p>
            <p className="text-white/90">{item.descRu}</p>
            <p className="text-white/70 text-sm">{item.descEn}</p>
            <ChevronRight className="w-6 h-6 mt-4 ml-auto" />
          </button>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5" />
          Совет / Tip
        </h3>
        <p className="text-yellow-700">
          <strong>RU:</strong> Начни с "Изучить теорию", затем попробуй калькулятор, и наконец пройди тест.
        </p>
        <p className="text-yellow-600 text-sm mt-1">
          <strong>EN:</strong> Start with "Learn Theory", then try the calculator, and finally take the quiz.
        </p>
      </div>
    </div>
  );
}

function LearnScreen() {
  const [topic, setTopic] = useState<LearnTopic>('overview');

  const topics: { id: LearnTopic; titleRu: string; titleEn: string; icon: any }[] = [
    { id: 'overview', titleRu: 'Обзор CAMELS', titleEn: 'CAMELS Overview', icon: Shield },
    { id: 'C', titleRu: 'C — Capital', titleEn: 'C — Capital', icon: DollarSign },
    { id: 'A', titleRu: 'A — Assets', titleEn: 'A — Asset Quality', icon: BarChart3 },
    { id: 'M', titleRu: 'M — Management', titleEn: 'M — Management', icon: Activity },
    { id: 'E', titleRu: 'E — Earnings', titleEn: 'E — Earnings', icon: TrendingUp },
    { id: 'L', titleRu: 'L — Liquidity', titleEn: 'L — Liquidity', icon: Droplets },
    { id: 'S', titleRu: 'S — Sensitivity', titleEn: 'S — Sensitivity', icon: Activity },
    { id: 'gap', titleRu: 'GAP Analysis', titleEn: 'GAP Analysis', icon: TrendingDown },
    { id: 'formulas', titleRu: 'Все формулы', titleEn: 'All Formulas', icon: Calculator },
  ];

  const content: Record<LearnTopic, JSX.Element> = {
    overview: (
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-bold text-blue-800">Что такое CAMELS? / What is CAMELS?</h3>
          <p className="text-blue-700 mt-2">
            <strong>RU:</strong> Система рейтинговой оценки банков регуляторами. Рейтинг от 1 (лучший) до 5 (худший).
          </p>
          <p className="text-blue-600 text-sm mt-1">
            <strong>EN:</strong> Bank rating system used by regulators. Rating from 1 (best) to 5 (worst).
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { letter: 'C', ru: 'Capital Adequacy', en: 'Достаточность капитала', desc: 'Хватит ли капитала покрыть убытки?' },
            { letter: 'A', ru: 'Asset Quality', en: 'Качество активов', desc: 'Много ли плохих кредитов?' },
            { letter: 'M', ru: 'Management', en: 'Качество управления', desc: 'Компетентен ли менеджмент?' },
            { letter: 'E', ru: 'Earnings', en: 'Прибыльность', desc: 'Зарабатывает ли банк?' },
            { letter: 'L', ru: 'Liquidity', en: 'Ликвидность', desc: 'Сможет ли расплатиться?' },
            { letter: 'S', ru: 'Sensitivity', en: 'Чувствительность', desc: 'Как реагирует на ставки?' },
          ].map((item) => (
            <div key={item.letter} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">{item.letter}</div>
              <div className="font-semibold text-gray-800">{item.ru}</div>
              <div className="text-sm text-gray-500">{item.en}</div>
              <div className="text-sm text-gray-600 mt-2">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-bold text-yellow-800 mb-2">⚡ Быстрое правило / Quick Rule</h4>
          <p className="text-yellow-700">Rating 1-2 = хорошо, Rating 3 = нужно внимание, Rating 4-5 = проблемы</p>
        </div>
      </div>
    ),

    C: (
      <div className="space-y-6">
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h3 className="font-bold text-green-800 text-xl">C — Capital Adequacy / Достаточность капитала</h3>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Главная формула / Main Formula:</h4>
          <div className="bg-blue-100 p-4 rounded-lg text-center text-xl font-mono">
            CAR = (Tier 1 + Tier 2) / RWA
          </div>
          <p className="text-gray-600 mt-3">RWA = Risk-Weighted Assets (активы, взвешенные по риску)</p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Минимумы Basel III / Basel III Minimums:</h4>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Показатель</th>
                <th className="p-2 text-left">Минимум</th>
                <th className="p-2 text-left">+ Buffer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-2">CET1 Ratio</td><td className="p-2">4.5%</td><td className="p-2 font-bold text-green-600">7%</td></tr>
              <tr className="border-t"><td className="p-2">Tier 1 Ratio</td><td className="p-2">6%</td><td className="p-2 font-bold text-green-600">8.5%</td></tr>
              <tr className="border-t"><td className="p-2">Total CAR</td><td className="p-2">8%</td><td className="p-2 font-bold text-green-600">10.5%</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Запомни / Remember:</h4>
          <p className="text-yellow-700">CAR {">"} 10.5% = OK. CAR {">"} 15% = отлично. CAR {"<"} 8% = проблема!</p>
        </div>
      </div>
    ),

    A: (
      <div className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-bold text-red-800 text-xl">A — Asset Quality / Качество активов</h3>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Главные формулы / Main Formulas:</h4>
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
              NPL Ratio = Non-Performing Loans / Total Loans
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
              Provision Coverage = Loan Loss Reserves / NPL
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-bold text-green-800">✅ Хорошо / Good:</h4>
            <ul className="text-green-700 mt-2 space-y-1">
              <li>• NPL {"<"} 3%</li>
              <li>• Coverage {">"} 100%</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-bold text-red-800">❌ Плохо / Bad:</h4>
            <ul className="text-red-700 mt-2 space-y-1">
              <li>• NPL {">"} 5%</li>
              <li>• Coverage {"<"} 70%</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Запомни / Remember:</h4>
          <p className="text-yellow-700">NPL 5% = каждый 20-й доллар кредитов не возвращают. Coverage 70% = резервов не хватит!</p>
        </div>
      </div>
    ),

    M: (
      <div className="space-y-6">
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
          <h3 className="font-bold text-purple-800 text-xl">M — Management Quality / Качество управления</h3>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Главная формула / Main Formula:</h4>
          <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
            Cost-to-Income = Operating Expenses / Operating Income
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Что оценивают / What is evaluated:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Компетентность руководства / Management competence</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Стратегия и планирование / Strategy and planning</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Внутренний контроль / Internal controls</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Корпоративное управление / Corporate governance</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Запомни / Remember:</h4>
          <p className="text-yellow-700">Cost-to-Income {"<"} 50% = отлично. {">"} 70% = неэффективно.</p>
        </div>
      </div>
    ),

    E: (
      <div className="space-y-6">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
          <h3 className="font-bold text-emerald-800 text-xl">E — Earnings / Прибыльность</h3>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Главные формулы / Main Formulas:</h4>
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
              ROE = Net Income / Equity
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
              ROA = Net Income / Total Assets
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
              NIM = (Interest Income − Interest Expense) / Assets
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <h4 className="font-bold text-orange-800 mb-2">⚡ Важная связь / Important relationship:</h4>
          <div className="bg-orange-100 p-3 rounded font-mono text-center">
            ROE = ROA × (Assets / Equity)
          </div>
          <p className="text-orange-700 mt-2">Поэтому ROE ВСЕГДА {">"} ROA (из-за левериджа)!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-bold text-green-800">✅ Benchmarks:</h4>
            <ul className="text-green-700 mt-2 space-y-1">
              <li>• ROE {">"} 10% = хорошо</li>
              <li>• ROA {">"} 1% = хорошо</li>
              <li>• NIM ~ 3-4%</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-bold text-blue-800">📊 Пример / Example:</h4>
            <p className="text-blue-700 mt-2">
              Net Income = $13B<br/>
              Equity = $100B<br/>
              Assets = $1000B<br/>
              ROE = 13/100 = 13%<br/>
              ROA = 13/1000 = 1.3%
            </p>
          </div>
        </div>
      </div>
    ),

    L: (
      <div className="space-y-6">
        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded">
          <h3 className="font-bold text-cyan-800 text-xl">L — Liquidity / Ликвидность</h3>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Главные формулы / Main Formulas:</h4>
          <div className="space-y-4">
            <div>
              <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
                LCR = HQLA / Net Cash Outflows (30 days) ≥ 100%
              </div>
              <p className="text-gray-600 mt-2 text-center">Краткосрочная ликвидность (30 дней) / Short-term (30 days)</p>
            </div>
            <div>
              <div className="bg-blue-100 p-4 rounded-lg text-center font-mono">
                NSFR = ASF / RSF ≥ 100%
              </div>
              <p className="text-gray-600 mt-2 text-center">Долгосрочная стабильность (1 год) / Long-term (1 year)</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Простое объяснение / Simple explanation:</h4>
          <p className="text-yellow-700"><strong>LCR:</strong> Если завтра все побегут забирать деньги, хватит ли на 30 дней?</p>
          <p className="text-yellow-700"><strong>NSFR:</strong> Стабильно ли финансирование банка на год вперёд?</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="font-bold text-green-800">✅ LCR 184%, NSFR 149% = отлично! Большой запас прочности.</h4>
        </div>
      </div>
    ),

    S: (
      <div className="space-y-6">
        <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded">
          <h3 className="font-bold text-pink-800 text-xl">S — Sensitivity to Market Risk / Чувствительность</h3>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Что оценивают / What is evaluated:</h4>
          <p className="text-gray-700">Как банк реагирует на изменение процентных ставок, валютных курсов, цен активов.</p>
          <p className="text-gray-500 mt-1">How bank reacts to changes in interest rates, FX rates, asset prices.</p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Определение типа банка / Bank type determination:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-bold text-blue-800">Asset-sensitive (GAP {">"} 0)</h5>
              <p className="text-blue-700 mt-2">RSA {">"} RSL</p>
              <p className="text-blue-600">При росте ставок → прибыль ↑</p>
              <p className="text-blue-600">При падении ставок → прибыль ↓</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h5 className="font-bold text-red-800">Liability-sensitive (GAP {"<"} 0)</h5>
              <p className="text-red-700 mt-2">RSL {">"} RSA</p>
              <p className="text-red-600">При росте ставок → прибыль ↓</p>
              <p className="text-red-600">При падении ставок → прибыль ↑</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Как определить?</h4>
          <p className="text-yellow-700">Фиксированные кредиты = НЕ rate-sensitive</p>
          <p className="text-yellow-700">Краткосрочные депозиты = rate-sensitive (RSL)</p>
          <p className="text-yellow-700 mt-2"><strong>60% fixed loans + short deposits = Liability-sensitive!</strong></p>
        </div>
      </div>
    ),

    gap: (
      <div className="space-y-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
          <h3 className="font-bold text-indigo-800 text-xl">GAP Analysis — Полное объяснение</h3>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Все формулы GAP / All GAP Formulas:</h4>
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded-lg font-mono">
              <div className="text-center text-lg">GAP = RSA − RSL</div>
              <p className="text-blue-700 text-sm mt-2 text-center">RSA = Rate-Sensitive Assets, RSL = Rate-Sensitive Liabilities</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg font-mono">
              <div className="text-center text-lg">ISR = RSA / RSL</div>
              <p className="text-green-700 text-sm mt-2 text-center">Interest Sensitivity Ratio</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg font-mono">
              <div className="text-center text-lg">Relative GAP = GAP / Total Assets</div>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg font-mono">
              <div className="text-center text-lg">ΔNIM = GAP × Δr</div>
              <p className="text-orange-700 text-sm mt-2 text-center">Изменение прибыли при изменении ставок</p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h4 className="font-bold mb-4">Пример расчёта / Calculation Example:</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Дано:</strong> RSA = $5M, RSL = $4M, Total Assets = $7M</p>
            <div className="mt-3 space-y-2">
              <p>GAP = 5 − 4 = <strong>$1M</strong> (положительный)</p>
              <p>ISR = 5 / 4 = <strong>1.25</strong> ({">"} 1 = asset-sensitive)</p>
              <p>Relative GAP = 1 / 7 = <strong>0.143 = 14.3%</strong></p>
            </div>
            <p className="mt-3 text-green-700"><strong>Вывод:</strong> Банк asset-sensitive, выиграет при росте ставок!</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
            <h4 className="font-bold text-green-800 mb-2">GAP {">"} 0 / ISR {">"} 1</h4>
            <p className="text-green-700">Asset-sensitive</p>
            <p className="text-green-600 text-sm">Ставки ↑ → Прибыль ↑</p>
            <p className="text-green-600 text-sm">Ставки ↓ → Прибыль ↓</p>
          </div>
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
            <h4 className="font-bold text-red-800 mb-2">GAP {"<"} 0 / ISR {"<"} 1</h4>
            <p className="text-red-700">Liability-sensitive</p>
            <p className="text-red-600 text-sm">Ставки ↑ → Прибыль ↓</p>
            <p className="text-red-600 text-sm">Ставки ↓ → Прибыль ↑</p>
          </div>
        </div>
      </div>
    ),

    formulas: (
      <div className="space-y-6">
        <div className="bg-gray-800 text-white p-4 rounded-xl">
          <h3 className="font-bold text-xl">📋 Все формулы / All Formulas</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Показатель</th>
                <th className="p-3 text-left">Формула</th>
                <th className="p-3 text-left">Benchmark</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3 font-medium">ROE</td><td className="p-3 font-mono text-sm">Net Income / Equity</td><td className="p-3">{">"}10%</td></tr>
              <tr className="bg-gray-50"><td className="p-3 font-medium">ROA</td><td className="p-3 font-mono text-sm">Net Income / Assets</td><td className="p-3">{">"}1%</td></tr>
              <tr><td className="p-3 font-medium">NIM</td><td className="p-3 font-mono text-sm">(Int Inc − Int Exp) / Assets</td><td className="p-3">3-4%</td></tr>
              <tr className="bg-gray-50"><td className="p-3 font-medium">CAR</td><td className="p-3 font-mono text-sm">(Tier1 + Tier2) / RWA</td><td className="p-3">{">"}10.5%</td></tr>
              <tr><td className="p-3 font-medium">NPL Ratio</td><td className="p-3 font-mono text-sm">NPL / Total Loans</td><td className="p-3">{"<"}3%</td></tr>
              <tr className="bg-gray-50"><td className="p-3 font-medium">Provision Coverage</td><td className="p-3 font-mono text-sm">Reserves / NPL</td><td className="p-3">{">"}100%</td></tr>
              <tr><td className="p-3 font-medium">LCR</td><td className="p-3 font-mono text-sm">HQLA / Outflows (30d)</td><td className="p-3">≥100%</td></tr>
              <tr className="bg-gray-50"><td className="p-3 font-medium">NSFR</td><td className="p-3 font-mono text-sm">ASF / RSF</td><td className="p-3">≥100%</td></tr>
              <tr><td className="p-3 font-medium">GAP</td><td className="p-3 font-mono text-sm">RSA − RSL</td><td className="p-3">≈0</td></tr>
              <tr className="bg-gray-50"><td className="p-3 font-medium">ISR</td><td className="p-3 font-mono text-sm">RSA / RSL</td><td className="p-3">≈1</td></tr>
              <tr><td className="p-3 font-medium">ΔNIM</td><td className="p-3 font-mono text-sm">GAP × Δr</td><td className="p-3">—</td></tr>
              <tr className="bg-gray-50"><td className="p-3 font-medium">Equity Multiplier</td><td className="p-3 font-mono text-sm">Assets / Equity</td><td className="p-3">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4">
            <h3 className="font-bold text-gray-700 mb-3">Темы / Topics</h3>
            <nav className="space-y-1">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTopic(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition ${
                    topic === t.id 
                      ? 'bg-purple-100 text-purple-700 font-medium' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="text-sm">{t.titleRu}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {content[topic]}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalculatorScreen() {
  const [netIncome, setNetIncome] = useState<string>('13');
  const [equity, setEquity] = useState<string>('100');
  const [assets, setAssets] = useState<string>('1000');
  const [rsa, setRsa] = useState<string>('400');
  const [rsl, setRsl] = useState<string>('600');
  const [rateChange, setRateChange] = useState<string>('2');
  const [npl, setNpl] = useState<string>('55');
  const [totalLoans, setTotalLoans] = useState<string>('1000');
  const [reserves, setReserves] = useState<string>('40');

  const roe = equity ? (parseFloat(netIncome) / parseFloat(equity) * 100) : 0;
  const roa = assets ? (parseFloat(netIncome) / parseFloat(assets) * 100) : 0;
  const gap = parseFloat(rsa) - parseFloat(rsl);
  const isr = parseFloat(rsl) ? parseFloat(rsa) / parseFloat(rsl) : 0;
  const relativeGap = parseFloat(assets) ? (gap / parseFloat(assets) * 100) : 0;
  const deltanim = gap * (parseFloat(rateChange) / 100);
  const nplRatio = parseFloat(totalLoans) ? (parseFloat(npl) / parseFloat(totalLoans) * 100) : 0;
  const coverage = parseFloat(npl) ? (parseFloat(reserves) / parseFloat(npl) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Earnings Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Earnings / Прибыльность
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Net Income ($B)</label>
              <input type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equity ($B)</label>
              <input type="number" value={equity} onChange={(e) => setEquity(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Assets ($B)</label>
              <input type="number" value={assets} onChange={(e) => setAssets(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold mb-3">Результаты / Results:</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>ROE:</span>
                <span className={`font-bold ${roe >= 10 ? 'text-green-600' : 'text-red-600'}`}>
                  {roe.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>ROA:</span>
                <span className={`font-bold ${roa >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                  {roa.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Equity Multiplier:</span>
                <span className="font-bold">{(parseFloat(assets) / parseFloat(equity)).toFixed(1)}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* GAP Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-500" />
            GAP Analysis / Процентный риск
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RSA - Rate-Sensitive Assets ($M)</label>
              <input type="number" value={rsa} onChange={(e) => setRsa(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RSL - Rate-Sensitive Liabilities ($M)</label>
              <input type="number" value={rsl} onChange={(e) => setRsl(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate Change / Изменение ставки (%)</label>
              <input type="number" value={rateChange} onChange={(e) => setRateChange(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold mb-3">Результаты / Results:</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>GAP:</span>
                <span className={`font-bold ${gap >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                  ${gap.toFixed(0)}M
                </span>
              </div>
              <div className="flex justify-between">
                <span>ISR:</span>
                <span className={`font-bold ${isr >= 1 ? 'text-blue-600' : 'text-orange-600'}`}>
                  {isr.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Relative GAP:</span>
                <span className="font-bold">{relativeGap.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>ΔNIM:</span>
                <span className={`font-bold ${deltanim >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${deltanim.toFixed(1)}M
                </span>
              </div>
            </div>
            <div className={`mt-3 p-2 rounded ${gap >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
              <p className={`font-medium ${gap >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                {gap >= 0 ? '📈 Asset-sensitive: выиграет при росте ставок' : '📉 Liability-sensitive: проиграет при росте ставок'}
              </p>
            </div>
          </div>
        </div>

        {/* Asset Quality Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Asset Quality / Качество активов
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NPL - Non-Performing Loans ($M)</label>
              <input type="number" value={npl} onChange={(e) => setNpl(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Loans ($M)</label>
              <input type="number" value={totalLoans} onChange={(e) => setTotalLoans(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Loss Reserves ($M)</label>
              <input type="number" value={reserves} onChange={(e) => setReserves(e.target.value)}
                className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold mb-3">Результаты / Results:</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>NPL Ratio:</span>
                <span className={`font-bold ${nplRatio <= 3 ? 'text-green-600' : nplRatio <= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {nplRatio.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Provision Coverage:</span>
                <span className={`font-bold ${coverage >= 100 ? 'text-green-600' : coverage >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {coverage.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className={`mt-3 p-2 rounded ${nplRatio <= 3 && coverage >= 100 ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <p className={`font-medium ${nplRatio <= 3 && coverage >= 100 ? 'text-green-700' : 'text-yellow-700'}`}>
                {nplRatio <= 3 ? '✅ NPL в норме' : '⚠️ NPL высокий'} | {coverage >= 100 ? '✅ Резервы достаточны' : '⚠️ Недорезервирован'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Быстрая шпаргалка / Quick Reference
          </h3>
          <div className="space-y-3 text-sm">
            <p>• GAP {">"} 0 / ISR {">"} 1 → Asset-sensitive → ставки↑ = прибыль↑</p>
            <p>• GAP {"<"} 0 / ISR {"<"} 1 → Liability-sensitive → ставки↑ = прибыль↓</p>
            <p>• ROE = ROA × Equity Multiplier (ROE всегда {">"} ROA)</p>
            <p>• NPL {"<"} 3% = хорошо, {">"} 5% = плохо</p>
            <p>• Coverage {">"} 100% = резервов хватит</p>
            <p>• LCR, NSFR ≥ 100% = требование Basel III</p>
            <p>• CAR ≥ 10.5% = минимум с буфером</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(quizQuestions.length).fill(false));
    setFinished(false);
  };

  if (finished) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Trophy className={`w-20 h-20 mx-auto mb-6 ${percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'}`} />
          <h2 className="text-3xl font-bold mb-4">
            {percentage >= 80 ? '🎉 Отлично!' : percentage >= 60 ? '👍 Хорошо!' : '📚 Нужно повторить'}
          </h2>
          <p className="text-5xl font-bold text-purple-600 mb-4">{score}/{quizQuestions.length}</p>
          <p className="text-xl text-gray-600 mb-8">{percentage.toFixed(0)}% правильных ответов</p>
          
          <button
            onClick={restart}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto hover:shadow-lg transition"
          >
            <RefreshCw className="w-5 h-5" />
            Пройти ещё раз / Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Вопрос {currentQuestion + 1} из {quizQuestions.length}</span>
          <span>Правильно: {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4">
          <span className="text-sm opacity-75">{question.category}</span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{question.questionRu}</h3>
          <p className="text-gray-500 mb-6">{question.questionEn}</p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition ${
                  showResult
                    ? index === question.correct
                      ? 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showResult && index === question.correct
                      ? 'bg-green-500 text-white'
                      : showResult && index === selectedAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <div>
                    <div className="font-medium">{option.ru}</div>
                    <div className="text-sm text-gray-500">{option.en}</div>
                  </div>
                  {showResult && index === question.correct && (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correct && (
                    <XCircle className="w-6 h-6 text-red-500 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === question.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <h4 className={`font-bold mb-2 ${selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'}`}>
                {selectedAnswer === question.correct ? '✅ Правильно! / Correct!' : '❌ Неправильно / Incorrect'}
              </h4>
              <p className="text-gray-700">{question.explanationRu}</p>
              <p className="text-gray-500 text-sm mt-1">{question.explanationEn}</p>
            </div>
          )}

          {showResult && (
            <button
              onClick={nextQuestion}
              className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Следующий вопрос / Next' : 'Результаты / Results'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ScenarioScreen() {
  const [selectedBank, setSelectedBank] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [rateDirection, setRateDirection] = useState<'up' | 'down'>('up');

  const bank = scenarios[selectedBank];

  const getRating = (value: number, good: number, bad: number, inverse: boolean = false): { rating: number; color: string } => {
    if (inverse) {
      if (value <= good) return { rating: 1, color: 'text-green-600' };
      if (value <= bad) return { rating: 3, color: 'text-yellow-600' };
      return { rating: 5, color: 'text-red-600' };
    }
    if (value >= good) return { rating: 1, color: 'text-green-600' };
    if (value >= bad) return { rating: 3, color: 'text-yellow-600' };
    return { rating: 5, color: 'text-red-600' };
  };

  const capitalRating = getRating(bank.car, 15, 10);
  const assetRating = getRating(bank.npl, 3, 5, true);
  const earningsRating = getRating(bank.roe, 12, 8);
  const liquidityRating = getRating(bank.lcr, 120, 100);

  const isLiabilitySensitive = bank.fixedRateLoans > 50 && bank.shortTermDeposits > 70;
  const rateImpact = isLiabilitySensitive 
    ? (rateDirection === 'up' ? 'negative' : 'positive')
    : (rateDirection === 'up' ? 'positive' : 'negative');

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Bank Selector */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {scenarios.map((b, i) => (
          <button
            key={i}
            onClick={() => { setSelectedBank(i); setShowAnalysis(false); }}
            className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition ${
              selectedBank === i
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 hover:border-purple-300'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Bank Data */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4">{bank.name} — Исходные данные / Key Indicators</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span>CAR:</span>
              <span className="font-bold">{bank.car}% <span className="text-gray-400 text-sm">(avg: {bank.countryAvgCar}%)</span></span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>NPL Ratio:</span>
              <span className="font-bold">{bank.npl}% <span className="text-gray-400 text-sm">(avg: {bank.countryAvgNpl}%)</span></span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Provision/NPL:</span>
              <span className="font-bold">{bank.provisionCoverage}%</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>LCR:</span>
              <span className="font-bold">{bank.lcr}%</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>NSFR:</span>
              <span className="font-bold">{bank.nsfr}%</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>ROE:</span>
              <span className="font-bold">{bank.roe}% <span className="text-gray-400 text-sm">(avg: {bank.countryAvgRoe}%)</span></span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>ROA:</span>
              <span className="font-bold">{bank.roa}% <span className="text-gray-400 text-sm">(avg: {bank.countryAvgRoa}%)</span></span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Fixed-rate loans:</span>
              <span className="font-bold">{bank.fixedRateLoans}%</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Short-term deposits:</span>
              <span className="font-bold">{bank.shortTermDeposits}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-4">Сценарий ставок / Rate Scenario</h3>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setRateDirection('up')}
              className={`flex-1 py-3 rounded-xl font-bold transition ${
                rateDirection === 'up'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="w-5 h-5 mx-auto mb-1" />
              Ставки ↑
            </button>
            <button
              onClick={() => setRateDirection('down')}
              className={`flex-1 py-3 rounded-xl font-bold transition ${
                rateDirection === 'down'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <TrendingDown className="w-5 h-5 mx-auto mb-1" />
              Ставки ↓
            </button>
          </div>

          <div className={`p-4 rounded-xl ${isLiabilitySensitive ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
            <h4 className={`font-bold ${isLiabilitySensitive ? 'text-orange-800' : 'text-blue-800'}`}>
              Тип банка: {isLiabilitySensitive ? 'Liability-sensitive' : 'Asset-sensitive'}
            </h4>
            <p className={`mt-2 ${isLiabilitySensitive ? 'text-orange-700' : 'text-blue-700'}`}>
              {bank.fixedRateLoans}% фиксированных кредитов + {bank.shortTermDeposits}% краткосрочных депозитов
              = RSL {">"} RSA
            </p>
          </div>

          <div className={`mt-4 p-4 rounded-xl ${rateImpact === 'positive' ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
            <h4 className={`font-bold ${rateImpact === 'positive' ? 'text-green-800' : 'text-red-800'}`}>
              При {rateDirection === 'up' ? 'росте' : 'падении'} ставок:
            </h4>
            <p className={`mt-1 ${rateImpact === 'positive' ? 'text-green-700' : 'text-red-700'}`}>
              {rateImpact === 'positive' 
                ? '📈 Прибыльность УЛУЧШИТСЯ / Profitability will IMPROVE'
                : '📉 Прибыльность УХУДШИТСЯ / Profitability will DECLINE'}
            </p>
          </div>
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={() => setShowAnalysis(true)}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2 mb-6"
      >
        <Brain className="w-6 h-6" />
        Показать CAMELS анализ / Show CAMELS Analysis
      </button>

      {/* CAMELS Analysis */}
      {showAnalysis && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-xl mb-6">CAMELS Analysis — {bank.name}</h3>

          <div className="space-y-4">
            {/* C */}
            <div className="p-4 rounded-xl border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">C — Capital Adequacy</span>
                <span className={`text-2xl font-bold ${capitalRating.color}`}>
                  Rating: {capitalRating.rating}
                </span>
              </div>
              <p>CAR {bank.car}% vs avg {bank.countryAvgCar}%. {bank.car > bank.countryAvgCar ? 'Выше среднего ✅' : 'Ниже среднего ⚠️'}</p>
              <p className="text-gray-500 text-sm">Basel III minimum: 10.5%. Bank has {bank.car > 10.5 ? 'sufficient' : 'insufficient'} capital buffer.</p>
            </div>

            {/* A */}
            <div className="p-4 rounded-xl border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">A — Asset Quality</span>
                <span className={`text-2xl font-bold ${assetRating.color}`}>
                  Rating: {assetRating.rating}
                </span>
              </div>
              <p>NPL {bank.npl}% vs avg {bank.countryAvgNpl}%. {bank.npl < bank.countryAvgNpl ? 'Лучше среднего ✅' : 'Хуже среднего ❌'}</p>
              <p>Coverage {bank.provisionCoverage}%. {bank.provisionCoverage >= 100 ? 'Резервы достаточны ✅' : 'Недорезервирован ⚠️'}</p>
            </div>

            {/* E */}
            <div className="p-4 rounded-xl border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">E — Earnings</span>
                <span className={`text-2xl font-bold ${earningsRating.color}`}>
                  Rating: {earningsRating.rating}
                </span>
              </div>
              <p>ROE {bank.roe}% vs avg {bank.countryAvgRoe}%. {bank.roe >= bank.countryAvgRoe ? '✅' : '⚠️ Ниже среднего'}</p>
              <p>ROA {bank.roa}% vs avg {bank.countryAvgRoa}%. {bank.roa >= bank.countryAvgRoa ? '✅' : '⚠️ Ниже среднего'}</p>
            </div>

            {/* L */}
            <div className="p-4 rounded-xl border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">L — Liquidity</span>
                <span className={`text-2xl font-bold ${liquidityRating.color}`}>
                  Rating: {liquidityRating.rating}
                </span>
              </div>
              <p>LCR {bank.lcr}%, NSFR {bank.nsfr}%. {bank.lcr >= 100 && bank.nsfr >= 100 ? 'Соответствует Basel III ✅' : 'Проблемы с ликвидностью ❌'}</p>
            </div>

            {/* S */}
            <div className="p-4 rounded-xl border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">S — Sensitivity</span>
                <span className="text-2xl font-bold text-yellow-600">
                  Rating: 3
                </span>
              </div>
              <p>{isLiabilitySensitive ? 'Liability-sensitive' : 'Asset-sensitive'} — {bank.fixedRateLoans}% fixed loans, {bank.shortTermDeposits}% short deposits.</p>
              <p className="text-gray-500 text-sm">Bank is exposed to interest rate risk due to maturity mismatch.</p>
            </div>

            {/* Composite */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl">Composite CAMELS Rating</span>
                <span className="text-3xl font-bold text-purple-700">
                  {Math.round((capitalRating.rating + assetRating.rating + 3 + earningsRating.rating + liquidityRating.rating + 3) / 6)}
                </span>
              </div>
              <p className="mt-2 text-purple-700">
                {Math.round((capitalRating.rating + assetRating.rating + 3 + earningsRating.rating + liquidityRating.rating + 3) / 6) <= 2 
                  ? 'Strong/Satisfactory — банк в хорошем состоянии'
                  : 'Fair — требует внимания регулятора'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MAIN APP ====================
export default function Home() {
  const [mode, setMode] = useState<Mode>('menu');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header mode={mode} setMode={setMode} />
      
      {mode === 'menu' && <MenuScreen setMode={setMode} />}
      {mode === 'learn' && <LearnScreen />}
      {mode === 'calculator' && <CalculatorScreen />}
      {mode === 'quiz' && <QuizScreen />}
      {mode === 'scenario' && <ScenarioScreen />}

      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>CAMELS Trainer — Financial Institutions Exam Prep</p>
        <p>Made for exam preparation 🎓</p>
      </footer>
    </div>
  );
}
