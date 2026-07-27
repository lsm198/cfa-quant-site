window.TOPIC_META = {
  "id": "probability-trees",
  "title_zh": "概率树与条件期望",
  "title_en": "Probability Trees and Conditional Expectations",
  "essence_zh": "本质是把「分阶段发生的不确定性」(uncertainty)画成一棵树(tree diagram),再算每条路径的联合概率(joint probability)和条件期望(conditional expectation)——先发生场景 A,再在 A 的条件下发生结果 B,把「发生了 A 之后 B 的期望值是多少」这类问题结构化地算出来。这一节也顺带覆盖协方差(covariance)/相关系数(correlation coefficient),因为它们描述的同样是「两个随机变量之间」的联合关系,思路相通。",
  "exam_pattern_zh": "常考:①辨认适合用树状图(tree diagram)表示的问题(分阶段的场景+概率);②用条件概率算「条件期望」(比如「在有利场景下」的期望股息);③计算离散随机变量(discrete random variable)的期望值(expected value)/方差/标准差(给一张概率-结果对照表,直接套 E(X)=ΣP·X);④协方差/相关系数的计算和性质辨析——常见坑点是「相关系数只衡量线性关系(linear relationship)」「协方差不变时方差增大会让相关系数变小」这类概念题,以及给联合概率表算协方差。",
  "vocabulary": [
    { "term_en": "tree diagram", "meaning_zh": "树状图:把分阶段发生的场景和对应概率画成树形结构,常用来算条件期望", "example_en": "A tree diagram organizes multi-stage scenarios and their branch probabilities so that joint outcomes can be calculated systematically." },
    { "term_en": "conditional expectation", "meaning_zh": "条件期望:在已知某个场景/事件发生的前提下,随机变量的期望值 E(X|S)", "example_en": "The expected value of a random variable X given that a particular scenario S has occurred is called the conditional expectation of X, denoted E(X | S)." },
    { "term_en": "joint probability", "meaning_zh": "联合概率:两个随机变量同时取某组特定值的概率", "example_en": "A joint probability function specifies the probability that two random variables simultaneously take specific values." },
    { "term_en": "covariance", "meaning_zh": "协方差:衡量两个随机变量共同变化方向和程度的指标,可正可负,量纲是两个变量单位的乘积", "example_en": "Covariance measures the extent to which two random variables move together, and its sign indicates the direction of that relationship." },
    { "term_en": "correlation coefficient", "meaning_zh": "相关系数 = 协方差/(两者标准差乘积),取值[-1,1],只衡量线性关系强弱", "example_en": "Correlation standardizes covariance by the product of the two variables' standard deviations, which is why it always falls between -1 and 1." }
  ],
  "mnemonics": [
    { "title_zh": "条件期望三步走", "content_zh": "①确定条件场景 S 发生的概率;②列出 S 发生条件下各结果的条件概率;③用条件概率对结果加权求和,E(X|S)=ΣP(结果|S)×结果,不要和无条件的期望值 E(X) 混。" },
    { "title_zh": "相关系数为什么有界", "content_zh": "相关系数 = 协方差 ➗ (两个标准差相乘),分母天生比分子「大」,所以结果被死死限制在 [-1,1] 之间——协方差没有这个上下限,相关系数才有。" }
  ],
  "concepts": [
    {
      "term_en": "Expected Value of a Discrete Random Variable",
      "explain_zh": "把每个可能结果乘以其发生概率(probability)再相加,得到该随机变量的「平均预期结果」。",
      "formula": "E(X) = \\sum_{i=1}^{n} P(X_i) X_i"
    },
    {
      "term_en": "Variance of a Discrete Random Variable",
      "explain_zh": "衡量结果偏离期望值的概率加权平方和,反映不确定性/风险大小。",
      "formula": "\\sigma^2(X) = \\sum_{i=1}^{n} P(X_i)[X_i - E(X)]^2"
    },
    {
      "term_en": "Covariance",
      "explain_zh": "衡量两个随机变量共同偏离各自均值的加权乘积之和,正值说明同向变动,负值说明反向变动。",
      "formula": "Cov(R_i, R_j) = \\sum P(R_i, R_j)[R_i - E(R_i)][R_j - E(R_j)]"
    },
    {
      "term_en": "Correlation Coefficient",
      "explain_zh": "把协方差按两个变量各自的波动幅度标准化(standardize),得到一个不受量纲影响、取值在[-1,1]之间的线性相关强度指标。",
      "formula": "\\rho(R_i, R_j) = \\frac{Cov(R_i, R_j)}{\\sigma(R_i)\\sigma(R_j)}"
    },
    {
      "term_en": "Scatter Plot",
      "explain_zh": "散点图:把两个数值变量的每对观测值画成坐标平面上的点,点的分布形态可以直观展示两者是否存在线性关系及相关系数的方向与强弱,是解读相关系数最常用的可视化工具。"
    }
  ],
  "analogies_zh": [
    { "title_zh": "条件期望就像天气预报", "content_zh": "「如果明天下雨,你打伞出门的概率是90%」——这就是条件期望的直觉:先锁定一个「条件」(明天下雨),再算这个条件下的期望行为(打伞概率),而不是不分青红皂白地算「所有天气下」打伞的平均概率。" }
  ],
  "connections": [
    { "topic_id": "stats-returns", "note_zh": "从「一组已观察到的收益率」的描述统计,延伸到「尚未发生的不确定结果」的概率分布与期望值。" },
    { "topic_id": "portfolio-math", "note_zh": "这里定义的协方差,是组合方差公式里那个「交叉项」的直接来源。" },
    { "topic_id": "regression", "note_zh": "这里的相关系数会在「简单线性回归」里被用来解释拟合优度(R²),两者本质是同一个线性关系强度的不同表达。" }
  ],
  "flashcards": [
    { "front_en": "Expected value E(X)", "back_zh": "E(X) = Σ P(Xi) × Xi" },
    { "front_en": "Conditional expectation E(X|S)", "back_zh": "在场景 S 发生的条件下,对各结果按条件概率加权求和" },
    { "front_en": "Correlation Coefficient formula", "back_zh": "ρ = Cov(Ri,Rj) / [σ(Ri)×σ(Rj)],范围恒为 [-1,1]" },
    { "front_en": "Covariance unchanged, variance ↑", "back_zh": "协方差不变时,任一变量方差增大 ⟹ 相关系数变小(分母变大)" },
    { "front_en": "Variance of a discrete random variable", "back_zh": "σ²(X)=ΣP(Xi)[Xi−E(X)]²,先求期望值E(X)再算概率加权离差平方和" },
    { "front_en": "Scatter plot use case", "back_zh": "展示两个数值变量联合分布最直观的可视化工具,用于判断相关系数的方向与强弱" },
    { "front_en": "Tree diagram use case", "back_zh": "适合展示分阶段、离散型不确定性场景(如多层情景+条件概率);区别于tree-map(层级占比图)和概率密度函数(连续变量)" }
  ]
};
