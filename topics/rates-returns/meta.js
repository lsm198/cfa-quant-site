window.TOPIC_META = {
  "id": "rates-returns",
  "title_zh": "收益率衡量",
  "title_en": "Rates and Returns",
  "essence_zh": "本质是「用统一的语言衡量赚了多少」——同一笔投资,用不同的收益率定义(持有期收益率、年化收益率、资金加权/时间加权收益率、名义/实际利率)算出来的数字可能完全不同,这一节就是教你在什么场景下该用哪种定义,以及它们之间怎么换算。",
  "exam_pattern_zh": "常考三类题:①算持有期收益率 HPR = (卖出价−买入价+股息)/买入价,以及反过来已知 HPR 反解买入价或卖出价;②不同周期的收益率互相换算(年化、连续复利),坑点是分不清「周期数 c」该用几(比如16个月对应 c=12/16 年);③区分资金加权收益率(money-weighted,本质是 IRR,受资金进出时点影响大)和时间加权收益率(time-weighted,几何平均每期收益率,不受资金进出影响)——一旦题目里出现「投资经理该用哪个指标」「客户自己控制资金进出」这类措辞,几乎总是考这两者的适用场景区别。",
  "vocabulary": [
    { "term_en": "Holding Period Return (HPR)", "meaning_zh": "持有期收益率:某笔投资从买入到卖出这一段持有期内赚的总回报率" },
    { "term_en": "money-weighted rate of return (MWRR)", "meaning_zh": "资金加权收益率:本质就是内部收益率 IRR,反映投资者自己实际赚了多少,受资金进出时点影响" },
    { "term_en": "time-weighted rate of return (TWRR)", "meaning_zh": "时间加权收益率:把整个持有期拆成多段,对每段的 HPR 取几何平均,不受资金进出时点影响,是评价基金经理业绩的标准指标" },
    { "term_en": "opportunity cost", "meaning_zh": "机会成本:选择当前这个投资而放弃的、原本能从次优选项中获得的收益" },
    { "term_en": "nominal risk-free rate", "meaning_zh": "名义无风险利率 = 实际无风险利率 + 通胀溢价" },
    { "term_en": "continuously compounded return", "meaning_zh": "连续复利收益率:复利频率趋于无穷时的收益率,常用 ln(1+HPR) 计算" }
  ],
  "mnemonics": [
    { "title_zh": "两个「加权」怎么分", "content_zh": "资金加权(money-weighted)= 钱说了算,谁存取钱的时点影响大就用它,本质是 IRR;时间加权(time-weighted)= 时间说了算,把每一段时间的收益率几何平均,和资金进出无关,专门用来给基金经理「打分」,排除客户自己进出资金的干扰。" },
    { "title_zh": "年化收益率公式", "content_zh": "(1+区间总收益率)^(1/区间年数) − 1,区间年数 = 该区间的月数/12 或天数/365,记住「指数是1除以年数」,不是乘。" }
  ],
  "concepts": [
    {
      "term_en": "Holding Period Return",
      "explain_zh": "某笔投资在单一持有期内赚取的回报率,同时包含资本利得和期间收到的现金流(如股息、利息)。",
      "formula": "R = \\frac{P_1 - P_0 + D_1}{P_0}"
    },
    {
      "term_en": "Annualized Return",
      "explain_zh": "把任意长度区间的总回报率换算成「一年」口径,方便跨期限比较。c 是一年里包含几个该区间(比如区间是16个月,则 c = 12/16)。",
      "formula": "R_{annual} = (1 + R_{period})^{c} - 1"
    },
    {
      "term_en": "Money-Weighted Rate of Return",
      "explain_zh": "让全部现金流(买入付出的钱记为流出,卖出/分红收到的钱记为流入)现值之和为零的折现率,本质就是内部收益率(IRR)。",
      "formula": "\\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t} = 0"
    },
    {
      "term_en": "Time-Weighted Rate of Return",
      "explain_zh": "把整个区间按每次现金流进出的时点切成几段,分别算每段的 HPR,再对所有段的 (1+HPR) 取几何平均后减 1。",
      "formula": "TWRR = \\left[ \\prod_{i=1}^{n} (1 + HPR_i) \\right]^{1/n} - 1"
    }
  ],
  "flashcards": [
    { "front_en": "Holding Period Return (HPR)", "back_zh": "R = (P1 − P0 + D) / P0" },
    { "front_en": "Money-weighted vs Time-weighted", "back_zh": "资金加权 = IRR,受资金进出影响;时间加权 = 几何平均 HPR,不受资金进出影响,评价基金经理用这个" },
    { "front_en": "Nominal risk-free rate", "back_zh": "实际无风险利率 + 通胀溢价" },
    { "front_en": "Annualizing a return", "back_zh": "(1+区间收益率)^(1/区间年数) − 1" }
  ]
};
