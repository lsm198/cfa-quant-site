window.TOPIC_META = {
  "id": "simulation",
  "title_zh": "模拟方法",
  "title_en": "Simulation Methods",
  "essence_zh": "本质是当理论公式算不出/不好算某个统计量的抽样分布(sampling distribution)时,用「重复抽样+计算」(resampling)的暴力方法去逼近答案——比如不知道样本均值标准误(standard error)的解析公式,就从原始样本里反复有放回地抽样(bootstrap resampling),对每次抽样结果算统计量,再看这些结果的分布。",
  "exam_pattern_zh": "这一节题量少但很集中,几乎只考「自举法 bootstrap」这一个知识点:①认出「从原始样本反复有放回抽样(resampling with replacement),每次抽样量和原样本一样大」这个描述对应的就是 bootstrap;②知道计算 bootstrap 标准误需要用到「每次重抽样的均值」这个统计量,而不需要原样本本身的均值或标准差。",
  "vocabulary": [
    { "term_en": "bootstrap resampling", "meaning_zh": "自举重抽样:从原始样本里有放回地反复抽取样本,每次抽样量等于原样本大小", "example_en": "Bootstrap resampling estimates a statistic's sampling distribution by repeatedly drawing new samples from an original data set." },
    { "term_en": "resampling with replacement", "meaning_zh": "有放回抽样:每次抽出的观测值放回去,同一个观测值可能被多次抽中", "example_en": "Each item drawn is replaced before the next draw, so the identical observation can be selected more than once." },
    { "term_en": "standard error of the sample mean", "meaning_zh": "样本均值的标准误,用来衡量样本均值本身的波动/不确定性", "example_en": "The bootstrap standard error is calculated from the distribution of resample means, not from any single resample's raw values." }
  ],
  "mnemonics": [
    { "title_zh": "Bootstrap 要什么不要什么", "content_zh": "算 bootstrap 标准误,只需要「每次重抽样的均值」这一串数字,不需要原始样本自己的均值,也不需要原始样本的标准差——这是最常考的反直觉细节。" }
  ],
  "concepts": [
    {
      "term_en": "Bootstrap Standard Error",
      "explain_zh": "对原始样本进行 B 次有放回重抽样(resample),计算每次重抽样的样本均值,再求这 B 个均值的标准差,即为 bootstrap 估计的标准误。",
      "formula": "SE_{bootstrap} = \\sqrt{\\frac{1}{B-1}\\sum_{b=1}^{B}(\\bar{X}_b - \\bar{\\bar{X}})^2}"
    }
  ],
  "analogies_zh": [
    { "title_zh": "没有体重秤,就反复称很多次", "content_zh": "不知道某个统计量的「标准误公式」准不准(没有解析公式),那就用手头的数据反复抽样、算出很多个「测量值」,再看这些测量值本身的波动有多大——这就是 bootstrap 的直觉:用重复抽样的经验分布,代替算不出来的理论分布。" }
  ],
  "connections": [
    { "topic_id": "sampling-estimation", "note_zh": "bootstrap 是用「重复抽样」经验估计标准误的实操手段,呼应下一节用解析公式直接算标准误的思路——两者是同一个问题的两种解法。" }
  ],
  "flashcards": [
    { "front_en": "Bootstrap resampling", "back_zh": "从原始样本有放回反复抽样,每次抽样量等于原样本大小" },
    { "front_en": "What bootstrap SE needs", "back_zh": "只需要每次重抽样的均值,不需要原样本的均值或标准差" }
  ]
};
