window.TOPIC_QUESTIONS = [
  {
    "id": "imported-002",
    "stem_en": "An analyst performs a simple linear regression of a stock's monthly return on the  monthly return of a market index (both in %) and gathers the following  information:  Estimated slope  1.0  Estimated intercept  1.2%  Standard error of the forecast  1.4%  Critical t-values at a 5% significance level ±2.032  The 95% prediction interval for the stock's monthly return, given that the  forecasted monthly return on the index is 3.5%, is closest to:",
    "choices_en": [
      "A. 0.7% to 6.3%.",
      "B. 1.9% to 7.5%.",
      "C. 3.3% to 6.1%."
    ],
    "answer": "B",
    "explanation_en": "Correct because a forecasted value of the dependent vaniable, Yf is determined using the estimated intercept\nand slope, as well as the expected or forecasted independent vanable, X; Yr= 5) + b,x; where by, and 6, are\nthe estimated intercept and slope coefficients, respectively. Hence, ¥Yf= 1.2% + 1.0 x 3.5% =4 7%.\nNext, the prediction interval is Yf+ fortiea zor gS, Where s;denotes the standard error of the forecast. Hence, the\nprediction interval is given by: 4./% + 1.4% x 2.032 = (1.9%, 7.5%).",
    "los": "calculate and interpret the predicted value for the dependent vaniable, and a prediction interval for it, given an estimated linear regression model and a value for the independent variable",
    "explanation_zh": "【知识点】Prediction Interval。先算预测值:Ŷf = b0 + b1×Xf = 1.2% + 1.0×3.5% = 4.7%。再算预测区间:Ŷf ± tc×sf = 4.7% ± 2.032×1.4% = 4.7% ± 2.845%,约为(1.9%, 7.5%),对应B。注意区间宽度用的是「预测标准误 sf」,不是SEE本身。"
  },
  {
    "id": "imported-020",
    "stem_en": "Which of the following best describes when a transformation of the data may be  needed to enable the use of a simple linear regression model? When the:",
    "choices_en": [
      "A. dependent variable is non-normally distributed.",
      "B. pairs of the dependent and independent variables are uncorrelated with one  another.",
      "C. relationship between the independent variable and the dependent variable is  non-linear."
    ],
    "answer": "C",
    "explanation_en": "Correct because if the relationship between the independent variable and the dependent vanable is not linear,\nwe can offen transform one or both of these variables to convert this relation to a linear form, which then allows\nthe use of simple linear regression.",
    "los": "describe different functional forms of simple linear regressions",
    "explanation_zh": "【知识点】Functional Forms: log-lin / lin-log / log-log。简单线性回归要求X与Y近似线性关系;当两者本质上是非线性关系(如指数增长、乘数效应)时,可对X和/或Y取自然对数做变量转换,使转换后的关系线性化,从而仍可用OLS估计。选项A(非正态)和B(不相关)都不是需要变量转换的典型触发条件,正确答案为C。"
  },
  {
    "id": "imported-023",
    "stem_en": "An analyst estimates the following information from a simple linear regression:  Sum of squares error  280  Sum of squares regression  25  Number of paired observations  30  The standard error of the estimate is closest to:",
    "choices_en": [
      "A. 2.5.",
      "B. 3.2.",
      "C. 10.0."
    ],
    "answer": "B",
    "explanation_en": "Correct because it is the standard error of the estimate calculated as the square root of the mean square error.\n(10)°\" = 3.2. The mean square error (MSE) is calculated as SSE / (n— 2); 280 / (30 — 2) = 10.0, where SSE is\nthe sum of squares error.",
    "los": "» describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression",
    "explanation_zh": "【知识点】Standard Error of the Estimate (SEE)。SEE = √[SSE/(n−2)] = √[280/(30−2)] = √(280/28) = √10 ≈ 3.16,最接近3.2,对应B。SSR=25在此题中是干扰项,只有在计算SST(=SSR+SSE)或R²时才用得到。"
  },
  {
    "id": "imported-027",
    "stem_en": "The null hypothesis for the F-distributed test statistic in a simple linear regression  model tests whether the:",
    "choices_en": [
      "A. slope is equal to zero.",
      "B. intercept is equal to zero.",
      "C. slope is not equal to zero."
    ],
    "answer": "A",
    "explanation_en": "Correct because in regression analysis, we can use an F-distributed test statistic to test whether the slopes ina\nregression are equal to zero, with the slopes designated as b,;, against the alternative hypothesis that at least\none slope ts not equal to zero for simple linear regression, these hypotheses simplify to Hy: b, = 0. A: by + 0.",
    "los": "calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression",
    "explanation_zh": "【知识点】F-test for Overall Significance。F检验用于检验回归系数(斜率)整体上是否显著不为0。简单线性回归只有一个自变量,原假设为H0: b1=0,备择假设为Ha: b1≠0。选项C描述的是备择假设而非原假设,是常见干扰项;选项B(截距为0)不是F检验的对象。正确答案为A。"
  },
  {
    "id": "imported-044",
    "stem_en": "The standard error of the estimate in a simple linear regression is best described  as:",
    "choices_en": [
      "A. a relative measure off it for the regression.",
      "B. the percentage of the variation of the dependent variable that is explained by  the independent variable.",
      "C. a measure of the distance between the observed values of the dependent  variable and those predicted from the estimated regression."
    ],
    "answer": "C",
    "explanation_en": "Correct because the standard error of the estimate is a measure of the distance between the observed\nvalues of the dependent vanable and those predicted from the estimated regression.",
    "los": "describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression",
    "explanation_zh": "【知识点】Standard Error of the Estimate (SEE)。SEE衡量的是实际观测值与回归线预测值之间的平均偏离程度,数值越小说明拟合越好,属于「绝对」拟合度量而非相对度量(排除A);描述因变量变异被解释比例的是R²而非SEE(排除B)。正确答案为C。"
  },
  {
    "id": "imported-056",
    "stem_en": "The simple linear regression model in which only the independent variable is in  logarithmic form is best described as the.",
    "choices_en": [
      "A. log-lin model.",
      "B. lin-log model.",
      "C. log-log model"
    ],
    "answer": "B",
    "explanation_en": "Correct because the lin-log model is similar to the log-lin model, but only the independent variable is in\nlogarithmic form.",
    "los": "describe different functional forms of simple linear regressions",
    "explanation_zh": "【知识点】Functional Forms: log-lin / lin-log / log-log。仅自变量X取自然对数、因变量Y保持原始线性形式的模型是lin-log模型:Y=b0+b1·ln(X)。log-lin模型是仅Y取对数(lnY=b0+b1X);log-log模型是X、Y都取对数。题目描述\"只有自变量是对数形式\",对应lin-log,正确答案为B。"
  },
  {
    "id": "imported-065",
    "stem_en": "All else being equal, which of the following would most likely lead to a wider  prediction interval for the dependent variable when re-estimating a linear  regression model? An increase in the:",
    "choices_en": [
      "A. sample size.",
      "B. level of significance.",
      "C. standard error of the estimate."
    ],
    "answer": "C",
    "explanation_en": "Correct because the prediction interval is equal to the predicted value of the dependent variable plus/minus the\ncritical E-value times the standard error of the forecast. The better the fit of the regression model, the smaller the\nstandard error of the estimate (s.) and, therefore, the smaller standard error of the forecast. When the standard\nerror of the estimate increases, the standard error of the forecast will increase, which will lead to a wider\nprediction interval if holding other things constant.",
    "los": "Calculate and interpret the predicted value for the dependent variable, and a prediction interval for it, given an estimated linear regression model and a value for the independent vanable",
    "explanation_zh": "【知识点】Prediction Interval。预测区间 = Ŷf ± tc×sf,其中预测标准误sf由SEE(标准误)决定:SEE越大,sf越大,区间越宽。样本量增大(A)通常使sf变小、区间变窄;显著性水平提高(B)会使临界t值变小,区间也变窄。只有SEE增大(C)会扩大预测区间,正确答案为C。"
  },
  {
    "id": "imported-068",
    "stem_en": "With respect to simple linear regression, a residual is best described as the  difference between the observed value of a dependent variable and:",
    "choices_en": [
      "A. its mean.",
      "B. its estimated value using a fitted regression line based on the sample.",
      "C. its expected value based on the true underlying population relationship."
    ],
    "answer": "B",
    "explanation_en": "Correct because the residual for the *\" observation, el, is how much the observed value of Y, differs from the\nestimated [value] using the regression line. Further, the residual refers to the fitted linear relation based on the\nsample.",
    "los": "describe a simple linear regression model, how the least squares criterion is used to estimate regression coefficients, and the interpretation of these coefficients",
    "explanation_zh": "【知识点】residual。残差(residual)定义为某观测点因变量的实际观测值,减去用样本拟合的回归线算出的估计值,即 e_i = Y_i − Ŷ_i,而不是减去均值(A),也不是减去\"真实总体关系\"下的期望值(C,那是随机误差项ε,不是残差)。正确答案为B。"
  },
  {
    "id": "imported-076",
    "stem_en": "In simple linear regression analysis, the total sum of squares best describes:",
    "choices_en": [
      "A. a scatter plot.",
      "B. the variation of the dependent variable.",
      "C. a paired observation between variables."
    ],
    "answer": "B",
    "explanation_en": "Correct because the variation of Y (the dependent variable) is often referred to as the sum of squares total\n(SST), or the total sum of squares.",
    "los": "describe a simple linear regression model, how the least squares criterion is used fo estimate regression coefficients, and the interpretation of these coefficients",
    "explanation_zh": "【知识点】ANOVA (analysis of variance)。总平方和(SST, sum of squares total)衡量的是因变量Y自身的总变异程度,与散点图(A)或某一对观测值(C)无关。SST可分解为回归解释的部分SSR与残差未解释的部分SSE,即SST=SSR+SSE。正确答案为B。"
  },
  {
    "id": "imported-080",
    "stem_en": "Which of the following is an underlying assumption of the simple linear  regression model? The regression residuals:",
    "choices_en": [
      "A. are normally distributed.",
      "B. have high correlations across observations.",
      "C. have different variances across observations."
    ],
    "answer": "A",
    "explanation_en": "Correct because one of the four key assumptions we need to make to be able to draw valid conclusions from a\nsimple linear regression mode is that regression residuals are normally distributed.",
    "los": "explain the assumptions underlying the simple linear regression model, and describe how residuals and residual plots indicate if these assumptions may have been violated",
    "explanation_zh": "【知识点】Assumptions of the Simple Linear Regression Model。简单线性回归的关键假设之一是残差服从正态分布,以便用t检验、F检验做统计推断。残差之间应相互独立、不应高度相关(排除B),且方差应保持不变、不应随观测值系统性变化(排除C,即违反同方差性homoskedasticity假设)。正确答案为A。"
  },
  {
    "id": "imported-084",
    "stem_en": "An analyst runs a simple linear regression to test whether the variation in the  demand for corn explains the variation in the supply of wheat. In this model, the  supply of wheat is a(n):",
    "choices_en": [
      "A. indicator variable.",
      "B. explained variable.",
      "C. independent variable."
    ],
    "answer": "B",
    "explanation_en": "Correct because variation in the demand for corn is being used to explain the variation in the supply of\nwheat. Therefore the variation in the supply of wheat is the dependent vaniable, or explained variable. We refer\nto the vanable whose variation is being explained as the dependent variable, or the explained vanable; It is\ntypically denoted by ¥",
    "los": "describe a simple linear regression model, how the least squares criterion is used to estimate regression coefficients, and the interpretation of these coefficients",
    "explanation_zh": "【知识点】dependent variable / explained variable。题目用玉米需求量的变动去解释小麦供给量的变动,因此\"小麦供给量\"是被解释的那个对象,即因变量(dependent variable),也称被解释变量(explained variable);\"玉米需求量\"才是自变量。正确答案为B。"
  },
  {
    "id": "imported-086",
    "stem_en": "If the relationship between the dependent variable and independent variable is  linear, the regression residuals when plotted against the independent value should  appear to:",
    "choices_en": [
      "A. be linear.",
      "B. be random.",
      "C. follow a pattern."
    ],
    "answer": "B",
    "explanation_en": "Correct because when we look at the residuals of a model, what we would like to see Is that the residuals are\nrandom. The residuals should not exhibit a pattern when plotted against the independent variable.",
    "los": "explain the assumptions underlying the simple linear regression model, and describe how residuals and residual plots indicate if these assumptions may have been violated",
    "explanation_zh": "【知识点】Assumptions of the Simple Linear Regression Model。若X与Y确实是线性关系,残差图(残差对X作图)应呈现随机、无规律的散布,围绕0上下波动,不应出现随X变化的系统性形态(如喇叭形或曲线形)。这是判断线性假设与同方差性假设是否成立的直观方法,正确答案为B。"
  }
];
