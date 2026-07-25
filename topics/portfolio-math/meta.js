window.TOPIC_META = {
  "id": "portfolio-math",
  "title_zh": "组合数学",
  "title_en": "Portfolio Mathematics",
  "essence_zh": "本质是把「单个资产的统计量」扩展到「一篮子资产组成的组合」——组合的期望收益是各资产期望收益的加权平均,但组合的风险(方差/标准差)不是简单加权平均,而要把资产两两之间的协方差也算进去,这正是「分散化」能降低风险的数学原因。这一节还包括 Roy's safety-first 准则,用来在多个组合之间选出「跌破某个最低收益门槛概率最小」的那个。",
  "exam_pattern_zh": "常考:①两资产组合方差/标准差计算,给权重、各自标准差、相关系数(或协方差),套公式;②不相关/完全相关等特殊情况下的组合标准差简化计算;③Roy's safety-first 准则:给几个组合的期望收益和标准差,算每个的 SFRatio=(E(Rp)−RL)/σp,选最大的那个作为最优组合,常见坑是「最低可接受收益 RL」要正确换算(比如从取款金额换算成收益率)。",
  "vocabulary": [
    { "term_en": "portfolio expected return", "meaning_zh": "组合期望收益率:各资产期望收益率按权重加权平均" },
    { "term_en": "portfolio variance / standard deviation", "meaning_zh": "组合方差/标准差:不是各资产方差的简单加权平均,必须计入两两之间的协方差项" },
    { "term_en": "shortfall risk", "meaning_zh": "跌破风险:组合收益跌破某个最低可接受水平的概率" },
    { "term_en": "Roy's safety-first criterion", "meaning_zh": "罗伊安全首要准则:在若干组合中选择「跌破最低门槛收益概率最小」的那一个,等价于选 SFRatio 最大的组合" },
    { "term_en": "safety-first ratio (SFRatio)", "meaning_zh": "= (组合期望收益 − 最低可接受收益) / 组合标准差,用来比较不同组合的「安全边际」" }
  ],
  "mnemonics": [
    { "title_zh": "两资产组合方差公式", "content_zh": "σp² = w1²σ1² + w2²σ2² + 2w1w2Cov(R1,R2);记住「平方项各自算,交叉项要乘 2」。如果两资产不相关,Cov=0,交叉项直接消失。" },
    { "title_zh": "SFRatio 选最大", "content_zh": "SFRatio 越大 = 跌破门槛的概率越小 = 越安全,所以选组合时永远挑 SFRatio 最大的那个,而不是标准差最小的那个。" }
  ],
  "concepts": [
    {
      "term_en": "Two-Asset Portfolio Variance",
      "explain_zh": "由两个资产各自的方差项加上一个协方差交叉项组成,交叉项前有系数 2。",
      "formula": "\\sigma_p^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2Cov(R_1,R_2)"
    },
    {
      "term_en": "Roy's Safety-First Ratio",
      "explain_zh": "衡量组合期望收益超过最低可接受收益的幅度相对于波动的比值,数值越大代表跌破门槛的概率越小,是选择最优组合的依据。",
      "formula": "SFRatio = \\frac{E(R_p) - R_L}{\\sigma_p}"
    }
  ],
  "flashcards": [
    { "front_en": "Two-Asset Portfolio Variance", "back_zh": "σp² = w1²σ1² + w2²σ2² + 2w1w2Cov(R1,R2)" },
    { "front_en": "Safety-First Ratio (SFRatio)", "back_zh": "(E(Rp) − RL) / σp,选数值最大的组合" },
    { "front_en": "Zero-correlation portfolio variance", "back_zh": "相关系数为0时,协方差项=0,σp² = w1²σ1² + w2²σ2²" }
  ]
};
