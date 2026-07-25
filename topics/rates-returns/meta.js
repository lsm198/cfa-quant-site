window.TOPIC_META = {
  "id": "rates-returns",
  "title_zh": "收益率衡量",
  "title_en": "Rates and Returns",
  "essence_zh": "本质是「用统一的语言衡量赚了多少」(measuring return)——同一笔投资,用不同的收益率定义(持有期收益率 Holding Period Return、年化收益率 Annualized Return、资金加权收益率 Money-Weighted Rate of Return / 时间加权收益率 Time-Weighted Rate of Return、名义利率 Nominal Rate / 实际利率 Real Rate)算出来的数字可能完全不同,这一节就是教你在什么场景下该用哪种定义,以及它们之间怎么换算。",
  "exam_pattern_zh": "常考三类题:①算持有期收益率 HPR = (卖出价−买入价+股息)/买入价,以及反过来已知 HPR 反解买入价或卖出价;②不同周期的收益率互相换算(年化 annualize、连续复利 continuous compounding),坑点是分不清「周期数 c」该用几(比如16个月对应 c=12/16 年);③区分资金加权收益率(money-weighted,本质是内部收益率 IRR,受资金进出时点影响大)和时间加权收益率(time-weighted,几何平均每期收益率 geometric mean,不受资金进出影响)——一旦题目里出现「投资经理该用哪个指标」「客户自己控制资金进出」这类措辞,几乎总是考这两者的适用场景区别。",
  "vocabulary": [
    { "term_en": "Holding Period Return (HPR)", "meaning_zh": "持有期收益率:某笔投资从买入到卖出这一段持有期内赚的总回报率", "example_en": "Holding period return captures both the price change and any income received, such as dividends, over a single period of ownership." },
    { "term_en": "money-weighted rate of return (MWRR)", "meaning_zh": "资金加权收益率:本质就是内部收益率 IRR,反映投资者自己实际赚了多少,受资金进出时点影响", "example_en": "The money-weighted rate of return is calculated the same way as an internal rate of return (IRR), using all of the investor's actual cash flows." },
    { "term_en": "time-weighted rate of return (TWRR)", "meaning_zh": "时间加权收益率:把整个持有期拆成多段,对每段的 HPR 取几何平均,不受资金进出时点影响,是评价基金经理业绩的标准指标", "example_en": "The time-weighted rate of return breaks the measurement period into sub-periods and geometrically links each sub-period's holding period return." },
    { "term_en": "opportunity cost", "meaning_zh": "机会成本:选择当前这个投资而放弃的、原本能从次优选项中获得的收益", "example_en": "An opportunity cost arises whenever choosing one investment means giving up the return available from the next-best alternative." },
    { "term_en": "nominal risk-free rate", "meaning_zh": "名义无风险利率 = 实际无风险利率 + 通胀溢价", "example_en": "The nominal risk-free rate equals the real risk-free rate plus the inflation premium." },
    { "term_en": "continuously compounded return", "meaning_zh": "连续复利收益率:复利频率趋于无穷时的收益率,常用 ln(1+HPR) 计算", "example_en": "A continuously compounded return can be found by taking the natural logarithm of one plus the holding period return." }
  ],
  "mnemonics": [
    { "title_zh": "两个「加权」怎么分", "content_zh": "资金加权(money-weighted)= 钱说了算,谁存取钱的时点影响大就用它,本质是 IRR;时间加权(time-weighted)= 时间说了算,把每一段时间的收益率几何平均,和资金进出无关,专门用来给基金经理「打分」,排除客户自己进出资金的干扰。" },
    { "title_zh": "年化收益率公式", "content_zh": "(1+区间总收益率)^(1/区间年数) − 1,区间年数 = 该区间的月数/12 或天数/365,记住「指数是1除以年数」,不是乘。" }
  ],
  "concepts": [
    {
      "term_en": "Holding Period Return",
      "explain_zh": "某笔投资在单一持有期内赚取的回报率,同时包含资本利得(capital gain)和期间收到的现金流(如股息 dividend、利息 interest)。",
      "formula": "R = \\frac{P_1 - P_0 + D_1}{P_0}"
    },
    {
      "term_en": "Annualized Return",
      "explain_zh": "把任意长度区间的总回报率换算成「一年」口径(annualize),方便跨期限比较。c 是一年里包含几个该区间(比如区间是16个月,则 c = 12/16)。",
      "formula": "R_{annual} = (1 + R_{period})^{c} - 1"
    },
    {
      "term_en": "Money-Weighted Rate of Return",
      "explain_zh": "让全部现金流(买入付出的钱记为流出 outflow,卖出/分红收到的钱记为流入 inflow)现值之和为零的折现率,本质就是内部收益率(Internal Rate of Return, IRR)。",
      "formula": "\\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t} = 0"
    },
    {
      "term_en": "Time-Weighted Rate of Return",
      "explain_zh": "把整个区间按每次现金流进出的时点切成几段,分别算每段的 HPR,再对所有段的 (1+HPR) 取几何平均(geometric mean)后减 1。",
      "formula": "TWRR = \\left[ \\prod_{i=1}^{n} (1 + HPR_i) \\right]^{1/n} - 1"
    }
  ],
  "analogies_zh": [
    { "title_zh": "MWRR vs TWRR:司机与乘客", "content_zh": "把基金经理想象成「司机」,客户是「乘客」——司机只能决定怎么开车(怎么选资产),决定不了乘客什么时候上下车(资金什么时候进出)。评价司机开车技术该用时间加权收益率(排除乘客上下车的干扰);而乘客自己实际的旅程体验(到底赚了多少钱),取决于他自己上下车的时机,这就是资金加权收益率。" }
  ],
  "connections": [
    { "topic_id": "stats-returns", "note_zh": "算出一串真实的 HPR 之后,需要用「资产收益的统计度量」里的均值、标准差、偏度等工具去描述这批收益率数据的整体特征。" },
    { "topic_id": "tvm", "note_zh": "货币时间价值应用会把这里「现值/折现率」的单期逻辑,推广到多期、不规则现金流的复杂场景。" }
  ],
  "flashcards": [
    { "front_en": "Holding Period Return (HPR)", "back_zh": "R = (P1 − P0 + D) / P0" },
    { "front_en": "Money-weighted vs Time-weighted", "back_zh": "资金加权 = IRR,受资金进出影响;时间加权 = 几何平均 HPR,不受资金进出影响,评价基金经理用这个" },
    { "front_en": "Nominal risk-free rate", "back_zh": "实际无风险利率 + 通胀溢价" },
    { "front_en": "Annualizing a return", "back_zh": "(1+区间收益率)^(1/区间年数) − 1" }
  ]
};
