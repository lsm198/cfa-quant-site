window.TOPIC_META = {
  "id": "stats-returns",
  "title_zh": "资产收益的统计度量",
  "title_en": "Statistical Measures of Asset Returns",
  "essence_zh": "本质是给一组收益率数据「拍照」——用几个数字概括它的集中趋势(均值/中位数/众数)、位置(分位数)、离散程度(方差/标准差/MAD/半方差)和形状(偏度/峰度),用来快速判断这批收益率是否正常、风险大不大、是否有极端值。",
  "exam_pattern_zh": "常考:①给一组数或统计量算分位数/四分位距;②辨析集中趋势的大小关系(正偏分布 mode<median<mean,负偏则相反)——碰到「偏度」题闭眼记这个不等式链就行;③计算/辨析各种离散度量(MAD、目标半方差、变异系数 CV)分别衡量什么、和标准差比大小;④正态分布 vs 对数正态分布的关系——「连续复利收益率服从正态分布 ⟹ 未来股价服从对数正态分布」这句话几乎每年都考。",
  "vocabulary": [
    { "term_en": "measures of central tendency", "meaning_zh": "集中趋势度量:均值、中位数、众数,回答「数据大致落在哪」" },
    { "term_en": "quartile / quintile / percentile", "meaning_zh": "四分位数/五分位数/百分位数,把排好序的数据切成若干等份的位置" },
    { "term_en": "interquartile range (IQR)", "meaning_zh": "四分位距 = 第三四分位数 − 第一四分位数,衡量中间50%数据的离散程度" },
    { "term_en": "mean absolute deviation (MAD)", "meaning_zh": "平均绝对离差:每个观测值与均值之差取绝对值后再平均" },
    { "term_en": "target (downside) deviation", "meaning_zh": "目标(下行)半方差:只统计低于目标收益率的那些偏差,衡量「亏钱的风险」" },
    { "term_en": "coefficient of variation (CV)", "meaning_zh": "变异系数 = 标准差/均值,衡量「每赚一单位收益要承担多少风险」" },
    { "term_en": "skewness / kurtosis", "meaning_zh": "偏度(分布是否左右对称)/ 峰度(分布尾部相对正态分布是厚还是薄)" },
    { "term_en": "lognormal distribution", "meaning_zh": "对数正态分布:取对数后服从正态分布的分布,右偏、以0为下界,常用来给股价建模" }
  ],
  "mnemonics": [
    { "title_zh": "偏度决定三者顺序", "content_zh": "正偏(右偏,长尾在右):众数<中位数<均值,均值被极端大值拉高;负偏(左偏,长尾在左):反过来,均值<中位数<众数。口诀:「尾巴指向哪,均值就被拉向哪」。" },
    { "title_zh": "MAD vs 标准差", "content_zh": "MAD 用绝对值,标准差用平方再开方——平方会放大极端值的影响,所以只要数据不是完全相同,标准差通常都大于等于 MAD。" }
  ],
  "concepts": [
    {
      "term_en": "Interquartile Range (IQR)",
      "explain_zh": "衡量数据中间50%部分的离散程度,不受极端值影响。",
      "formula": "IQR = Q_3 - Q_1"
    },
    {
      "term_en": "Mean Absolute Deviation (MAD)",
      "explain_zh": "每个观测值偏离均值的距离(取绝对值)的平均数。",
      "formula": "MAD = \\frac{\\sum_{i=1}^{n} |X_i - \\bar{X}|}{n}"
    },
    {
      "term_en": "Coefficient of Variation",
      "explain_zh": "标准化后的风险指标,数值越大说明每单位平均收益承担的波动越大,便于跨资产比较。",
      "formula": "CV = \\frac{s}{\\bar{X}}"
    },
    {
      "term_en": "Target Downside Deviation",
      "explain_zh": "只对低于目标收益率 B 的观测值计算偏差平方并平均再开方,专门衡量「跌破目标」的风险。",
      "formula": "s_{target} = \\sqrt{\\frac{\\sum (X_i - B)^2}{n-1}}, \\quad X_i \\le B"
    }
  ],
  "flashcards": [
    { "front_en": "Positively skewed distribution order", "back_zh": "众数 < 中位数 < 均值(长尾在右,均值被拉高)" },
    { "front_en": "Negatively skewed distribution order", "back_zh": "均值 < 中位数 < 众数(长尾在左,均值被拉低)" },
    { "front_en": "Coefficient of Variation (CV)", "back_zh": "CV = 标准差 / 均值,风险/单位收益" },
    { "front_en": "Normal return → future price distribution", "back_zh": "连续复利收益率服从正态分布 ⟹ 未来价格服从对数正态分布" }
  ]
};
