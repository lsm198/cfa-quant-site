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
    "explanation_zh": ""
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
    "explanation_zh": ""
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
    "explanation_zh": ""
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
    "explanation_zh": ""
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
    "explanation_zh": ""
  }
];
