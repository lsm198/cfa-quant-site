window.TOPIC_QUESTIONS = [
  {
    "id": "imported-028",
    "stem_en": "An analyst estimates the probabilities of three possible economic scenarios and  the probabilities of a stock having a positive or a negative return in each scenario.  These scenarios are best represented by a:",
    "choices_en": [
      "A. tree-map.",
      "B. tree diagram.",
      "C. probability density function."
    ],
    "answer": "B",
    "explanation_en": "Correct because probabilities for different scenarios and different outcomes are best represented using a tree\ndiagram.",
    "los": "formulate an investment problem as a probability tree and explain the use of conditional expectations in investment application",
    "explanation_zh": "【知识点】tree diagram(树状图)。本题考查何时用树状图建模:题目含有多阶段不确定性——先是三种宏观经济场景,再在每个场景下股票收益为正或负——树状图能把各阶段的条件概率和联合概率清晰地展示在从根到叶的分支路径上。选项A的tree-map(矩形树图)展示的是层级化占比结构(如市值构成),不表达概率分支;选项C的概率密度函数针对连续型随机变量,不适合此处的离散多阶段场景。因此答案为B。"
  },
  {
    "id": "imported-030",
    "stem_en": "Which of the following visualizations is most appropriate for interpreting the  correlation between two variables?",
    "choices_en": [
      "A. Tree-map.",
      "B. Scatter plot.",
      "C. Clustered bar chart."
    ],
    "answer": "B",
    "explanation_en": "Correct because scatter plots are a very useful tool for the sensible interpretation of a correlation coefficient. A\nscatter plot is a type of graph for visualizing the joint variation in two numerical variables. It is a useful tool for\ndisplaying and understanding potential relationships between the variables.",
    "los": "interpret correlation between two variables to address an investment problem",
    "explanation_zh": "【知识点】Scatter Plot(散点图)。本题考查:判断两个数值变量之间的(线性)相关性时,最直观的可视化工具是散点图——把每对观测值(x,y)描成坐标点,点的分布形态可直接反映相关系数(correlation coefficient)的正负与强弱。选项A的tree-map用于展示层级占比,选项C的聚类柱状图用于比较类别间数值大小,均无法体现两个连续变量间的联合分布关系。故答案为B。"
  },
  {
    "id": "imported-042",
    "stem_en": "An analyst assumes that a company's future EPS will be either $2.00, $2.20, or  $2.40. If each scenario is equally likely, the variance [in $] of the company's  future EPS is closest to:",
    "choices_en": [
      "A. 0.03.",
      "B. 0.16.",
      "C. 0.20."
    ],
    "answer": "A",
    "explanation_en": "Correct because the variance of a random variable is the expected value (the probability-weighted average) of\nsquared deviations from the random variable’s expected value: o*(X) = ELX — E(x). Since each scenario is\nequally likely (probability = 1/3), E(X) = (2.0 + 2.2 + 2.43 =2.2, so o7(X) = [(2.0 — 2.2) + (2.2 —2.9)7 + (2.4\n—2.2)]/3 = [0.04 + 0.04//3 = 0.08/3 = 0.0267 = 0.03 [in $°].",
    "los": "calculate expected values, variances, and standard deviations and demonstrate their application to investment problems",
    "explanation_zh": "【知识点】Variance of a Discrete Random Variable(离散随机变量的方差),公式 σ²(X)=ΣP(Xi)[Xi−E(X)]²。三种EPS情景等概率(各1/3):先算期望值 E(X)=(2.00+2.20+2.40)/3=2.20;再算方差 σ²(X)=[(2.00−2.20)²+(2.20−2.20)²+(2.40−2.20)²]/3=(0.04+0+0.04)/3≈0.0267,四舍五入约为0.03,对应选项A。选项B、C是把标准差与方差混淆或算错分母导致的常见错误。"
  },
  {
    "id": "imported-048",
    "stem_en": "The correlation coefficient:",
    "choices_en": [
      "A. ranges from 0 to 1.",
      "B. is not affected by outliers.",
      "C. indicates the strength of the linear relationship between two random  variables."
    ],
    "answer": "C",
    "explanation_en": "Correct because the correlation coefficient expresses the strength of the linear relationship between the two\nrandom variables.",
    "los": "interpret correlation between two variables to address an investment problem",
    "explanation_zh": "【知识点】Correlation Coefficient(相关系数),公式 ρ=Cov(Ri,Rj)/[σ(Ri)σ(Rj)]。相关系数的取值范围恒为[-1,1],绝对值越接近1说明两变量的线性关系(linear relationship)越强。选项A错在范围应为[-1,1]而非[0,1];选项B错在相关系数其实对异常值(outliers)很敏感,极端值会显著拉动协方差和标准差从而扭曲相关系数。故正确答案为C。"
  },
  {
    "id": "imported-050",
    "stem_en": "The correlation between two variables measures:",
    "choices_en": [
      "A. only their linear relationship.",
      "B. only their non-linear relationship.",
      "C. both their linear and non-linear relationships."
    ],
    "answer": "A",
    "explanation_en": "Correct because the correlation coefficient is a measure of the linear association between two variables: it\nwould not be appropriate to use the correlation coefficient to measure the non-linear relationship between\nvariables.",
    "los": "interpret correlation between two variables to address an investment problem",
    "explanation_zh": "【知识点】Correlation Coefficient(相关系数),公式 ρ=Cov(Ri,Rj)/[σ(Ri)σ(Rj)]。相关系数只衡量两个变量之间的线性关系强弱。如果两个变量存在很强的非线性关系(例如U型曲线关系),相关系数可能接近0,却完全无法反映这种关系,这正是相关系数的局限性。因此答案为A,选项B、C都错误地扩大了相关系数能衡量的关系类型。"
  },
  {
    "id": "imported-052",
    "stem_en": "A discrete random variable X has the following probability distribution:  Probability Outcome  0.20  35  0.30  50  0.50  80  The standard deviation of X is closest to:",
    "choices_en": [
      "A. 18.73.",
      "B. 20.00.",
      "C. 22.91."
    ],
    "answer": "A",
    "explanation_en": "Correct because the expected value E(X) = 3,-,\"PUX)X; = (0.20 = 35) + (0.50 = 30) + (0.50 x 60) = 62. The\nvariance o*(X) = EX — E(X)|*} = 三 AP -EC = 0.20 x (35 — 62)* + 0.30 x (50 —62}¢ + 0.50 x\n(80 — 62)}* = 351. Standard deviation is the positive square root of variance: o = 351\" = 18.73.",
    "los": "calculate expected values, variances, and standard deviations and demonstrate their application to investment problems",
    "explanation_zh": "【知识点】Expected Value 与 Variance of a Discrete Random Variable。给定(概率,结果)配对为(0.20,35)、(0.30,50)、(0.50,80),概率之和为1。先算期望值 E(X)=0.20×35+0.30×50+0.50×80=7+15+40=62;再算方差 σ²(X)=0.20×(35−62)²+0.30×(50−62)²+0.50×(80−62)²=145.8+43.2+162=351;标准差为方差的平方根 σ=√351≈18.73,对应选项A。原文因OCR乱码把数字和符号打乱,但代入(概率,结果)重新计算后数值完全吻合。"
  },
  {
    "id": "imported-053",
    "stem_en": "A tree diagram contains the following information about the dividend per share  payable by a company under two scenarios:  Scenario  Probability of  Scenario  Dividend  per Share  Probability of  Dividend  Favorable  0.60  $2.00  0.80      $1.50  0.20  Unfavorable  0.40  $0.75  0.30      $0.50  0.70  The expected dividend per share under the favorable scenario is closest to:",
    "choices_en": [
      "A. $1.14.",
      "B. $1.37.",
      "C. $1.90."
    ],
    "answer": "C",
    "explanation_en": "Correct because the expected value of a random variable X given an event or scenario S is denoted E(x’ | S).\nSuppose the random variable X can take on any one of n distinct outcomes X,, Xs, ..., x, (these outcomes form\na set of mutually exclusive and exhaustive events). [he expected value of X conditional on S$ ts the first\noutcome, X,, times the probability of the first outcome given 5, P(X, | S), plus the second outcome, x3, times the\nprobability of the second outcome given S, P(X, | S$), and so forth. In our case, S = Favorable scenario, X, =\nDividend of $2.50, X> = Dividend of $1.50, PR | S) = 0.80, and P(X, | S) = 0.20. Thus, the expected dividend\ngiven the favorable scenario = (0.80 x $2.00) + (0.20 x $1.50) = $1.90.",
    "los": "formulate an investment problem as a probability tree and explain the use of conditional expectations in investment application",
    "explanation_zh": "【知识点】conditional expectation(条件期望)与tree diagram(树状图)。在「有利场景」这条分支下,股息为$2.00的条件概率是0.80,股息为$1.50的条件概率是0.20(两者之和为1)。条件期望 E(Dividend | Favorable)=0.80×$2.00+0.20×$1.50=$1.60+$0.30=$1.90,对应选项C。原文把$2.00误打成“$2.50”是OCR乱码,用给定的条件概率反推可确认真实股息应为$2.00才能得出题目本身的答案$1.90。"
  }
];
