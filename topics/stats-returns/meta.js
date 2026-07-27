window.TOPIC_META = {
  "id": "stats-returns",
  "title_zh": "资产收益的统计度量",
  "title_en": "Statistical Measures of Asset Returns",
  "essence_zh": "本质是给一组收益率数据「拍照」——用几个数字概括它的集中趋势(central tendency:均值 mean / 中位数 median / 众数 mode)、位置(分位数 quantile)、离散程度(dispersion:方差 variance / 标准差 standard deviation / MAD / 半方差 semideviation)和形状(shape:偏度 skewness / 峰度 kurtosis),用来快速判断这批收益率是否正常、风险大不大、是否有极端值(outlier)。",
  "exam_pattern_zh": "常考:①给一组数或统计量算分位数(quantile)/四分位距(interquartile range, IQR);②辨析集中趋势的大小关系(正偏分布 positively skewed 时 mode<median<mean,负偏 negatively skewed 则相反)——碰到「偏度」题闭眼记这个不等式链就行;③计算/辨析各种离散度量(MAD、目标半方差 target downside deviation、变异系数 coefficient of variation, CV)分别衡量什么、和标准差比大小;④正态分布(normal distribution)vs 对数正态分布(lognormal distribution)的关系——「连续复利收益率服从正态分布 ⟹ 未来股价服从对数正态分布」这句话几乎每年都考。",
  "vocabulary": [
    { "term_en": "measures of central tendency", "meaning_zh": "集中趋势度量:均值、中位数、众数,回答「数据大致落在哪」", "example_en": "Measures of central tendency include the mean, median, and mode." },
    { "term_en": "quartile / quintile / percentile", "meaning_zh": "四分位数/五分位数/百分位数,把排好序的数据切成若干等份的位置", "example_en": "Percentiles, quartiles, and quintiles all describe an observation's position within a data set that has been sorted in ascending order." },
    { "term_en": "interquartile range (IQR)", "meaning_zh": "四分位距 = 第三四分位数 − 第一四分位数,衡量中间50%数据的离散程度", "example_en": "The interquartile range (IQR) is the difference between the third quartile and the first quartile." },
    { "term_en": "mean absolute deviation (MAD)", "meaning_zh": "平均绝对离差:每个观测值与均值之差取绝对值后再平均", "example_en": "The mean absolute deviation averages the absolute value of each observation's distance from the sample mean." },
    { "term_en": "target (downside) deviation", "meaning_zh": "目标(下行)半方差:只统计低于目标收益率的那些偏差,衡量「亏钱的风险」", "example_en": "The target downside deviation only includes squared deviations for returns that fall below a specified target return." },
    { "term_en": "coefficient of variation (CV)", "meaning_zh": "变异系数 = 标准差/均值,衡量「每赚一单位收益要承担多少风险」", "example_en": "Analysts use the coefficient of variation to compare the risk of different investments relative to their average return." },
    { "term_en": "skewness / kurtosis", "meaning_zh": "偏度(分布是否左右对称)/ 峰度(分布尾部相对正态分布是厚还是薄)", "example_en": "Skewness describes whether a distribution's tail is longer on one side, while kurtosis describes how fat or thin its tails are relative to a normal distribution." },
    { "term_en": "lognormal distribution", "meaning_zh": "对数正态分布:取对数后服从正态分布的分布,右偏、以0为下界,常用来给股价建模", "example_en": "Continuously compounded returns are often assumed to be normally distributed, which implies that the corresponding future price is lognormally distributed." },
    { "term_en": "median", "meaning_zh": "中位数:把数据从小到大排序后位于正中间的值。样本数为奇数时,中位数位于第 (n+1)/2 位;为偶数时,取中间两个数的均值。", "example_en": "The 50th percentile is the median, which is the average of the two middle items." }
  ],
  "mnemonics": [
    { "title_zh": "偏度决定三者顺序", "content_zh": "正偏(右偏,长尾在右):众数<中位数<均值,均值被极端大值拉高;负偏(左偏,长尾在左):反过来,均值<中位数<众数。口诀:「尾巴指向哪,均值就被拉向哪」。" },
    { "title_zh": "MAD vs 标准差", "content_zh": "MAD 用绝对值,标准差用平方再开方——平方会放大极端值的影响,所以只要数据不是完全相同,标准差通常都大于等于 MAD。" }
  ],
  "concepts": [
    {
      "term_en": "Interquartile Range (IQR)",
      "explain_zh": "衡量数据中间50%部分的离散程度,不受极端值(outlier)影响。",
      "formula": "IQR = Q_3 - Q_1"
    },
    {
      "term_en": "Mean Absolute Deviation (MAD)",
      "explain_zh": "每个观测值偏离均值的距离(取绝对值)的平均数。",
      "formula": "MAD = \\frac{\\sum_{i=1}^{n} |X_i - \\bar{X}|}{n}"
    },
    {
      "term_en": "Coefficient of Variation",
      "explain_zh": "标准化后的风险指标(risk per unit of return),数值越大说明每单位平均收益承担的波动越大,便于跨资产比较。",
      "formula": "CV = \\frac{s}{\\bar{X}}"
    },
    {
      "term_en": "Target Downside Deviation",
      "explain_zh": "只对低于目标收益率 B 的观测值计算偏差平方并平均再开方,专门衡量「跌破目标」的风险(shortfall risk)。",
      "formula": "s_{target} = \\sqrt{\\frac{\\sum (X_i - B)^2}{n-1}}, \\quad X_i \\le B"
    },
    {
      "term_en": "Quantile Location (Ly)",
      "explain_zh": "在升序排列的样本中,用来定位第 y 百分位所在位置的公式;若 Ly 不是整数,则在其相邻两个观测值之间做线性插值求出该分位数的值。",
      "formula": "L_y = (n+1)\\frac{y}{100}"
    },
    {
      "term_en": "Trimmed Mean",
      "explain_zh": "截尾均值:先剔除样本两端各一定比例(如各2.5%,共5%)的极端观测值,再对剩余数据求算术平均,以降低极端值对均值的干扰。与之相对的 winsorized mean(缩尾均值)不剔除极端值,而是把它们替换为对应临界值后再求均值。"
    },
    {
      "term_en": "Skewness: Ordering, Economic Meaning, and Graphical Reading",
      "explain_zh": "偏度(skewness)要从三个角度掌握:①集中趋势顺序——正偏(右偏,长尾在右)时众数<中位数<均值(少数极端大值把均值拉到最高);负偏(左偏,长尾在左)时均值<中位数<众数(少数极端负值把均值拖到最低)。②经济含义——均值为零的负偏分布代表「frequent small gains and a few extreme losses」(常见小赚、偶尔巨亏,极端亏损把均值拉向负方向)。③图形判断——看哪一侧尾巴更长:左尾比右尾长 → negative skewness;右尾比左尾长 → positive skewness;这与峰度(kurtosis,描述尾部厚薄而非左右不对称)是两个不同的概念,不要混淆。"
    }
  ],
  "analogies_zh": [
    { "title_zh": "给收益率数据做体检", "content_zh": "均值/中位数/众数看「整体水平在哪」,标准差/MAD 看「波动有多大」,偏度看「有没有偏离常态的极端拖累」——就像一张体检报告,几个指标合起来才能判断这批收益率数据是否「健康」。" }
  ],
  "connections": [
    { "topic_id": "rates-returns", "note_zh": "算出一串真实的 HPR 之后,正好用这里的工具描述它们的分布特征。" },
    { "topic_id": "probability-trees", "note_zh": "从「一组已观察到的收益率」的描述统计,延伸到「尚未发生的不确定结果」的概率分布与期望值。" },
    { "topic_id": "portfolio-math", "note_zh": "这里的方差/标准差是组合方差公式里每个资产自身风险项的基本构件。" }
  ],
  "flashcards": [
    { "front_en": "Positively skewed distribution order", "back_zh": "众数 < 中位数 < 均值(长尾在右,均值被拉高)" },
    { "front_en": "Negatively skewed distribution order", "back_zh": "均值 < 中位数 < 众数(长尾在左,均值被拉低)" },
    { "front_en": "Coefficient of Variation (CV)", "back_zh": "CV = 标准差 / 均值,风险/单位收益" },
    { "front_en": "Normal return → future price distribution", "back_zh": "连续复利收益率服从正态分布 ⟹ 未来价格服从对数正态分布" },
    { "front_en": "Interquartile Range (IQR)", "back_zh": "IQR=Q3−Q1,衡量中间50%数据的离散程度,不受极端值影响" },
    { "front_en": "Quantile location formula", "back_zh": "Ly=(n+1)×(y/100);若不是整数,在相邻两观测值间线性插值" },
    { "front_en": "Target downside deviation", "back_zh": "只对低于目标收益率B的观测值算偏差平方,分母仍用(n−1):√[Σ(Xi−B)²/(n−1)], Xi≤B" },
    { "front_en": "Mean Absolute Deviation (MAD)", "back_zh": "MAD=Σ|Xi−X̄|/n;比标准差小(标准差因取平方而放大极端值的影响)" },
    { "front_en": "Trimmed mean vs winsorized mean", "back_zh": "截尾均值:剔除两端极端值后取算术平均;缩尾均值:不剔除,而是替换为临界值再求均值" },
    { "front_en": "Lognormal distribution properties", "back_zh": "以0为下界(不能为负)、右偏(非对称),且均值不等于对应正态分布的均值" },
    { "front_en": "Skewness: tail & economic meaning", "back_zh": "左尾长=负偏,右尾长=正偏;均值为0的负偏分布代表「常见小赚、偶尔巨亏」" }
  ]
};
