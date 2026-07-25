window.TOPIC_META = {
  "id": "sampling-estimation",
  "title_zh": "抽样与估计",
  "title_en": "Estimation and Inference",
  "essence_zh": "本质是回答两个问题:①怎么从总体里抽出一个「靠谱」的样本(不同抽样方法各有适用场景和局限);②只用一个样本,怎么估计整个总体的特征、并说清楚这个估计有多「准」(靠中心极限定理,把样本均值的分布规律推导出来,进而构造置信区间)。",
  "exam_pattern_zh": "常考:①辨认五种抽样方法(简单随机、分层随机、整群、便利、判断抽样)分别对应哪种描述——判断依据通常是「是否每个个体被抽中概率相等」「是否按比例分层」这类细节;②中心极限定理的结论辨析(样本量足够大时,样本均值近似服从正态分布,且是总体均值的一致估计量);③置信区间的组成部分(点估计 ± 可靠性因子 × 标准误)——注意「抽样误差 sampling error」本身不是置信区间公式里的一项,它是「点估计和真实值之间的差」,这是个常见送分坑。",
  "vocabulary": [
    { "term_en": "simple random sampling", "meaning_zh": "简单随机抽样:总体中每个个体被抽中的概率完全相等" },
    { "term_en": "stratified random sampling", "meaning_zh": "分层随机抽样:先按某种标准把总体分成若干层,再按各层占总体的比例分别随机抽样" },
    { "term_en": "cluster sampling", "meaning_zh": "整群抽样:把总体分成若干「群」(每个群本身就是总体的缩影),再随机抽取整个群" },
    { "term_en": "convenience / judgmental sampling", "meaning_zh": "便利/判断抽样:非概率抽样,依据抽样者的方便程度或主观判断选样本,代表性差" },
    { "term_en": "sampling error", "meaning_zh": "抽样误差:某个统计量的观测值和它想要估计的真实总体参数之间的差" },
    { "term_en": "central limit theorem (CLT)", "meaning_zh": "中心极限定理:当样本量足够大时,不论总体分布形状如何,样本均值的抽样分布都近似服从正态分布" },
    { "term_en": "standard error of the sample mean", "meaning_zh": "样本均值的标准误 = 总体标准差 / √样本量,衡量样本均值本身的波动" }
  ],
  "mnemonics": [
    { "title_zh": "五种抽样一句话区分", "content_zh": "简单随机=完全随机等概率;分层随机=先分组再按比例随机;整群=随机抽整个「群」;便利=图省事;判断=凭主观经验挑——只有前两种能保证严格的「每个体等概率被抽中」。" },
    { "title_zh": "置信区间公式", "content_zh": "点估计 ± 可靠性因子 × 标准误,记住这三项,抽样误差(sampling error)不在公式里,它只是「点估计与真值之差」这个概念,别混进去。" }
  ],
  "concepts": [
    {
      "term_en": "Confidence Interval",
      "explain_zh": "用点估计加减一个基于可靠性因子和标准误算出的区间,来表达对总体参数估计的不确定性范围。",
      "formula": "CI = \\text{Point Estimate} \\pm (\\text{Reliability Factor} \\times \\text{Standard Error})"
    },
    {
      "term_en": "Standard Error of the Sample Mean",
      "explain_zh": "样本均值这个统计量本身的标准差,随样本量增大而减小。",
      "formula": "\\sigma_{\\bar{X}} = \\frac{\\sigma}{\\sqrt{n}}"
    }
  ],
  "flashcards": [
    { "front_en": "Simple random sampling", "back_zh": "每个个体被抽中的概率完全相等" },
    { "front_en": "Stratified random sampling", "back_zh": "先分层,再按各层占总体比例分别随机抽样" },
    { "front_en": "Cluster sampling", "back_zh": "把总体分成若干「迷你总体」式的群,随机抽整个群" },
    { "front_en": "Central Limit Theorem", "back_zh": "样本量足够大时,样本均值近似服从正态分布,是总体均值的一致估计量" },
    { "front_en": "Confidence Interval formula", "back_zh": "点估计 ± 可靠性因子 × 标准误(抽样误差不在公式里)" }
  ]
};
