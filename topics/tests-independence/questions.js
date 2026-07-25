window.TOPIC_QUESTIONS = [
  {
    "id": "imported-004",
    "stem_en": "For a sample of 50 observations, in which of the following situations is a  nonparametric test least likely to be appropriate? The data:",
    "choices_en": [
      "A. contain outliers.",
      "B. are given in ranks.",
      "C. come from a population with a log normal distribution."
    ],
    "answer": "C",
    "explanation_en": "Correct because a nonparametric test would be less appropriate compared to other answers as in this case a\nparametric test can be used. We may want to test a hypothesis concerming the mean of a population but believe\nthat neither + nor z-distributed tests are appropriate because the sample is small and may come from a\nmarkedly non-normally distributed population. In that case, we may use a nonparametric test. In our case, the\ndata sample ts large, thus a parametric test can be used instead.",
    "los": "» compare and contrast parametric and nonparametric tests, and describe situations where each ts the more appropriate type of test",
    "explanation_zh": "【知识点】nonparametric test(非参数检验)。非参数检验的三大适用场景是:①数据不满足分布假设、②数据以排名形式给出、③假设本身不涉及参数。异常值(outliers)会破坏正态假设、排名数据本身无法套用参数分布,这两种都是典型的非参数场景。但对数正态分布(log normal distribution)的数据只需取对数即可转化为正态分布,依然可以用参数检验(如 t 检验)处理,因此在此情形下非参数检验反而是最不必要的,答案为 C。"
  },
  {
    "id": "imported-016",
    "stem_en": "A test of independence is based on the data in a contingency table with 5 rows  and 4 columns. Using a nonparametric test statistic that is chi-square distributed,  the number of degrees of freedom is:",
    "choices_en": [
      "A. 7.",
      "B. 12.",
      "C. 20."
    ],
    "answer": "B",
    "explanation_en": "Correct because for a contingency table we can perform a test of independence using a nonparametric test\nStatistic that is chi-square distributed this test statistic has (r— 1)(c — 1) degrees of freedom, where r is the\nnumber of rows and cis the number of columns. Here, r=5 and c = 4, so degrees of freedom = (5— 1)(4-—1)=\n4x3 = 12.",
    "los": "explain tests of independence based on contingency table data",
    "explanation_zh": "【知识点】Chi-Square Test of Independence,公式 df = (r-1)(c-1)。列联表(contingency table)卡方独立性检验的自由度由行数 r 和列数 c 共同决定:df=(r−1)(c−1)。本题 r=5 行,c=4 列,代入得 df=(5−1)×(4−1)=4×3=12。选项 A 的 7 可能是误用 r+c−2=7 的加法算法,正确做法必须是两个「减一」后相乘,答案为 B。"
  },
  {
    "id": "imported-017",
    "stem_en": "In a parametric test of the correlation between two variables with a sample size of  51 and sample correlation of 0.6, the t-statistic is closest to:",
    "choices_en": [
      "A. 0.07.",
      "B. 5.25.",
      "C. 6.64."
    ],
    "answer": "B",
    "explanation_en": "Correct because for a Parametric Test of a Correlation if the two vanables are normally distnbuted, we can\ntest to determine whether the null hypothesis (H,: p = 0) should be rejected using the sample correlation, r The\nformula for the test is\nn(n—2)/4(1 — Py\" = (0.6)v(51 — 2) / V(1 — 0.36) = (0.6)(7)/0.8 = 5.25.",
    "los": "explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance",
    "explanation_zh": "【知识点】t-test for Population Correlation = 0,公式 t = r√[(n−2)/(1−r²)]。样本量 n=51,样本相关系数 r=0.6。代入:t = 0.6×√[(51−2)/(1−0.6²)] = 0.6×√(49/0.64) = 0.6×(7/0.8) = 0.6×8.75 = 5.25,自由度 df=n−2=49。计算结果最接近选项 B。"
  },
  {
    "id": "imported-083",
    "stem_en": "An analyst tabulates the ranks of four paired observations of random variables X  and Y as follows:  Observation  Rank of X  Rank of Y  1  1  2  2  2  3  3  3  4  4  4  1  The Spearman rank correlation coefficient between X and Y is closest to:",
    "choices_en": [
      "A. -0.2.",
      "B. 0.8.",
      "C. 1.0."
    ],
    "answer": "A",
    "explanation_en": "Correct because with n as the sample size, the Spearman rank correlation is given by:\nf= 1-—(6 ¥dZV(n(n* — 1))\" = 1 — 6(12)/(4(4¢ — 1) = 1-6/5 =—-1/5 = -0.2, where the sum of squared differences\nin ranks }d2 = (2-1) + (3-2)? + (4-3) + (1-4) =14+14+14+9= 12.",
    "los": "explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance",
    "explanation_zh": "【知识点】Spearman Rank Correlation Coefficient,公式 rS = 1 − 6Σd²/[n(n²−1)]。四组观测的排名差 d(X排名−Y排名)分别为 1−2=−1、2−3=−1、3−4=−1、4−1=3,平方后 d²=1,1,1,9,Σd²=12,n=4。代入:rS = 1 − 6×12/[4×(4²−1)] = 1 − 72/60 = 1 − 1.2 = −0.2。答案为 A;选项 C=1.0 是误以为四组排名完全一致导致的错误。"
  },
  {
    "id": "imported-090",
    "stem_en": "A nonparametric test is most appropriate when:",
    "choices_en": [
      "A. comparing differences between means.",
      "B. data are given in ranks.",
      "C. data meet distributional assumptions."
    ],
    "answer": "B",
    "explanation_en": "Correct. A nonparametric test is used under three circumstances: 1) when the data do not meet distnbutional\nassumptions, 2) when the data are given in ranks, and 3) when the hypothesis does not concem a parameter.",
    "los": "compare and contrast parametric and nonparametric tests, and describe situations where each ts the more appropriate type of test",
    "explanation_zh": "【知识点】nonparametric test(非参数检验)。非参数检验的三大适用场景之一就是「数据以排名(rank)形式给出」,此时无法直接假设数据服从某个已知分布,只能用非参数方法(如 Spearman 等级相关)处理。而比较均值差异(A)和数据满足分布假设(C)恰恰是参数检验(如 t 检验)的典型适用场景,并非非参数检验的触发条件。答案为 B。"
  }
];
