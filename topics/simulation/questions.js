window.TOPIC_QUESTIONS = [
  {
    "id": "imported-024",
    "stem_en": "An analyst draws samples from an original sample to estimate the standard error  of a population mean. Which of the following best describes this sampling  procedure?",
    "choices_en": [
      "A. Bootstrap method",
      "B. Cluster sampling method",
      "C. Convenience sampling method"
    ],
    "answer": "A",
    "explanation_en": "Correct because in bootstrap, we repeatedly draw samples from the original sample, and each resample is of\nthe same size as the original sample. Note that each item drawn is replaced for the next draw (Le the identical\nelement is put back into the group so that it can be drawn more than once). Assuming we are looking to find the\nstandard error of sample mean, we take many resamples and then compute the mean of each resample.",
    "los": "describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications",
    "explanation_zh": "【知识点】bootstrap resampling(自举重抽样)。从原始样本中反复有放回地抽取新样本,每次重抽样的样本量都与原样本相同,且同一观测值可被多次抽中(有放回)。用这些重抽样计算出的多个统计量(如均值)去逼近抽样分布,这正是 bootstrap 的定义,故选 A。聚类抽样是先分群再抽样,便利抽样是按易得性选样,二者都不涉及“对同一原始样本反复重抽”这一核心特征,因此 B、C 均不成立。"
  },
  {
    "id": "imported-051",
    "stem_en": "Which of the following is required to compute the standard error of a sample  mean using the bootstrap resampling method?",
    "choices_en": [
      "A. The mean of each resample",
      "B. The mean of the original sample",
      "C. The standard deviation of the original sample"
    ],
    "answer": "A",
    "explanation_en": "Correct because the equation to estimate the standard error of the sample mean effectively computes the\nsample standard deviation of the different means generated across all resamples. Hence the mean of each\nresample is required. However, neither the mean, nor the standard deviation, of the original sample are\nrequired.",
    "los": "describe the use of resampling (bootstrap, jackknife) to estimate the sampling distribution of a statistic",
    "explanation_zh": "【知识点】Bootstrap Standard Error(自举法标准误)。公式为 SE = sqrt[1/(B-1) × Σ(X̄_b − 均值的均值)^2],即先算出 B 次重抽样各自的样本均值 X̄_b,再对这一组均值求标准差,所以真正需要的输入是“每次重抽样的均值”,答案为 A。原始样本本身只是用来生成重抽样的来源,其自身的均值(B)和标准差(C)都不会直接出现在该公式中——这是本考点最常见的反直觉陷阱。"
  }
];
