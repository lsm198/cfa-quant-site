window.TOPIC_META = {
  "id": "regression",
  "title_zh": "简单线性回归",
  "title_en": "Simple Linear Regression",
  "essence_zh": "本质是用一条直线(regression line)去概括「一个变量(自变量 independent variable, X)怎么影响另一个变量(因变量 dependent variable, Y)」,并量化这条直线拟合得好不好、每个系数是否显著(significant)、以及给定一个新的 X 值时 Y 的预测区间(prediction interval)有多宽。核心工具是最小二乘法(least squares method,让残差平方和最小)来估计斜率(slope)和截距(intercept)。",
  "exam_pattern_zh": "常考:①用回归方程算预测值,并算预测区间(预测值 ± 临界值 critical value × 预测标准误)——预测区间比回归线本身的置信区间更宽,因为多了一层「个体预测」的不确定性;②残差(residual)的定义——是「观测值 − 回归线预测值」,不是和均值或「真实总体关系」的差;③回归假设(assumption)——残差应服从正态分布、方差齐性(homoskedasticity,不随 X 变化)、且和 X 不相关,看残差图是否呈现「随机无规律」是判断假设是否成立的方法;④ANOVA 分解:SST=SSR+SSE,标准误 SEE=√(SSE/(n−2)),F 检验(F-test)整体显著性、t 检验(t-test)单个系数显著性;⑤log-lin/lin-log/log-log 三种变量转换模型的辨析。",
  "vocabulary": [
    { "term_en": "dependent variable / explained variable", "meaning_zh": "因变量/被解释变量:回归想要解释和预测的那个变量,通常记为 Y", "example_en": "The dependent variable, also called the explained variable, is the variable a regression model is trying to predict." },
    { "term_en": "independent variable / explanatory variable", "meaning_zh": "自变量/解释变量:用来解释因变量变化的变量,通常记为 X", "example_en": "The independent variable, or explanatory variable, is used to explain variation in the dependent variable." },
    { "term_en": "residual", "meaning_zh": "残差:某个观测点因变量的实际观测值,减去用回归线算出的估计值", "example_en": "A residual is the difference between the observed value of a dependent variable and its estimated value using a fitted regression line based on the sample." },
    { "term_en": "standard error of the estimate (SEE)", "meaning_zh": "估计标准误:衡量实际观测值和回归线预测值之间平均偏离程度的指标", "example_en": "The standard error of the estimate is a measure of the distance between the observed values of the dependent variable and those predicted from the estimated regression." },
    { "term_en": "prediction interval", "meaning_zh": "预测区间:给定一个新 X 值,对相应 Y 值给出的一个不确定性区间,比回归线的置信区间更宽", "example_en": "A prediction interval is wider than a confidence interval for the regression line, because it also accounts for the uncertainty of an individual forecast." },
    { "term_en": "ANOVA (analysis of variance)", "meaning_zh": "方差分析:把因变量的总变异(SST)拆解成回归能解释的部分(SSR)和不能解释的残差部分(SSE)", "example_en": "Analysis of variance in a regression context decomposes the total variation in the dependent variable into the portion explained by the model and the portion left in the residuals." }
  ],
  "mnemonics": [
    { "title_zh": "SST = SSR + SSE", "content_zh": "总变异 = 回归解释的变异 + 残差(未解释)变异。SEE(估计标准误)= √[SSE/(n−2)],除数是「观测数减2」,因为估计了斜率和截距两个参数。" },
    { "title_zh": "残差三问", "content_zh": "看残差图问自己三件事:①是不是围绕 0 随机散布、没有规律?②方差是不是不随 X 变化(不是喇叭形)?③是不是大致服从正态分布?三个都满足,回归假设才成立。" }
  ],
  "concepts": [
    {
      "term_en": "Simple Linear Regression Model",
      "explain_zh": "用一条直线描述自变量 X 和因变量 Y 之间的关系,b0 是截距(intercept)、b1 是斜率(slope),通过最小二乘法(使残差平方和最小)估计得到。",
      "formula": "Y_i = b_0 + b_1 X_i + \\varepsilon_i"
    },
    {
      "term_en": "Standard Error of the Estimate (SEE)",
      "explain_zh": "衡量回归线拟合优劣的绝对指标(absolute measure of fit),数值越小说明观测点越贴近回归线。",
      "formula": "SEE = \\sqrt{\\frac{SSE}{n-2}}"
    },
    {
      "term_en": "Prediction Interval",
      "explain_zh": "给定一个新的自变量取值,对因变量给出的预测区间,考虑了预测本身的不确定性,比回归线的置信区间(confidence interval)更宽。",
      "formula": "\\hat{Y}_f \\pm (t_c \\times s_f)"
    }
  ],
  "analogies_zh": [
    { "title_zh": "用身高猜体重", "content_zh": "已知一群人的身高(X),想找一条直线去预测体重(Y)——回归就是「画出这条最贴合数据点的直线」,残差(residual)就是「每个人实际体重和这条直线预测值之间的差距」,拟合得越好,残差整体就越小。" }
  ],
  "connections": [
    { "topic_id": "probability-trees", "note_zh": "回归的拟合优度(R²)在简单线性回归中恰好等于自变量与因变量相关系数的平方。" },
    { "topic_id": "hypothesis-testing", "note_zh": "检验回归系数是否显著为 0,直接套用假设检验那节的 t 检验框架。" },
    { "topic_id": "big-data", "note_zh": "机器学习模型可以看作更复杂版本的回归——都是拟合一个函数去预测因变量,区别在于处理非线性、高维数据的能力,过拟合/欠拟合的问题也一脉相承。" }
  ],
  "flashcards": [
    { "front_en": "Residual definition", "back_zh": "观测值 Y − 用回归线算出的估计值 Ŷ(不是减均值)" },
    { "front_en": "SST = SSR + SSE", "back_zh": "总变异 = 回归解释的变异 + 残差变异" },
    { "front_en": "Standard Error of the Estimate", "back_zh": "SEE = √[SSE / (n−2)]" },
    { "front_en": "Prediction interval vs confidence interval", "back_zh": "预测区间比回归线的置信区间更宽,因为多了个体预测的不确定性" },
    { "front_en": "log-lin / lin-log / log-log", "back_zh": "log-lin: 只有Y取对数;lin-log: 只有X取对数;log-log: X和Y都取对数" }
  ]
};
