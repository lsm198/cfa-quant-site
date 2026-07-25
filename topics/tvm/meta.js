window.TOPIC_META = {
  "id": "tvm",
  "title_zh": "货币时间价值应用",
  "title_en": "Time Value of Money in Finance",
  "essence_zh": "本质是「现金流可加性」(cash flow additivity principle):只要现金流落在同一个时点,就可以直接相加,或分别折现(discount)后再相加。计算器只认标准的「普通年金」(ordinary annuity:现金流从第1期开始、每期等额),遇到不规则的现金流(递延年金 deferred annuity、期初年金 annuity due 等)都要先拆成几段标准形式分步求解,再挪到同一时点合并。",
  "exam_pattern_zh": "L1 数量方法这一节几乎只考一种题型:给一组不规则的现金流(最常见是「递延年金」deferred annuity——第一笔现金流不在 t=1,或「期初年金」annuity due——现金流从 t=0 就开始),要求算出 t=0 时刻的现值(present value, PV)。正确解法通常要拆成 2 步:先把它当成从某个中间时点开始的普通年金,算出那个时点的现值,再把这个值当作一笔单一的未来现金流折现回 t=0。最常见的两个坑:①套公式时误把「递延/期初」现金流当成从 t=1 开始的标准普通年金,时点算错了一期;②计算器的 BGN(期初 beginning)/END(期末 ending)模式设错,导致结果整体偏差一期复利(compounding)。",
  "vocabulary": [
    { "term_en": "ordinary annuity", "meaning_zh": "普通年金:现金流从第1期期末(t=1)开始,每期等额", "example_en": "An ordinary annuity's first payment occurs one period from today, at t = 1." },
    { "term_en": "annuity due", "meaning_zh": "期初年金:现金流从第0期(今天,t=0)就开始,比普通年金整体提前一期", "example_en": "The 10 annual payments form an annuity due since the payments start today." },
    { "term_en": "deferred annuity", "meaning_zh": "递延年金:第一笔现金流既不在 t=0 也不在 t=1,而是更晚的某个时点才开始", "example_en": "An investment pays $1,000 annually for five years, with the first payment occurring three years from today." },
    { "term_en": "cash flow additivity principle", "meaning_zh": "现金流可加性原则:同一时点上的现金流可以直接相加,是拆解不规则现金流问题的理论基础", "example_en": "Cash flows occurring at the same point in time can be added together directly, which is the basis for solving irregular cash flow problems." },
    { "term_en": "BGN mode / END mode", "meaning_zh": "计算器的期初/期末模式设置,决定年金现金流被当作在每期开始还是结束发生", "example_en": "Setting a financial calculator to BGN mode treats each annuity payment as occurring at the beginning of the period." },
    { "term_en": "implied return / implied growth rate", "meaning_zh": "隐含收益率/隐含增长率:已知现值和未来现金流,反解出使等式成立的折现率或增长率", "example_en": "Given the present value and future cash flows of an investment, the implied return is the discount rate that makes the two sides of the equation equal." }
  ],
  "mnemonics": [
    { "title_zh": "递延年金两步走", "content_zh": "第一步「就近」求年金现值:把年金当成从某个中间时点 t 开始的普通年金,先算出 t 时刻的现值;第二步「打包」折现:把这个中间时点的现值当作一笔单一的未来现金流,用 PV = FV/(1+r)^n 折回今天。" },
    { "title_zh": "N 怎么数", "content_zh": "普通年金的现值点,永远在「第一笔现金流前一期」。比如第一笔现金流在 t=3,年金现值点就在 t=2,再从 t=2 折回 t=0 才是最终答案。" }
  ],
  "concepts": [
    {
      "term_en": "Present Value of an Ordinary Annuity",
      "explain_zh": "一组从 t=1 开始、每期等额 A 的现金流(cash flow),在 t=0 时刻的现值。",
      "formula": "PV = A \\left[ \\frac{1 - (1+r)^{-n}}{r} \\right]"
    },
    {
      "term_en": "Present Value of a Single Lump Sum",
      "explain_zh": "把未来某一时点的单笔现金流(lump sum)折算到今天的现值,是处理多段现金流问题时把中间结果挪回 t=0 的最后一步。",
      "formula": "PV_0 = \\frac{FV_n}{(1+r)^n}"
    },
    {
      "term_en": "Annuity Due Adjustment",
      "explain_zh": "期初年金现值 = 普通年金现值 × (1+r);因为期初年金的每笔现金流都比对应的普通年金提前一期发生,所以整体多享受一期复利(compounding)。",
      "formula": "PV_{due} = PV_{ordinary} \\times (1+r)"
    }
  ],
  "analogies_zh": [
    { "title_zh": "不规则现金流就像搬家", "content_zh": "不规则的现金流就像散落在不同房间的家具,没法直接搬到一起相加;必须先把每一件都「搬到同一个房间」(折现到同一时点),才能合并计算——这正是现金流可加性原则的直觉。" }
  ],
  "connections": [
    { "topic_id": "rates-returns", "note_zh": "延续「收益率衡量」里现值/折现率的单期逻辑,把它推广到多期、不规则的现金流结构。" }
  ],
  "flashcards": [
    { "front_en": "Present Value of an Ordinary Annuity", "back_zh": "PV = A × [1 − (1+r)^(−n)] / r,现金流从 t=1 开始" },
    { "front_en": "Annuity Due Adjustment", "back_zh": "期初年金现值 = 普通年金现值 × (1+r)" },
    { "front_en": "Deferred Annuity — Two-Step Method", "back_zh": "先求年金在其「前一期」的现值,再把这个值当单笔现金流折回 t=0" },
    { "front_en": "Present Value of a Lump Sum", "back_zh": "PV = FV / (1+r)^n" }
  ]
};
