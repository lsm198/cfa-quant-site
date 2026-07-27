window.TOPIC_META = {
  "id": "sampling-estimation",
  "title_zh": "抽样与估计",
  "title_en": "Estimation and Inference",
  "essence_zh": "本质是回答两个问题:①怎么从总体(population)里抽出一个「靠谱」的样本(sample)(不同抽样方法各有适用场景和局限);②只用一个样本,怎么估计整个总体的特征、并说清楚这个估计有多「准」(靠中心极限定理 Central Limit Theorem,把样本均值的分布规律推导出来,进而构造置信区间 confidence interval)。",
  "exam_pattern_zh": "常考:①辨认五种抽样方法(简单随机 simple random、分层随机 stratified random、整群 cluster、便利 convenience、判断抽样 judgmental)分别对应哪种描述——判断依据通常是「是否每个个体被抽中概率相等」「是否按比例分层」这类细节;②中心极限定理的结论辨析(样本量足够大时,样本均值近似服从正态分布 normal distribution,且是总体均值的一致估计量 consistent estimator);③置信区间的组成部分(点估计 point estimate ± 可靠性因子 reliability factor × 标准误 standard error)——注意「抽样误差 sampling error」本身不是置信区间公式里的一项,它是「点估计和真实值之间的差」,这是个常见送分坑。",
  "vocabulary": [
    { "term_en": "simple random sampling", "meaning_zh": "简单随机抽样:总体中每个个体被抽中的概率完全相等", "example_en": "Simple random sampling gives every member of the population an equal probability of being selected." },
    { "term_en": "stratified random sampling", "meaning_zh": "分层随机抽样:先按某种标准把总体分成若干层,再按各层占总体的比例分别随机抽样", "example_en": "Stratified random sampling first divides the population into subgroups, or strata, and then draws a random sample from each stratum in proportion to its size." },
    { "term_en": "cluster sampling", "meaning_zh": "整群抽样:把总体分成若干「群」(每个群本身就是总体的缩影),再随机抽取整个群", "example_en": "Cluster sampling divides the population into representative subgroups called clusters and then randomly selects entire clusters to sample." },
    { "term_en": "convenience / judgmental sampling", "meaning_zh": "便利/判断抽样:非概率抽样,依据抽样者的方便程度或主观判断选样本,代表性差", "example_en": "Convenience and judgmental sampling rely on the ease of access to data or the sampler's own judgment rather than random selection." },
    { "term_en": "sampling error", "meaning_zh": "抽样误差:某个统计量的观测值和它想要估计的真实总体参数之间的差", "example_en": "Sampling error is the difference between the observed value of a statistic and the quantity it is intended to estimate." },
    { "term_en": "central limit theorem (CLT)", "meaning_zh": "中心极限定理:当样本量足够大时,不论总体分布形状如何,样本均值的抽样分布都近似服从正态分布", "example_en": "The central limit theorem describes how the sampling distribution of the mean approaches a normal shape as the sample size grows, regardless of the population's original distribution." },
    { "term_en": "standard error of the sample mean", "meaning_zh": "样本均值的标准误 = 总体标准差 / √样本量,衡量样本均值本身的波动", "example_en": "The standard error of the sample mean equals the population standard deviation divided by the square root of the sample size." },
    { "term_en": "probability sampling vs. non-probability sampling", "meaning_zh": "概率抽样:总体中每个个体被抽中的概率相等,抽出的样本更可能代表总体;非概率抽样:依赖抽样者的主观判断或取样便利程度(如便利抽样、判断抽样),容易产生选择性偏差,代表性通常较差", "example_en": "Probability sampling gives every member of the population an equal chance of being selected, whereas non-probability sampling depends on factors other than probability considerations, such as a sampler's judgment or the convenience to access data." }
  ],
  "mnemonics": [
    { "title_zh": "五种抽样一句话区分", "content_zh": "简单随机=完全随机等概率;分层随机=先分组再按比例随机;整群=随机抽整个「群」;便利=图省事;判断=凭主观经验挑——只有前两种能保证严格的「每个体等概率被抽中」。" },
    { "title_zh": "置信区间公式", "content_zh": "点估计 ± 可靠性因子 × 标准误,记住这三项,抽样误差(sampling error)不在公式里,它只是「点估计与真值之差」这个概念,别混进去。" }
  ],
  "concepts": [
    {
      "term_en": "Confidence Interval",
      "explain_zh": "用点估计(point estimate)加减一个基于可靠性因子和标准误算出的区间,来表达对总体参数估计的不确定性范围。",
      "formula": "CI = \\text{Point Estimate} \\pm (\\text{Reliability Factor} \\times \\text{Standard Error})"
    },
    {
      "term_en": "Standard Error of the Sample Mean",
      "explain_zh": "样本均值这个统计量本身的标准差(standard deviation),随样本量增大而减小。",
      "formula": "\\sigma_{\\bar{X}} = \\frac{\\sigma}{\\sqrt{n}}"
    },
    {
      "term_en": "Binomial Distribution as the Population Distribution",
      "explain_zh": "当总体本身服从二项分布(binomial distribution)时,均值为np、方差为np(1-p)(n为试验次数,p为单次成功概率),总体分布本身可能是偏态的。但只要总体均值和方差有限,根据中心极限定理,当样本量n足够大时,样本均值的抽样分布依然近似服从正态分布(对称分布),与原总体的分布形状无关。",
      "formula": "\\mu = np,\\ \\sigma^2 = np(1-p)"
    }
  ],
  "analogies_zh": [
    { "title_zh": "用一勺汤判断一整锅汤的咸淡", "content_zh": "你不可能喝完整锅汤(总体 population),只能舀一勺尝一下(样本 sample)。勺子越大(样本量越大)、搅拌越均匀(抽样方法越接近简单随机),你尝出来的咸淡就越能代表整锅汤——这就是用样本估计总体的直觉。" }
  ],
  "connections": [
    { "topic_id": "simulation", "note_zh": "bootstrap 是用重复抽样「经验估计」标准误,这里则是用中心极限定理直接给出标准误的解析公式,两者互为参照。" },
    { "topic_id": "hypothesis-testing", "note_zh": "置信区间和假设检验是同一套抽样分布理论的两种应用:一个是「给出估计范围」,一个是「做出取舍决策」。" }
  ],
  "flashcards": [
    { "front_en": "Simple random sampling", "back_zh": "每个个体被抽中的概率完全相等" },
    { "front_en": "Stratified random sampling", "back_zh": "先分层,再按各层占总体比例分别随机抽样" },
    { "front_en": "Cluster sampling", "back_zh": "把总体分成若干「迷你总体」式的群,随机抽整个群" },
    { "front_en": "Central Limit Theorem", "back_zh": "样本量足够大时,样本均值近似服从正态分布,是总体均值的一致估计量" },
    { "front_en": "Confidence Interval formula", "back_zh": "点估计 ± 可靠性因子 × 标准误(抽样误差不在公式里)" },
    { "front_en": "Convenience / judgmental sampling", "back_zh": "非概率抽样,依赖抽样者判断或取样便利性,代表性通常比概率抽样差" },
    { "front_en": "Sampling error definition", "back_zh": "统计量的观测值与其所要估计的真实总体参数之间的差,不是置信区间公式的一项" }
  ]
};
