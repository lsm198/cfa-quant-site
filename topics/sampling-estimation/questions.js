window.TOPIC_QUESTIONS = [
  {
    "id": "imported-001",
    "stem_en": "Which of the following factors is not used in the calculation of a confidence  interval?",
    "choices_en": [
      "A. Point estimate.",
      "B. Sampling error.",
      "C. Reliability factor."
    ],
    "answer": "B",
    "explanation_en": "Correct because a confidence interval for a parameter is calculated as: Point estimate + Reliability factor =\nstandard error, where standard error is the standard error of the sample statistic providing the point estimate.\nThus, sampling error is not part of the calculation. Sampling error is the difference between the observed value\nof a statistic and the quantity it is intended to estimate. It is because of sampling error that confidence intervals\nare used.",
    "los": "compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem",
    "explanation_zh": "【知识点】Confidence Interval\n置信区间的计算公式为:点估计 ±(可靠性因子 × 标准误),只包含点估计(point estimate)、可靠性因子(reliability factor)、标准误(standard error)这三项,不包含抽样误差(sampling error)。抽样误差指“统计量的观测值与其所估计的真实总体参数之间的差”,它是置信区间存在的原因(正因为存在这种误差,才需要用区间而非单一数值来估计总体参数),但本身并不出现在计算公式里。故正确答案为B。"
  },
  {
    "id": "imported-033",
    "stem_en": "All else being equal, when compared to non-probability sampling, probability  sampling most likely yields:",
    "choices_en": [
      "A. a less representative sample.",
      "B. an equally representative sample.",
      "C. a more representative sample."
    ],
    "answer": "C",
    "explanation_en": "Correct because probability sampling gives every member of the population an equal change of being selected.\nHence it can create a sample that is representative of the population. In contrast, non-probability sampling\ndepends on factors other than probability considerations, such as a sampler's judgment or the convenience to\naccess data. Consequently there Is a significant risk that non-probability sampling might generate a non-\nrepresentative sample. In general, all else being equal, probability sampling can yield more accuracy and\nreliability compared with non-probability sampling.",
    "los": "# compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem",
    "explanation_zh": "【知识点】convenience / judgmental sampling(非概率抽样)\n概率抽样(probability sampling)让总体中每个个体被抽中的概率相等,因此抽出的样本更可能反映总体的真实结构;非概率抽样(如便利抽样、判断抽样)依赖抽样者的主观判断或取样便利程度,容易引入选择性偏差,代表性通常较差。因此在其他条件相同时,概率抽样比非概率抽样更可能得到有代表性的样本,答案为C。"
  },
  {
    "id": "imported-040",
    "stem_en": "Sampling error is the difference between the observed value of a:",
    "choices_en": [
      "A. random variable and the respective statistic.",
      "B. random variable and its hypothesized value.",
      "C. statistic and the quantity it is intended to estimate."
    ],
    "answer": "C",
    "explanation_en": "Correct because sampling error is the difference between the observed value of a statistic and the quantity It is\nintended to estimate.",
    "los": "» compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem",
    "explanation_zh": "【知识点】sampling error\n抽样误差(sampling error)的定义是:某个统计量(statistic,例如样本均值)的观测值,与它所要估计的总体参数真实值(the quantity it is intended to estimate,例如总体均值)之间的差。选项A、B都误把比较对象说成“随机变量”,而抽样误差比较的是“统计量”与“待估计的量”,故正确答案为C。"
  },
  {
    "id": "imported-041",
    "stem_en": "The central limit theorem:",
    "choices_en": [
      "A. requires that the population be approximately normally distributed.",
      "B. implies that the sample mean is a consistent estimator of the population  mean.",
      "C. states that the product of independent random variables is normally  distributed."
    ],
    "answer": "B",
    "explanation_en": "Correct because the central limit theorem states that the variance of the distribution of the sample mean is o¢/n.\nThe positive square root of variance is standard deviation. The standard deviation of a sample statistic is known\nas the standard error of the statistic. The sample mean, in addition to being an efficient estimator, is also a\nconsistent estimator of the population mean: As sample size n goes to infinity, its standard error, om goes to 0\nand its sampling distribution becomes concentrated nght over the value of population mean, wu.",
    "los": "ma explain the central limit theorem and ifs importance for the distribution and standard error of the sample mean",
    "explanation_zh": "【知识点】central limit theorem (CLT)\n中心极限定理指出:当样本量n足够大时,样本均值 X̄ 的抽样分布近似服从正态分布,其方差为 σ²/n、标准误为 σ/√n。随着n增大,标准误趋于0,样本均值的抽样分布会越来越集中在总体均值μ附近,这正是“一致估计量(consistent estimator)”的含义——样本量越大,估计量越逼近真值。选项A错,CLT恰恰不要求总体本身服从正态分布;选项C错,CLT讨论的是均值(和)的分布,而非随机变量“乘积”的分布。故答案为B。"
  },
  {
    "id": "imported-073",
    "stem_en": "An analyst considers the population of all existing stocks and selects those where  the company name starts with the letter P. This sampling procedure is most likely  an example of.",
    "choices_en": [
      "A. systematic sampling.",
      "B. non-probability sampling.",
      "C. two-stage cluster sampling."
    ],
    "answer": "B",
    "explanation_en": "Correct because the sampling procedure does not give every member of the population an equal chance of\nbeing selected. It is based on the analyst's convenience. Non-probability sampling depends on factors other\nthan probability considerations, such as a sampler’s judgment or the convenience to access data.",
    "los": "compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem",
    "explanation_zh": "【知识点】convenience / judgmental sampling\n该分析师仅凭“公司名字以P开头”这一图省事的标准来选样本,并没有让总体中每个个体都拥有相等的被抽中概率,这正是便利抽样(convenience sampling)的典型特征——取样标准由抽样者的方便程度决定,而非某种随机化程序。这种抽样属于非概率抽样(non-probability sampling),得到的样本代表性较差。故答案为B。"
  },
  {
    "id": "imported-087",
    "stem_en": "In which of the following cases is cluster sampling most likely used? When:",
    "choices_en": [
      "A. conducting a market survey.",
      "B. auditing financial statements.",
      "C. creating a bond portfolio to mirror the performance of a specified index."
    ],
    "answer": "A",
    "explanation_en": "Correct because, in cluster sampling, the population is divided into clusters, each of which is essentially a mini-\nrepresentation of the entire populations. Then certain clusters are chosen as a whole using simple random\nsampling. Cluster sampling is commonly used for market surveys, and the most popular version identifies\nclusters based on geographic parameters.",
    "los": "# compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem",
    "explanation_zh": "【知识点】cluster sampling\n整群抽样(cluster sampling)是先把总体分成若干“群”(cluster),每个群本身近似是总体的缩影,再用简单随机抽样的方式抽出若干整群作为样本,最常见的分群方式是按地理区域划分,常用于市场调查。审计财务报表通常需针对特定账目或交易做定向抽样,复制指数表现的债券组合则另有专门的抽样/优化方法,均非整群抽样的典型场景。故答案为A。"
  },
  {
    "id": "imported-088",
    "stem_en": "Samples are drawn from a population that follows a binomial distribution with a  probability of success on a trial of 0.3. According to the central limit theorem, as  the sample size increases, the distribution of the sample mean approaches a",
    "choices_en": [
      "A. negatively skewed distribution.",
      "B. Symmetric distribution.",
      "C.  positively skewed distribution."
    ],
    "answer": "B",
    "explanation_en": "Correct because, according to the central limit theorem, the sampling distribution of the sample mean will be\napproximately normal when the sample size nis large. The normal distribution has a skewness of 0 (it is\nsymmetric). Since the binomial distribution has a mean of np and finite vanance of np(1 — p), where nis the\nnumber of trials and p is the probability of success, the central limit theorem holds.",
    "los": "explain the central limit theorem and its importance for the distribution and standard error of the sample mean",
    "explanation_zh": "【知识点】central limit theorem (CLT)\n本题中总体服从二项分布(binomial distribution),均值为np、方差为np(1-p)(此处p=0.3,总体分布本身是偏态的)。但根据中心极限定理,只要总体均值和方差有限,当样本量n足够大时,样本均值的抽样分布依然会近似服从正态分布,与原总体的分布形状(是否偏态)无关。正态分布的偏度为0,即对称分布(symmetric distribution)。故答案为B,选项A、C都错误地把原总体的偏态特征套用到了抽样分布上。"
  },
  {
    "id": "imported-092",
    "stem_en": "Grouping all publicly traded US firms by sector and then randomly selecting  subsamples of firms from each sector according to the sector's proportion in the  total population is an example of:",
    "choices_en": [
      "A. cluster sampling.",
      "B. simple random sampling.",
      "C. stratified random sampling."
    ],
    "answer": "C",
    "explanation_en": "Correct because, in stratified random sampling, the population Is divided into subpopulations (strata) based on\none or more classification criteria. Simple random samples are then drawn from each stratum in sizes\nproportional to the relative size of each stratum in the population.",
    "los": "compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem",
    "explanation_zh": "【知识点】stratified random sampling\n先按行业(sector)把全部上市公司划分为若干层(strata),再从每一层中按其占总体的比例抽取相应数量的随机子样本,这正是分层随机抽样(stratified random sampling)的定义。整群抽样是随机抽取整个“群”作为样本单位,而不是按比例分层抽样;简单随机抽样则不做任何分层,直接对全体个体等概率抽取。故答案为C。"
  }
];
