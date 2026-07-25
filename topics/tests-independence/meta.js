window.TOPIC_META = {
  "id": "tests-independence",
  "title_zh": "独立性的参数与非参数检验",
  "title_en": "Parametric and Non-Parametric Tests of Independence",
  "essence_zh": "本质是回答「什么时候该放弃常规的 t 检验(t-test),改用不依赖分布假设的方法」——参数检验(parametric test,如 t 检验)要求数据服从某种分布(通常是正态分布 normal distribution),非参数检验(nonparametric test)不做这个假设,专门用于数据不满足分布假设、数据是排名(rank)形式、或假设本身跟「参数」无关的场景。这一节还包括两个具体的非参数工具:列联表(contingency table)卡方独立性检验(chi-square test of independence),和 Spearman 等级相关系数(Spearman rank correlation coefficient)检验。",
  "exam_pattern_zh": "常考:①判断某种场景该用参数还是非参数检验——三个触发条件「数据不满足分布假设/数据是排名形式/假设本身不涉及参数」要背熟,反过来「样本大、满足正态假设」就该用参数检验;②列联表卡方独立性检验的自由度(degrees of freedom)计算,df=(行数−1)×(列数−1),很容易漏减 1;③相关系数为 0 的参数检验,t 统计量公式要背;④Spearman 等级相关系数的计算,给排名算 d² 之和再代公式。",
  "vocabulary": [
    { "term_en": "parametric test", "meaning_zh": "参数检验:假设数据服从某个已知分布(通常是正态分布)的检验方法,如 t 检验", "example_en": "A parametric test assumes the sample is drawn from a population with a specific distribution, such as the normal distribution." },
    { "term_en": "nonparametric test", "meaning_zh": "非参数检验:不依赖总体分布假设的检验方法,常用于数据是排名、有异常值、或假设与参数无关的场景", "example_en": "A nonparametric test is most appropriate when data are given in ranks." },
    { "term_en": "test of independence", "meaning_zh": "独立性检验:检验两个类别变量是否相互独立,常用列联表配合卡方统计量", "example_en": "A test of independence is based on the data in a contingency table with 5 rows and 4 columns." },
    { "term_en": "contingency table", "meaning_zh": "列联表:把两个类别变量的观测频数按行列交叉列出的表格", "example_en": "A contingency table cross-tabulates the observed frequencies of two categorical variables." },
    { "term_en": "Spearman rank correlation coefficient", "meaning_zh": "斯皮尔曼等级相关系数:先把原始数据转换成排名,再计算排名之间的相关系数,不要求变量服从正态分布", "example_en": "The Spearman rank correlation coefficient between X and Y is closest to −0.2." }
  ],
  "mnemonics": [
    { "title_zh": "非参数检验三大触发条件", "content_zh": "「不满足分布假设」「数据是排名」「假设本身不涉及参数」——占一条就该用非参数检验,三条一条都不占就乖乖用参数检验。" },
    { "title_zh": "卡方独立性检验自由度", "content_zh": "df = (行数 − 1) × (列数 − 1),两个「减一」都不能漏。" }
  ],
  "concepts": [
    {
      "term_en": "Chi-Square Test of Independence",
      "explain_zh": "检验列联表(contingency table)中两个类别变量是否相互独立的非参数方法,自由度由行数和列数共同决定。",
      "formula": "df = (r-1)(c-1)"
    },
    {
      "term_en": "t-test for Population Correlation = 0",
      "explain_zh": "在两变量服从正态分布的前提下,检验样本相关系数(sample correlation)是否显著不为 0。",
      "formula": "t = r\\sqrt{\\frac{n-2}{1-r^2}}, \\quad df = n-2"
    },
    {
      "term_en": "Spearman Rank Correlation Coefficient",
      "explain_zh": "先把原始观测值转换成排名(rank),再基于排名差的平方和计算相关系数,适用于不满足正态假设或存在异常值(outlier)的数据。",
      "formula": "r_S = 1 - \\frac{6\\sum d_i^2}{n(n^2-1)}"
    }
  ],
  "analogies_zh": [
    { "title_zh": "体检指标的正常范围", "content_zh": "有些体检指标可以直接套用标准公式换算成「正常范围」(参数检验,前提是知道这个指标该服从什么分布);但如果医生根本不确定这个指标该服从什么分布,就只能靠「和其他人比排名」(非参数检验,比如用排名/等级来比较)。" }
  ],
  "connections": [
    { "topic_id": "hypothesis-testing", "note_zh": "非参数检验是参数检验(t 检验)在数据不满足分布假设时的替代方案,检验逻辑(H0/Ha、拒绝域)完全相同。" },
    { "topic_id": "probability-trees", "note_zh": "这里检验的「相关系数是否为 0」,用的正是概率树那节定义的相关系数。" },
    { "topic_id": "regression", "note_zh": "Spearman 相关系数、卡方独立性检验,可以看作回归分析里「相关性」和「显著性检验」思路的非参数版本。" }
  ],
  "flashcards": [
    { "front_en": "When to use a nonparametric test", "back_zh": "数据不满足分布假设 / 数据是排名 / 假设本身不涉及参数,占一条即可" },
    { "front_en": "Chi-square test of independence df", "back_zh": "df = (行数−1) × (列数−1)" },
    { "front_en": "t-test for correlation = 0", "back_zh": "t = r × √[(n−2)/(1−r²)], df = n−2" },
    { "front_en": "Spearman rank correlation", "back_zh": "rS = 1 − 6Σd² / [n(n²−1)]" }
  ]
};
