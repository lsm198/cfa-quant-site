window.TOPIC_META = {
  "id": "portfolio-math",
  "title_zh": "组合数学",
  "title_en": "Portfolio Mathematics",
  "essence_zh": "本质是把「单个资产的统计量」扩展到「一篮子资产组成的组合」(portfolio)——组合的期望收益(expected return)是各资产期望收益的加权平均(weighted average),但组合的风险(方差 variance / 标准差 standard deviation)不是简单加权平均,而要把资产两两之间的协方差(covariance)也算进去,这正是「分散化」(diversification)能降低风险的数学原因。这一节还包括 Roy's safety-first 准则,用来在多个组合之间选出「跌破某个最低收益门槛概率最小」(shortfall risk 最小)的那个。",
  "exam_pattern_zh": "常考:①两资产组合方差/标准差计算,给权重(weight)、各自标准差、相关系数(或协方差),套公式;②不相关(uncorrelated)/完全相关等特殊情况下的组合标准差简化计算;③Roy's safety-first 准则:给几个组合的期望收益和标准差,算每个的 SFRatio=(E(Rp)−RL)/σp,选最大的那个作为最优组合(optimal portfolio),常见坑是「最低可接受收益 RL」要正确换算(比如从取款金额换算成收益率)。",
  "vocabulary": [
    { "term_en": "portfolio expected return", "meaning_zh": "组合期望收益率:各资产期望收益率按权重加权平均", "example_en": "A portfolio's expected return is the weighted average of the expected returns of the individual assets it holds." },
    { "term_en": "portfolio variance / standard deviation", "meaning_zh": "组合方差/标准差:不是各资产方差的简单加权平均,必须计入两两之间的协方差项", "example_en": "Unlike expected return, portfolio variance is not a simple weighted average of the individual assets' variances — it also depends on how the assets move together." },
    { "term_en": "shortfall risk", "meaning_zh": "跌破风险:组合收益跌破某个最低可接受水平的概率", "example_en": "Safety-first rules focus on shortfall risk, the risk that portfolio value will fall below some minimum acceptable level over a given time horizon." },
    { "term_en": "Roy's safety-first criterion", "meaning_zh": "罗伊安全首要准则:在若干组合中选择「跌破最低门槛收益概率最小」的那一个,等价于选 SFRatio 最大的组合", "example_en": "Roy's safety-first criterion identifies the portfolio that minimizes the probability of falling short of a minimum acceptable return." },
    { "term_en": "safety-first ratio (SFRatio)", "meaning_zh": "= (组合期望收益 − 最低可接受收益) / 组合标准差,用来比较不同组合的「安全边际」", "example_en": "The safety-first ratio equals the expected portfolio return minus the minimum acceptable return, divided by the portfolio's standard deviation." }
  ],
  "mnemonics": [
    { "title_zh": "两资产组合方差公式", "content_zh": "σp² = w1²σ1² + w2²σ2² + 2w1w2Cov(R1,R2);记住「平方项各自算,交叉项要乘 2」。如果两资产不相关,Cov=0,交叉项直接消失。" },
    { "title_zh": "SFRatio 选最大", "content_zh": "SFRatio 越大 = 跌破门槛的概率越小 = 越安全,所以选组合时永远挑 SFRatio 最大的那个,而不是标准差最小的那个。" }
  ],
  "concepts": [
    {
      "term_en": "Two-Asset Portfolio Variance",
      "explain_zh": "由两个资产各自的方差项加上一个协方差(covariance)交叉项组成,交叉项前有系数 2。",
      "formula": "\\sigma_p^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2Cov(R_1,R_2)"
    },
    {
      "term_en": "Roy's Safety-First Ratio",
      "explain_zh": "衡量组合期望收益超过最低可接受收益的幅度相对于波动的比值,数值越大代表跌破门槛的概率越小,是选择最优组合的依据。",
      "formula": "SFRatio = \\frac{E(R_p) - R_L}{\\sigma_p}"
    },
    {
      "term_en": "Covariance (Joint Probability Function)",
      "explain_zh": "两个随机变量协方差的定义式:把每一种联合结果发生的概率,乘以两个变量各自偏离期望值的乘积,再求和。是计算两资产组合方差中交叉项的基础。",
      "formula": "Cov(R_i,R_j) = \\sum P(R_i,R_j)\\left[R_i - E(R_i)\\right]\\left[R_j - E(R_j)\\right]"
    },
    {
      "term_en": "Correlation Coefficient",
      "explain_zh": "把协方差除以两个变量各自的标准差之积,得到一个介于 -1 与 1 之间的标准化指标,用来衡量两资产收益共同变动的方向和强度。协方差不变时,任一变量标准差增大都会使相关系数减小。",
      "formula": "\\rho(R_i,R_j) = \\frac{Cov(R_i,R_j)}{\\sigma(R_i)\\sigma(R_j)}"
    }
  ],
  "analogies_zh": [
    { "title_zh": "拼车分摊风险", "content_zh": "一个人开车,风险自己全扛;两人拼车,如果两人「倒霉的原因」互不相关(协方差低甚至为负),总风险不是两人风险简单相加,而是会被部分抵消——这就是协方差为什么能通过分散化降低组合风险的直觉。" }
  ],
  "connections": [
    { "topic_id": "stats-returns", "note_zh": "组合方差公式里每个资产自身的方差/标准差,就来自这里学的离散度量。" },
    { "topic_id": "probability-trees", "note_zh": "组合方差公式里的协方差交叉项,是那一节定义和计算的直接应用。" }
  ],
  "flashcards": [
    { "front_en": "Two-Asset Portfolio Variance", "back_zh": "σp² = w1²σ1² + w2²σ2² + 2w1w2Cov(R1,R2)" },
    { "front_en": "Safety-First Ratio (SFRatio)", "back_zh": "(E(Rp) − RL) / σp,选数值最大的组合" },
    { "front_en": "Zero-correlation portfolio variance", "back_zh": "相关系数为0时,协方差项=0,σp² = w1²σ1² + w2²σ2²" },
    { "front_en": "Roy's safety-first criterion", "back_zh": "只关注下行风险(downside risk),不假设正态分布、不使用semideviation,聚焦跌破最低门槛收益的概率(shortfall risk)" },
    { "front_en": "Correlation & variance relationship", "back_zh": "协方差不变时,任一变量方差(标准差)增大 ⟹ 相关系数减小" },
    { "front_en": "Covariance via joint probability", "back_zh": "Cov(Ri,Rj)=ΣP(Ri,Rj)[Ri−E(Ri)][Rj−E(Rj)],对每种联合结果按概率加权求和" }
  ]
};
