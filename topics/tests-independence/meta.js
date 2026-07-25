window.TOPIC_META = {
  "id": "tests-independence",
  "title_zh": "独立性的参数与非参数检验",
  "title_en": "Parametric and Non-Parametric Tests of Independence",
  "essence_zh": "本质是回答「什么时候该放弃常规的 t 检验,改用不依赖分布假设的方法」——参数检验(t 检验等)要求数据服从某种分布(通常是正态),非参数检验不做这个假设,专门用于数据不满足分布假设、数据是排名(rank)形式、或假设本身跟「参数」无关的场景。这一节还包括两个具体的非参数工具:列联表卡方独立性检验,和 Spearman 等级相关系数检验。",
  "exam_pattern_zh": "常考:①判断某种场景该用参数还是非参数检验——三个触发条件「数据不满足分布假设/数据是排名形式/假设本身不涉及参数」要背熟,反过来「样本大、满足正态假设」就该用参数检验;②列联表卡方独立性检验的自由度计算,df=(行数−1)×(列数−1),很容易漏减 1;③相关系数为 0 的参数检验,t 统计量公式要背;④Spearman 等级相关系数的计算,给排名算 d² 之和再代公式。",
  "vocabulary": [
    { "term_en": "parametric test", "meaning_zh": "参数检验:假设数据服从某个已知分布(通常是正态分布)的检验方法,如 t 检验" },
    { "term_en": "nonparametric test", "meaning_zh": "非参数检验:不依赖总体分布假设的检验方法,常用于数据是排名、有异常值、或假设与参数无关的场景" },
    { "term_en": "test of independence", "meaning_zh": "独立性检验:检验两个类别变量是否相互独立,常用列联表配合卡方统计量" },
    { "term_en": "contingency table", "meaning_zh": "列联表:把两个类别变量的观测频数按行列交叉列出的表格" },
    { "term_en": "Spearman rank correlation coefficient", "meaning_zh": "斯皮尔曼等级相关系数:先把原始数据转换成排名,再计算排名之间的相关系数,不要求变量服从正态分布" }
  ],
  "mnemonics": [
    { "title_zh": "非参数检验三大触发条件", "content_zh": "「不满足分布假设」「数据是排名」「假设本身不涉及参数」——占一条就该用非参数检验,三条一条都不占就乖乖用参数检验。" },
    { "title_zh": "卡方独立性检验自由度", "content_zh": "df = (行数 − 1) × (列数 − 1),两个「减一」都不能漏。" }
  ],
  "concepts": [
    {
      "term_en": "Chi-Square Test of Independence",
      "explain_zh": "检验列联表中两个类别变量是否相互独立的非参数方法,自由度由行数和列数共同决定。",
      "formula": "df = (r-1)(c-1)"
    },
    {
      "term_en": "t-test for Population Correlation = 0",
      "explain_zh": "在两变量服从正态分布的前提下,检验样本相关系数是否显著不为 0。",
      "formula": "t = r\\sqrt{\\frac{n-2}{1-r^2}}, \\quad df = n-2"
    },
    {
      "term_en": "Spearman Rank Correlation Coefficient",
      "explain_zh": "先把原始观测值转换成排名,再基于排名差的平方和计算相关系数,适用于不满足正态假设或存在异常值的数据。",
      "formula": "r_S = 1 - \\frac{6\\sum d_i^2}{n(n^2-1)}"
    }
  ],
  "flashcards": [
    { "front_en": "When to use a nonparametric test", "back_zh": "数据不满足分布假设 / 数据是排名 / 假设本身不涉及参数,占一条即可" },
    { "front_en": "Chi-square test of independence df", "back_zh": "df = (行数−1) × (列数−1)" },
    { "front_en": "t-test for correlation = 0", "back_zh": "t = r × √[(n−2)/(1−r²)], df = n−2" },
    { "front_en": "Spearman rank correlation", "back_zh": "rS = 1 − 6Σd² / [n(n²−1)]" }
  ]
};
