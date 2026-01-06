'use client';

import { useState } from 'react';

// ============================================
// DATA: Questions and Quiz
// ============================================

const quizQuestions = [
  {
    id: 1,
    category: 'GAP Analysis',
    question: {
      en: 'A bank has $5 million in rate-sensitive assets and $4 million in rate-sensitive liabilities. What is the Interest Sensitivity Ratio (ISR)?',
      ru: 'Банк имеет $5 млн rate-sensitive активов и $4 млн rate-sensitive пассивов. Чему равен ISR?'
    },
    options: ['a) -$1 million', 'b) $1 million', 'c) 0.8', 'd) 1.25'],
    correct: 3,
    explanation: {
      en: 'ISR = RSA / RSL = $5M / $4M = 1.25. ISR > 1 means the bank is asset-sensitive.',
      ru: 'ISR = RSA / RSL = $5M / $4M = 1.25. ISR > 1 означает, что банк asset-sensitive.'
    },
    formula: 'ISR = RSA / RSL'
  },
  {
    id: 2,
    category: 'GAP Analysis',
    question: {
      en: 'A bank has RSA = $4M, RSL = $5M, Total Assets = $7M. What is the Relative GAP?',
      ru: 'Банк имеет RSA = $4M, RSL = $5M, Total Assets = $7M. Чему равен Relative GAP?'
    },
    options: ['a) -0.14', 'b) $1 million', 'c) 0.8', 'd) 1.25'],
    correct: 0,
    explanation: {
      en: 'GAP = RSA - RSL = $4M - $5M = -$1M. Relative GAP = GAP / Assets = -$1M / $7M = -0.143 ≈ -0.14',
      ru: 'GAP = RSA - RSL = $4M - $5M = -$1M. Relative GAP = GAP / Assets = -$1M / $7M = -0.143 ≈ -0.14'
    },
    formula: 'Relative GAP = (RSA - RSL) / Total Assets'
  },
  {
    id: 3,
    category: 'Profitability',
    question: {
      en: 'A bank has Total Assets = $240M, Equity = $170M, Net Income = $4.2M. What is the ROE?',
      ru: 'Банк имеет Total Assets = $240M, Equity = $170M, Net Income = $4.2M. Чему равен ROE?'
    },
    options: ['a) 1.8%', 'b) 2.5%', 'c) 6.0%', 'd) 1.75%'],
    correct: 1,
    explanation: {
      en: 'ROE = Net Income / Equity = $4.2M / $170M = 0.0247 = 2.47% ≈ 2.5%',
      ru: 'ROE = Net Income / Equity = $4.2M / $170M = 0.0247 = 2.47% ≈ 2.5%'
    },
    formula: 'ROE = Net Income / Equity'
  },
  {
    id: 4,
    category: 'Profitability',
    question: {
      en: 'A bank has Total Assets = $240M, Equity = $170M, Net Income = $4.2M. What is the ROA?',
      ru: 'Банк имеет Total Assets = $240M, Equity = $170M, Net Income = $4.2M. Чему равен ROA?'
    },
    options: ['a) 1.75%', 'b) 2.5%', 'c) 6.0%', 'd) 2.47%'],
    correct: 0,
    explanation: {
      en: 'ROA = Net Income / Total Assets = $4.2M / $240M = 0.0175 = 1.75%',
      ru: 'ROA = Net Income / Total Assets = $4.2M / $240M = 0.0175 = 1.75%'
    },
    formula: 'ROA = Net Income / Total Assets'
  },
  {
    id: 5,
    category: 'NIM',
    question: {
      en: 'A bank has Assets = $7M, Interest Expense = $4M, Interest Revenue = $7M. What is NIM?',
      ru: 'Банк имеет Assets = $7M, Interest Expense = $4M, Interest Revenue = $7M. Чему равен NIM?'
    },
    options: ['a) 43%', 'b) -43%', 'c) 47%', 'd) 27%'],
    correct: 0,
    explanation: {
      en: 'NIM = (Interest Income - Interest Expense) / Assets = ($7M - $4M) / $7M = $3M / $7M = 0.4286 = 43%',
      ru: 'NIM = (Interest Income - Interest Expense) / Assets = ($7M - $4M) / $7M = $3M / $7M = 0.4286 = 43%'
    },
    formula: 'NIM = (Interest Income - Interest Expense) / Total Assets'
  },
  {
    id: 6,
    category: 'Institutions',
    question: {
      en: 'What is the main use of funds for Money Market Funds?',
      ru: 'Каково основное использование средств Money Market Funds?'
    },
    options: [
      'a) Short-term securities / Краткосрочные ценные бумаги',
      'b) Long-term securities / Долгосрочные ценные бумаги',
      'c) Loans to households / Кредиты домохозяйствам',
      'd) Real estate / Недвижимость'
    ],
    correct: 0,
    explanation: {
      en: 'Money Market Funds invest in SHORT-TERM government and corporate securities (T-bills, commercial paper).',
      ru: 'Money Market Funds инвестируют в КРАТКОСРОЧНЫЕ государственные и корпоративные ценные бумаги.'
    },
    formula: null
  },
  {
    id: 7,
    category: 'Institutions',
    question: {
      en: 'What is the main use of funds for Pension Funds?',
      ru: 'Каково основное использование средств Pension Funds?'
    },
    options: [
      'a) Short-term securities / Краткосрочные бумаги',
      'b) Long-term securities / Долгосрочные бумаги',
      'c) Loans to households / Кредиты',
      'd) None of the above'
    ],
    correct: 1,
    explanation: {
      en: 'Pension Funds invest in LONG-TERM securities because pensions are long-term obligations.',
      ru: 'Pension Funds инвестируют в ДОЛГОСРОЧНЫЕ ценные бумаги, потому что пенсии — долгосрочные обязательства.'
    },
    formula: null
  },
  {
    id: 8,
    category: 'Institutions',
    question: {
      en: 'What is the main use of funds for Commercial Banks?',
      ru: 'Каково основное использование средств Commercial Banks?'
    },
    options: [
      'a) Short-term securities',
      'b) Long-term securities',
      'c) Loans to households and business / Кредиты',
      'd) None of the above'
    ],
    correct: 2,
    explanation: {
      en: 'Commercial Banks primarily make LOANS to households and businesses. They do NOT primarily buy securities.',
      ru: 'Commercial Banks в основном выдают КРЕДИТЫ. Они НЕ покупают ценные бумаги как основной бизнес.'
    },
    formula: null
  },
  {
    id: 9,
    category: 'Swap',
    question: {
      en: 'In an interest rate swap, two parties agree to periodically exchange interest payments on a specified notional amount of principal.',
      ru: 'В interest rate swap две стороны договариваются периодически обмениваться процентными платежами на определённую номинальную сумму.'
    },
    options: ['a) True / Верно', 'b) False / Неверно'],
    correct: 0,
    explanation: {
      en: 'TRUE. In a swap, parties exchange interest payments (fixed vs floating) based on a notional amount. The principal itself is NOT exchanged.',
      ru: 'ВЕРНО. В свопе стороны обмениваются процентными платежами (фикс vs плавающий). Сама сумма НЕ обменивается.'
    },
    formula: null
  },
  {
    id: 10,
    category: 'Liquidity',
    question: {
      en: 'LCR (Liquidity Coverage Ratio) is used to measure which type of risk?',
      ru: 'LCR (Liquidity Coverage Ratio) используется для измерения какого типа риска?'
    },
    options: [
      'a) Credit Risk / Кредитный риск',
      'b) Market Risk / Рыночный риск',
      'c) Liquidity Risk / Риск ликвидности',
      'd) Operational Risk / Операционный риск'
    ],
    correct: 2,
    explanation: {
      en: 'LCR measures LIQUIDITY risk - whether the bank has enough liquid assets to survive 30 days of stress.',
      ru: 'LCR измеряет риск ЛИКВИДНОСТИ — достаточно ли у банка ликвидных активов на 30 дней стресса.'
    },
    formula: 'LCR = HQLA / Net Cash Outflows (30 days) ≥ 100%'
  },
  {
    id: 11,
    category: 'Asset Quality',
    question: {
      en: 'Provision/NPL ratio is used to evaluate which CAMELS component?',
      ru: 'Коэффициент Provision/NPL используется для оценки какого компонента CAMELS?'
    },
    options: [
      'a) Capital Adequacy',
      'b) Asset Quality / Качество активов',
      'c) Earnings / Прибыльность',
      'd) Liquidity / Ликвидность'
    ],
    correct: 1,
    explanation: {
      en: 'Provision/NPL measures how well the bank has reserved for bad loans - this is ASSET QUALITY.',
      ru: 'Provision/NPL показывает, насколько хорошо банк зарезервировал под плохие кредиты — это КАЧЕСТВО АКТИВОВ.'
    },
    formula: 'Provision Coverage = Loan Loss Reserves / NPL'
  },
  {
    id: 12,
    category: 'Credit',
    question: {
      en: 'What is the PRIMARY source of loan repayment?',
      ru: 'Каков ПЕРВИЧНЫЙ источник погашения кредита?'
    },
    options: [
      'a) Adequacy of cash flow / Достаточность денежного потока',
      'b) Collateral / Залог',
      'c) Guarantee / Гарантия',
      'd) All of the above / Всё вышеперечисленное'
    ],
    correct: 0,
    explanation: {
      en: 'PRIMARY source is CASH FLOW! Collateral is only the SECONDARY source (used if cash flow fails).',
      ru: 'ПЕРВИЧНЫЙ источник — ДЕНЕЖНЫЙ ПОТОК! Залог — только ВТОРИЧНЫЙ источник (если cash flow не хватило).'
    },
    formula: null
  },
  {
    id: 13,
    category: 'Clearing',
    question: {
      en: 'What is the difference between Clearing and Settlement?',
      ru: 'В чём разница между Clearing и Settlement?'
    },
    options: [
      'a) They are the same / Это одно и то же',
      'b) Clearing = reconciliation, Settlement = money transfer / Clearing = сверка, Settlement = перевод',
      'c) Clearing = money transfer, Settlement = reconciliation',
      'd) None of the above'
    ],
    correct: 1,
    explanation: {
      en: 'CLEARING = reconciliation and netting (who owes whom). SETTLEMENT = actual money transfer.',
      ru: 'CLEARING = сверка и неттинг (кто кому должен). SETTLEMENT = реальный перевод денег.'
    },
    formula: null
  },
  {
    id: 14,
    category: 'Pooling',
    question: {
      en: 'In Notional Cash Pooling, money is physically transferred between accounts.',
      ru: 'В Notional Cash Pooling деньги физически перемещаются между счетами.'
    },
    options: ['a) True / Верно', 'b) False / Неверно'],
    correct: 1,
    explanation: {
      en: 'FALSE. In NOTIONAL pooling, there are NO physical transfers. Balances are only virtually combined for interest calculation.',
      ru: 'НЕВЕРНО. В NOTIONAL pooling НЕТ физических переводов. Балансы только виртуально объединяются для расчёта процентов.'
    },
    formula: null
  },
  {
    id: 15,
    category: 'Yield Curve',
    question: {
      en: 'An inverted (downward-sloping) yield curve typically predicts:',
      ru: 'Инвертированная (нисходящая) кривая доходности обычно предсказывает:'
    },
    options: [
      'a) Economic growth / Экономический рост',
      'b) Recession / Рецессию',
      'c) Inflation / Инфляцию',
      'd) Nothing specific / Ничего конкретного'
    ],
    correct: 1,
    explanation: {
      en: 'An INVERTED yield curve (short-term rates > long-term rates) historically predicts RECESSION.',
      ru: 'ИНВЕРТИРОВАННАЯ кривая доходности (краткосрочные ставки > долгосрочных) исторически предсказывает РЕЦЕССИЮ.'
    },
    formula: null
  },
  {
    id: 16,
    category: 'Sensitivity',
    question: {
      en: 'A bank has 60% long-term FIXED-rate loans and deposits with maturity < 180 days. If interest rates RISE, what happens to profitability?',
      ru: 'Банк имеет 60% долгосрочных кредитов с ФИКСИРОВАННОЙ ставкой и депозиты сроком < 180 дней. Если ставки ВЫРАСТУТ, что случится с прибыльностью?'
    },
    options: [
      'a) Increases / Вырастет',
      'b) Decreases / Упадёт',
      'c) No change / Не изменится',
      'd) Cannot determine / Невозможно определить'
    ],
    correct: 1,
    explanation: {
      en: 'Fixed-rate loans = NOT rate-sensitive. Short deposits = rate-sensitive. So RSL > RSA → LIABILITY-SENSITIVE. When rates rise, expenses grow more than income → PROFITABILITY DECREASES.',
      ru: 'Фиксированные кредиты = НЕ rate-sensitive. Краткосрочные депозиты = rate-sensitive. RSL > RSA → LIABILITY-SENSITIVE. При росте ставок расходы растут больше доходов → ПРИБЫЛЬНОСТЬ ПАДАЕТ.'
    },
    formula: 'ΔNIM = GAP × Δr (GAP < 0, Δr > 0 → ΔNIM < 0)'
  },
  {
    id: 17,
    category: 'Capital',
    question: {
      en: 'A bank has Total Capital = $85B, Risk-Weighted Assets = $500B. What is the CAR?',
      ru: 'Банк имеет Total Capital = $85B, Risk-Weighted Assets = $500B. Чему равен CAR?'
    },
    options: ['a) 5.9%', 'b) 17%', 'c) 85%', 'd) 170%'],
    correct: 1,
    explanation: {
      en: 'CAR = Total Capital / RWA = $85B / $500B = 0.17 = 17%',
      ru: 'CAR = Total Capital / RWA = $85B / $500B = 0.17 = 17%'
    },
    formula: 'CAR = (Tier 1 + Tier 2) / Risk-Weighted Assets'
  },
  {
    id: 18,
    category: 'Basel',
    question: {
      en: 'What is the minimum Total Capital ratio required by Basel III (including conservation buffer)?',
      ru: 'Какой минимальный коэффициент Total Capital требуется по Basel III (включая буфер)?'
    },
    options: ['a) 8%', 'b) 10.5%', 'c) 4.5%', 'd) 6%'],
    correct: 1,
    explanation: {
      en: 'Basel III: Total Capital minimum = 8% + 2.5% conservation buffer = 10.5%',
      ru: 'Basel III: минимум Total Capital = 8% + 2.5% буфер консервации = 10.5%'
    },
    formula: 'Total Capital ≥ 8% + 2.5% buffer = 10.5%'
  },
  {
    id: 19,
    category: 'CAMELS',
    question: {
      en: 'A bank has NPL = 5.5% (country average 3%), Provision/NPL = 70%. How would you rate Asset Quality?',
      ru: 'Банк имеет NPL = 5.5% (среднее по стране 3%), Provision/NPL = 70%. Как бы вы оценили Asset Quality?'
    },
    options: [
      'a) 1 - Strong',
      'b) 2 - Satisfactory',
      'c) 3 - Fair',
      'd) 4 - Marginal / Poor'
    ],
    correct: 3,
    explanation: {
      en: 'NPL 5.5% is almost DOUBLE the country average! Plus provision coverage is only 70% (should be >100%). This is Rating 4 - Marginal.',
      ru: 'NPL 5.5% почти ВДВОЕ выше среднего! Плюс покрытие резервами только 70% (должно быть >100%). Это рейтинг 4 - Marginal.'
    },
    formula: null
  },
  {
    id: 20,
    category: 'Duration',
    question: {
      en: 'A bank has DA = 5 years, DL = 2 years, L/A = 0.9. What is the Duration GAP?',
      ru: 'Банк имеет DA = 5 лет, DL = 2 года, L/A = 0.9. Чему равен Duration GAP?'
    },
    options: ['a) 3 years', 'b) 3.2 years', 'c) 5 years', 'd) 1.8 years'],
    correct: 1,
    explanation: {
      en: 'DGAP = DA - (L/A) × DL = 5 - 0.9 × 2 = 5 - 1.8 = 3.2 years. Positive DGAP means bank loses when rates rise.',
      ru: 'DGAP = DA - (L/A) × DL = 5 - 0.9 × 2 = 5 - 1.8 = 3.2 года. Положительный DGAP = банк теряет при росте ставок.'
    },
    formula: 'DGAP = DA - (L/A) × DL'
  }
];

const formulas = [
  { category: 'Profitability', name: 'ROE', formula: 'Net Income / Equity', benchmark: '> 10-15%' },
  { category: 'Profitability', name: 'ROA', formula: 'Net Income / Total Assets', benchmark: '> 1%' },
  { category: 'Profitability', name: 'NIM', formula: '(Int Income - Int Expense) / Assets', benchmark: '3-4%' },
  { category: 'Capital', name: 'CAR', formula: '(Tier1 + Tier2) / RWA', benchmark: '≥ 10.5%' },
  { category: 'Capital', name: 'CET1 Ratio', formula: 'CET1 / RWA', benchmark: '≥ 7%' },
  { category: 'Capital', name: 'Leverage Ratio', formula: 'Tier1 / Total Exposure', benchmark: '≥ 3%' },
  { category: 'Asset Quality', name: 'NPL Ratio', formula: 'NPL / Total Loans', benchmark: '< 3%' },
  { category: 'Asset Quality', name: 'Provision Coverage', formula: 'Reserves / NPL', benchmark: '≥ 100%' },
  { category: 'Liquidity', name: 'LCR', formula: 'HQLA / Net Outflows (30d)', benchmark: '≥ 100%' },
  { category: 'Liquidity', name: 'NSFR', formula: 'ASF / RSF', benchmark: '≥ 100%' },
  { category: 'Sensitivity', name: 'GAP', formula: 'RSA - RSL', benchmark: '≈ 0' },
  { category: 'Sensitivity', name: 'ISR', formula: 'RSA / RSL', benchmark: '≈ 1' },
  { category: 'Sensitivity', name: 'Relative GAP', formula: 'GAP / Total Assets', benchmark: '≈ 0' },
  { category: 'Sensitivity', name: 'ΔNIM', formula: 'GAP × Δr', benchmark: '-' },
  { category: 'Sensitivity', name: 'DGAP', formula: 'DA - (L/A) × DL', benchmark: '≈ 0' },
];

// ============================================
// COMPONENTS
// ============================================

function Header({ lang, setLang }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">CAMELS Trainer</h1>
          <p className="text-blue-100">
            {lang === 'en' ? 'Interactive Banking Analysis Practice' : 'Интерактивный тренажёр банковского анализа'}
          </p>
        </div>
        <button
          onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-bold transition-all"
        >
          {lang === 'en' ? '🇷🇺 Русский' : '🇬🇧 English'}
        </button>
      </div>
    </header>
  );
}

function TabNav({ activeTab, setActiveTab, lang }) {
  const tabs = [
    { id: 'calculator', en: '📊 Calculator', ru: '📊 Калькулятор' },
    { id: 'quiz', en: '❓ Quiz', ru: '❓ Тест' },
    { id: 'formulas', en: '📐 Formulas', ru: '📐 Формулы' },
    { id: 'theory', en: '📚 Theory', ru: '📚 Теория' },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white shadow-md">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${
            activeTab === tab.id ? 'tab-active' : 'tab-inactive'
          }`}
        >
          {lang === 'en' ? tab.en : tab.ru}
        </button>
      ))}
    </div>
  );
}

function Calculator({ lang }) {
  const [data, setData] = useState({
    netIncome: '',
    equity: '',
    assets: '',
    intIncome: '',
    intExpense: '',
    npl: '',
    totalLoans: '',
    provisions: '',
    rsa: '',
    rsl: '',
    tier1: '',
    tier2: '',
    rwa: '',
    hqla: '',
    netOutflows: '',
  });

  const [results, setResults] = useState(null);

  const calculate = () => {
    const r = {};
    
    // Profitability
    if (data.netIncome && data.equity) {
      r.roe = (parseFloat(data.netIncome) / parseFloat(data.equity) * 100).toFixed(2);
    }
    if (data.netIncome && data.assets) {
      r.roa = (parseFloat(data.netIncome) / parseFloat(data.assets) * 100).toFixed(2);
    }
    if (data.intIncome && data.intExpense && data.assets) {
      r.nim = ((parseFloat(data.intIncome) - parseFloat(data.intExpense)) / parseFloat(data.assets) * 100).toFixed(2);
    }
    
    // Asset Quality
    if (data.npl && data.totalLoans) {
      r.nplRatio = (parseFloat(data.npl) / parseFloat(data.totalLoans) * 100).toFixed(2);
    }
    if (data.provisions && data.npl) {
      r.provisionCoverage = (parseFloat(data.provisions) / parseFloat(data.npl) * 100).toFixed(2);
    }
    
    // Capital
    if (data.tier1 && data.tier2 && data.rwa) {
      r.car = ((parseFloat(data.tier1) + parseFloat(data.tier2)) / parseFloat(data.rwa) * 100).toFixed(2);
    }
    if (data.tier1 && data.rwa) {
      r.tier1Ratio = (parseFloat(data.tier1) / parseFloat(data.rwa) * 100).toFixed(2);
    }
    
    // Liquidity
    if (data.hqla && data.netOutflows) {
      r.lcr = (parseFloat(data.hqla) / parseFloat(data.netOutflows) * 100).toFixed(2);
    }
    
    // Sensitivity
    if (data.rsa && data.rsl) {
      r.gap = (parseFloat(data.rsa) - parseFloat(data.rsl)).toFixed(2);
      r.isr = (parseFloat(data.rsa) / parseFloat(data.rsl)).toFixed(2);
      if (data.assets) {
        r.relativeGap = ((parseFloat(data.rsa) - parseFloat(data.rsl)) / parseFloat(data.assets) * 100).toFixed(2);
      }
      r.bankType = parseFloat(data.rsa) > parseFloat(data.rsl) ? 'Asset-Sensitive' : 'Liability-Sensitive';
    }

    // CAMELS Ratings
    r.ratings = {};
    
    // C - Capital
    if (r.car) {
      const car = parseFloat(r.car);
      if (car >= 15) r.ratings.capital = { score: 1, label: 'Strong' };
      else if (car >= 12) r.ratings.capital = { score: 2, label: 'Satisfactory' };
      else if (car >= 10.5) r.ratings.capital = { score: 3, label: 'Fair' };
      else if (car >= 8) r.ratings.capital = { score: 4, label: 'Marginal' };
      else r.ratings.capital = { score: 5, label: 'Unsatisfactory' };
    }
    
    // A - Asset Quality
    if (r.nplRatio) {
      const npl = parseFloat(r.nplRatio);
      if (npl <= 1) r.ratings.assets = { score: 1, label: 'Strong' };
      else if (npl <= 2.5) r.ratings.assets = { score: 2, label: 'Satisfactory' };
      else if (npl <= 3.5) r.ratings.assets = { score: 3, label: 'Fair' };
      else if (npl <= 5.5) r.ratings.assets = { score: 4, label: 'Marginal' };
      else r.ratings.assets = { score: 5, label: 'Unsatisfactory' };
    }
    
    // E - Earnings
    if (r.roa) {
      const roa = parseFloat(r.roa);
      if (roa >= 1.5) r.ratings.earnings = { score: 1, label: 'Strong' };
      else if (roa >= 1) r.ratings.earnings = { score: 2, label: 'Satisfactory' };
      else if (roa >= 0.5) r.ratings.earnings = { score: 3, label: 'Fair' };
      else if (roa >= 0) r.ratings.earnings = { score: 4, label: 'Marginal' };
      else r.ratings.earnings = { score: 5, label: 'Unsatisfactory' };
    }
    
    // L - Liquidity
    if (r.lcr) {
      const lcr = parseFloat(r.lcr);
      if (lcr >= 150) r.ratings.liquidity = { score: 1, label: 'Strong' };
      else if (lcr >= 120) r.ratings.liquidity = { score: 2, label: 'Satisfactory' };
      else if (lcr >= 100) r.ratings.liquidity = { score: 3, label: 'Fair' };
      else if (lcr >= 80) r.ratings.liquidity = { score: 4, label: 'Marginal' };
      else r.ratings.liquidity = { score: 5, label: 'Unsatisfactory' };
    }

    setResults(r);
  };

  const InputField = ({ label, field, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        className="input-field"
        placeholder={placeholder}
        value={data[field]}
        onChange={(e) => setData({...data, [field]: e.target.value})}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          {lang === 'en' ? '📊 CAMELS Calculator' : '📊 Калькулятор CAMELS'}
        </h2>
        <p className="text-gray-600 mb-6">
          {lang === 'en' 
            ? 'Enter bank data to calculate all ratios and get CAMELS ratings automatically.'
            : 'Введите данные банка для автоматического расчёта всех коэффициентов и рейтингов CAMELS.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profitability */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-green-700">
              {lang === 'en' ? 'Profitability (E)' : 'Прибыльность (E)'}
            </h3>
            <InputField label="Net Income" field="netIncome" placeholder="e.g., 13" />
            <InputField label="Equity" field="equity" placeholder="e.g., 100" />
            <InputField label="Total Assets" field="assets" placeholder="e.g., 1000" />
            <InputField label="Interest Income" field="intIncome" placeholder="e.g., 50" />
            <InputField label="Interest Expense" field="intExpense" placeholder="e.g., 30" />
          </div>

          {/* Asset Quality & Capital */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-orange-700">
              {lang === 'en' ? 'Asset Quality (A) & Capital (C)' : 'Качество активов (A) и Капитал (C)'}
            </h3>
            <InputField label="NPL (Non-Performing Loans)" field="npl" placeholder="e.g., 5" />
            <InputField label="Total Loans" field="totalLoans" placeholder="e.g., 100" />
            <InputField label="Loan Loss Provisions" field="provisions" placeholder="e.g., 3.5" />
            <InputField label="Tier 1 Capital" field="tier1" placeholder="e.g., 80" />
            <InputField label="Tier 2 Capital" field="tier2" placeholder="e.g., 20" />
            <InputField label="Risk-Weighted Assets" field="rwa" placeholder="e.g., 500" />
          </div>

          {/* Liquidity & Sensitivity */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-purple-700">
              {lang === 'en' ? 'Liquidity (L) & Sensitivity (S)' : 'Ликвидность (L) и Чувствительность (S)'}
            </h3>
            <InputField label="HQLA" field="hqla" placeholder="e.g., 150" />
            <InputField label="Net Cash Outflows (30d)" field="netOutflows" placeholder="e.g., 100" />
            <InputField label="Rate-Sensitive Assets (RSA)" field="rsa" placeholder="e.g., 300" />
            <InputField label="Rate-Sensitive Liabilities (RSL)" field="rsl" placeholder="e.g., 400" />
          </div>
        </div>

        <button onClick={calculate} className="btn-primary mt-6 w-full md:w-auto">
          {lang === 'en' ? '🔢 Calculate All Ratios' : '🔢 Рассчитать все показатели'}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">
            {lang === 'en' ? '📋 Results / Результаты' : '📋 Результаты / Results'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Profitability */}
            {results.roe && (
              <div className={`p-4 rounded-lg ${parseFloat(results.roe) >= 10 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <div className="text-sm text-gray-600">ROE (Return on Equity)</div>
                <div className="text-2xl font-bold">{results.roe}%</div>
                <div className="text-xs text-gray-500">Benchmark: &gt;10%</div>
              </div>
            )}
            {results.roa && (
              <div className={`p-4 rounded-lg ${parseFloat(results.roa) >= 1 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <div className="text-sm text-gray-600">ROA (Return on Assets)</div>
                <div className="text-2xl font-bold">{results.roa}%</div>
                <div className="text-xs text-gray-500">Benchmark: &gt;1%</div>
              </div>
            )}
            {results.nim && (
              <div className={`p-4 rounded-lg ${parseFloat(results.nim) >= 3 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <div className="text-sm text-gray-600">NIM (Net Interest Margin)</div>
                <div className="text-2xl font-bold">{results.nim}%</div>
                <div className="text-xs text-gray-500">Benchmark: 3-4%</div>
              </div>
            )}

            {/* Capital */}
            {results.car && (
              <div className={`p-4 rounded-lg ${parseFloat(results.car) >= 10.5 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-sm text-gray-600">CAR (Capital Adequacy Ratio)</div>
                <div className="text-2xl font-bold">{results.car}%</div>
                <div className="text-xs text-gray-500">Minimum: ≥10.5%</div>
              </div>
            )}

            {/* Asset Quality */}
            {results.nplRatio && (
              <div className={`p-4 rounded-lg ${parseFloat(results.nplRatio) <= 3 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-sm text-gray-600">NPL Ratio</div>
                <div className="text-2xl font-bold">{results.nplRatio}%</div>
                <div className="text-xs text-gray-500">Benchmark: &lt;3%</div>
              </div>
            )}
            {results.provisionCoverage && (
              <div className={`p-4 rounded-lg ${parseFloat(results.provisionCoverage) >= 100 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-sm text-gray-600">Provision Coverage</div>
                <div className="text-2xl font-bold">{results.provisionCoverage}%</div>
                <div className="text-xs text-gray-500">Benchmark: ≥100%</div>
              </div>
            )}

            {/* Liquidity */}
            {results.lcr && (
              <div className={`p-4 rounded-lg ${parseFloat(results.lcr) >= 100 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="text-sm text-gray-600">LCR (Liquidity Coverage)</div>
                <div className="text-2xl font-bold">{results.lcr}%</div>
                <div className="text-xs text-gray-500">Minimum: ≥100%</div>
              </div>
            )}

            {/* Sensitivity */}
            {results.gap && (
              <div className={`p-4 rounded-lg ${results.bankType === 'Asset-Sensitive' ? 'bg-blue-100' : 'bg-orange-100'}`}>
                <div className="text-sm text-gray-600">GAP</div>
                <div className="text-2xl font-bold">{results.gap}</div>
                <div className="text-xs font-bold">{results.bankType}</div>
              </div>
            )}
            {results.isr && (
              <div className="p-4 rounded-lg bg-purple-100">
                <div className="text-sm text-gray-600">ISR (Interest Sensitivity Ratio)</div>
                <div className="text-2xl font-bold">{results.isr}</div>
                <div className="text-xs text-gray-500">{parseFloat(results.isr) > 1 ? 'Asset-Sensitive' : 'Liability-Sensitive'}</div>
              </div>
            )}
          </div>

          {/* CAMELS Ratings */}
          {Object.keys(results.ratings).length > 0 && (
            <div className="mt-6 p-4 bg-white rounded-lg">
              <h3 className="font-bold text-lg mb-4">
                {lang === 'en' ? '🏆 CAMELS Ratings' : '🏆 Рейтинги CAMELS'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.ratings.capital && (
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600">{results.ratings.capital.score}</div>
                    <div className="text-sm font-bold">C - Capital</div>
                    <div className="text-xs text-gray-500">{results.ratings.capital.label}</div>
                  </div>
                )}
                {results.ratings.assets && (
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-4xl font-bold text-orange-600">{results.ratings.assets.score}</div>
                    <div className="text-sm font-bold">A - Assets</div>
                    <div className="text-xs text-gray-500">{results.ratings.assets.label}</div>
                  </div>
                )}
                {results.ratings.earnings && (
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-4xl font-bold text-green-600">{results.ratings.earnings.score}</div>
                    <div className="text-sm font-bold">E - Earnings</div>
                    <div className="text-xs text-gray-500">{results.ratings.earnings.label}</div>
                  </div>
                )}
                {results.ratings.liquidity && (
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-4xl font-bold text-purple-600">{results.ratings.liquidity.score}</div>
                    <div className="text-sm font-bold">L - Liquidity</div>
                    <div className="text-xs text-gray-500">{results.ratings.liquidity.label}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interest Rate Impact */}
          {results.bankType && (
            <div className={`mt-6 p-4 rounded-lg ${results.bankType === 'Liability-Sensitive' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-green-50 border-l-4 border-green-500'}`}>
              <h3 className="font-bold mb-2">
                {lang === 'en' ? '📈 Interest Rate Impact Analysis' : '📈 Анализ влияния процентных ставок'}
              </h3>
              {results.bankType === 'Liability-Sensitive' ? (
                <div>
                  <p className="text-red-700 font-bold">
                    {lang === 'en' 
                      ? '⚠️ WARNING: Bank is LIABILITY-SENSITIVE' 
                      : '⚠️ ВНИМАНИЕ: Банк LIABILITY-SENSITIVE'}
                  </p>
                  <p className="text-sm mt-2">
                    {lang === 'en'
                      ? 'If rates RISE → Profitability DECREASES (expenses grow faster than income)'
                      : 'Если ставки ВЫРАСТУТ → Прибыльность УПАДЁТ (расходы вырастут больше доходов)'}
                  </p>
                  <p className="text-sm">
                    {lang === 'en'
                      ? 'If rates FALL → Profitability INCREASES'
                      : 'Если ставки УПАДУТ → Прибыльность ВЫРАСТЕТ'}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-green-700 font-bold">
                    {lang === 'en' 
                      ? '✅ Bank is ASSET-SENSITIVE' 
                      : '✅ Банк ASSET-SENSITIVE'}
                  </p>
                  <p className="text-sm mt-2">
                    {lang === 'en'
                      ? 'If rates RISE → Profitability INCREASES'
                      : 'Если ставки ВЫРАСТУТ → Прибыльность ВЫРАСТЕТ'}
                  </p>
                  <p className="text-sm">
                    {lang === 'en'
                      ? 'If rates FALL → Profitability DECREASES'
                      : 'Если ставки УПАДУТ → Прибыльность УПАДЁТ'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Quiz({ lang }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(quizQuestions.map(q => q.category))];
  const filteredQuestions = filter === 'all' 
    ? quizQuestions 
    : quizQuestions.filter(q => q.category === filter);

  const q = filteredQuestions[currentQ % filteredQuestions.length];

  const handleAnswer = (idx) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    setAnswered(answered + 1);
    if (idx === q.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQ((currentQ + 1) % filteredQuestions.length);
    setSelected(null);
    setShowAnswer(false);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswered(0);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="card bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {lang === 'en' ? '❓ Quiz Mode' : '❓ Режим теста'}
            </h2>
            <p>{lang === 'en' ? 'Practice exam questions' : 'Практика экзаменационных вопросов'}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{score}/{answered}</div>
            <div className="text-sm">{answered > 0 ? Math.round(score/answered*100) : 0}% correct</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setCurrentQ(0); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              filter === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat === 'all' ? (lang === 'en' ? 'All Topics' : 'Все темы') : cat}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {lang === 'en' ? 'Question' : 'Вопрос'} {currentQ + 1} / {filteredQuestions.length}
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
            {q.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{q.question.en}</h3>
        <p className="text-gray-600 mb-6">{q.question.ru}</p>

        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={showAnswer}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showAnswer
                  ? idx === q.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : idx === selected
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-50 border-gray-200'
                  : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div className={`mt-6 p-4 rounded-lg ${selected === q.correct ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="font-bold text-lg mb-2">
              {selected === q.correct 
                ? (lang === 'en' ? '✅ Correct!' : '✅ Правильно!') 
                : (lang === 'en' ? '❌ Incorrect' : '❌ Неправильно')}
            </div>
            <p className="mb-2"><strong>EN:</strong> {q.explanation.en}</p>
            <p className="mb-2"><strong>RU:</strong> {q.explanation.ru}</p>
            {q.formula && (
              <div className="formula-box mt-4">
                {q.formula}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-6">
          {showAnswer && (
            <button onClick={nextQuestion} className="btn-primary flex-1">
              {lang === 'en' ? 'Next Question →' : 'Следующий вопрос →'}
            </button>
          )}
          <button onClick={resetQuiz} className="btn-secondary">
            {lang === 'en' ? '🔄 Reset' : '🔄 Сброс'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Formulas({ lang }) {
  const grouped = formulas.reduce((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          {lang === 'en' ? '📐 Formula Reference' : '📐 Справочник формул'}
        </h2>
        <p className="text-gray-600 mb-6">
          {lang === 'en' 
            ? 'All key formulas for CAMELS analysis in one place.'
            : 'Все ключевые формулы для CAMELS анализа в одном месте.'}
        </p>

        {Object.entries(grouped).map(([category, formList]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-bold text-purple-700 mb-3 border-b pb-2">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formList.map((f, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-bold text-blue-800">{f.name}</div>
                  <div className="font-mono text-lg bg-blue-50 p-2 rounded my-2 text-center">
                    {f.formula}
                  </div>
                  <div className="text-sm text-gray-600">
                    Benchmark: <span className="font-bold text-green-700">{f.benchmark}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Theory({ lang }) {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          {lang === 'en' ? '📚 CAMELS Theory' : '📚 Теория CAMELS'}
        </h2>

        {/* C */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-2">C — Capital Adequacy</h3>
          <p className="mb-2"><strong>EN:</strong> Evaluates whether the bank has enough capital to absorb losses and protect depositors.</p>
          <p className="mb-2"><strong>RU:</strong> Оценивает, достаточно ли у банка капитала для покрытия убытков и защиты вкладчиков.</p>
          <div className="formula-box">CAR = (Tier 1 + Tier 2) / RWA ≥ 10.5%</div>
          <p className="text-sm text-gray-600">Key ratios: CAR, CET1 Ratio, Leverage Ratio</p>
        </div>

        {/* A */}
        <div className="mb-6 p-4 bg-orange-50 rounded-lg">
          <h3 className="text-xl font-bold text-orange-800 mb-2">A — Asset Quality</h3>
          <p className="mb-2"><strong>EN:</strong> Assesses the quality of bank's loan portfolio and adequacy of provisions.</p>
          <p className="mb-2"><strong>RU:</strong> Оценивает качество кредитного портфеля и достаточность резервов.</p>
          <div className="formula-box">NPL Ratio = NPL / Total Loans &lt; 3%</div>
          <div className="formula-box">Provision Coverage = Reserves / NPL ≥ 100%</div>
          <p className="text-sm text-gray-600">High NPL = poor credit decisions. Low coverage = under-reserved.</p>
        </div>

        {/* M */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="text-xl font-bold text-purple-800 mb-2">M — Management Quality</h3>
          <p className="mb-2"><strong>EN:</strong> Evaluates competence of management, strategy, governance, and internal controls.</p>
          <p className="mb-2"><strong>RU:</strong> Оценивает компетентность руководства, стратегию, корпоративное управление.</p>
          <div className="formula-box">Cost-to-Income = Operating Expenses / Operating Income</div>
          <p className="text-sm text-gray-600">Also assessed through: compliance record, risk management practices, audit findings.</p>
        </div>

        {/* E */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-2">E — Earnings</h3>
          <p className="mb-2"><strong>EN:</strong> Measures bank's ability to generate sustainable profits.</p>
          <p className="mb-2"><strong>RU:</strong> Измеряет способность банка генерировать устойчивую прибыль.</p>
          <div className="formula-box">ROE = Net Income / Equity &gt; 10%</div>
          <div className="formula-box">ROA = Net Income / Assets &gt; 1%</div>
          <div className="formula-box">NIM = (Int Inc - Int Exp) / Assets ≈ 3-4%</div>
          <p className="text-sm text-gray-600">Note: ROE = ROA × Leverage (ROE always &gt; ROA)</p>
        </div>

        {/* L */}
        <div className="mb-6 p-4 bg-cyan-50 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-800 mb-2">L — Liquidity</h3>
          <p className="mb-2"><strong>EN:</strong> Assesses ability to meet short-term obligations without significant losses.</p>
          <p className="mb-2"><strong>RU:</strong> Оценивает способность выполнять краткосрочные обязательства без существенных потерь.</p>
          <div className="formula-box">LCR = HQLA / Net Outflows (30d) ≥ 100%</div>
          <div className="formula-box">NSFR = Stable Funding / Required Funding ≥ 100%</div>
          <p className="text-sm text-gray-600">LCR = 30-day stress survival. NSFR = 1-year structural liquidity.</p>
        </div>

        {/* S */}
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="text-xl font-bold text-red-800 mb-2">S — Sensitivity to Market Risk</h3>
          <p className="mb-2"><strong>EN:</strong> Evaluates exposure to changes in interest rates, FX rates, and asset prices.</p>
          <p className="mb-2"><strong>RU:</strong> Оценивает подверженность изменениям процентных ставок, валютных курсов, цен активов.</p>
          <div className="formula-box">GAP = RSA - RSL</div>
          <div className="formula-box">ΔNIM = GAP × Δr</div>
          <div className="bg-yellow-100 p-3 rounded mt-4">
            <strong>KEY INSIGHT:</strong><br/>
            • GAP &gt; 0 → Asset-Sensitive → gains when rates rise<br/>
            • GAP &lt; 0 → Liability-Sensitive → loses when rates rise<br/>
            <br/>
            <strong>КЛЮЧЕВОЕ:</strong><br/>
            • GAP &gt; 0 → выигрывает при росте ставок<br/>
            • GAP &lt; 0 → проигрывает при росте ставок
          </div>
        </div>

        {/* Rating Scale */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-4">CAMELS Rating Scale / Шкала рейтингов</h3>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="bg-green-500 text-white p-3 rounded">
              <div className="text-2xl font-bold">1</div>
              <div className="text-sm">Strong</div>
            </div>
            <div className="bg-green-300 p-3 rounded">
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm">Satisfactory</div>
            </div>
            <div className="bg-yellow-300 p-3 rounded">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm">Fair</div>
            </div>
            <div className="bg-orange-400 text-white p-3 rounded">
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm">Marginal</div>
            </div>
            <div className="bg-red-500 text-white p-3 rounded">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm">Unsatisfactory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function Home() {
  const [lang, setLang] = useState('ru');
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header lang={lang} setLang={setLang} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />
      
      <main className="max-w-6xl mx-auto p-4">
        {activeTab === 'calculator' && <Calculator lang={lang} />}
        {activeTab === 'quiz' && <Quiz lang={lang} />}
        {activeTab === 'formulas' && <Formulas lang={lang} />}
        {activeTab === 'theory' && <Theory lang={lang} />}
      </main>

      <footer className="text-center p-6 text-gray-500 mt-8">
        <p>CAMELS Trainer | Financial Institutions Exam Prep</p>
        <p className="text-sm">Created for exam preparation 🎓</p>
      </footer>
    </div>
  );
}
