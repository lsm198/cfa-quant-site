window.TOPIC_META = {
  "id": "stats-returns",
  "title_zh": "资产收益的统计度量",
  "title_en": "Statistical Measures of Asset Returns",
  "essence_zh": "本质是给一组收益率数据「拍照」——用几个数字概括它的集中趋势(central tendency:均值 mean / 中位数 median / 众数 mode)、位置(分位数 quantile)、离散程度(dispersion:方差 variance / 标准差 standard deviation / MAD / 半方差 semideviation)和形状(shape:偏度 skewness / 峰度 kurtosis),用来快速判断这批收益率是否正常、风险大不大、是否有极端值(outlier)。",
  "exam_pattern_zh": "常考:①给一组数或统计量算分位数(quantile)/四分位距(interquartile range, IQR);②辨析集中趋势的大小关系(正偏分布 positively skewed 时 mode<median<mean,负偏 negatively skewed 则相反)——碰到「偏度」题闭眼记这个不等式链就行;③计算/辨析各种离散度量(MAD、目标半方差 target downside deviation、变异系数 coefficient of variation, CV)分别衡量什么、和标准差比大小;④正态分布(normal distribution)vs 对数正态分布(lognormal distribution)的关系——「连续复利收益率服从正态分布 ⟹ 未来股价服从对数正态分布」这句话几乎每年都考。",
  "vocabulary": [
    { "term_en": "measures of central tendency", "meaning_zh": "集中趋势度量:均值、中位数、众数,回答「数据大致落在哪」", "example_en": "Measures of central tendency include the mean, median, and mode." },
    { "term_en": "quartile / quintile / percentile", "meaning_zh": "四分位数/五分位数/百分位数,把排好序的数据切成若干等份的位置", "example_en": "Ranked in ascending order, the 19th observation in a sample of 75 falls in the second quintile." },
    { "term_en": "interquartile range (IQR)", "meaning_zh": "四分位距 = 第三四分位数 − 第一四分位数,衡量中间50%数据的离散程度", "example_en": "The interquartile range (IQR) is the difference between the third quartile and the first quartile." },
    { "term_en": "mean absolute deviation (MAD)", "meaning_zh": "平均绝对离差:每个观测值与均值之差取绝对值后再平均", "example_en": "The mean absolute deviation of the sample returns is less than the sample standard deviation." },
    { "term_en": "target (downside) deviation", "meaning_zh": "目标(下行)半方差:只统计低于目标收益率的那些偏差,衡量「亏钱的风险」", "example_en": "If the target return is 5%, the target downside deviation is closest to 1.9%." },
    { "term_en": "coefficient of variation (CV)", "meaning_zh": "变异系数 = 标准差/均值,衡量「每赚一单位收益要承担多少风险」", "example_en": "The coefficient of variation best quantifies the amount of risk per unit of mean return." },
    { "term_en": "skewness / kurtosis", "meaning_zh": "偏度(分布是否左右对称)/ 峰度(分布尾部相对正态分布是厚还是薄)", "example_en": "A graphical depiction of a continuous distribution with a left tail longer than the right tail indicates negative skewness." },
    { "term_en": "lognormal distribution", "meaning_zh": "对数正态分布:取对数后服从正态分布的分布,右偏、以0为下界,常用来给股价建模", "example_en": "If a stock's continuously compounded return is normally distributed, the future stock price is most likely lognormally distributed." }
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
    { "front_en": "Normal return → future price distribution", "back_zh": "连续复利收益率服从正态分布 ⟹ 未来价格服从对数正态分布" }
  ]
};
