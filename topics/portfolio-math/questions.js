window.TOPIC_QUESTIONS = [
  {
    "id": "imported-019",
    "stem_en": "A portfolio manager will invest $100,000 and is presented with the following  information about three portfolios with normally distributed returns:  Expected Annual Return Standard Deviation of Returns  Portfolio  1  23%  Portfolio  2  12%  Portfolio  3  15%  If the manager wants to withdraw $5,000 in one year without invading initial  capital, the safety-first optimal portfolio is:",
    "choices_en": [
      "A. Portfolio 1.",
      "B. Portfolio 2.",
      "C. Portfolio 3."
    ],
    "answer": "C",
    "explanation_en": "Correct because if returns are normally distributed, the safety-first optimal portfolio maximizes the safety-first\nratio. SFRatio = [E(R,)— R,]/ o5, where ER is the expected portfollo return, R, is the investor's minimum\nacceptable return, and op is the standard deviation of portfolio returns. The minimum acceptable return is 5% (=\n€9,000 / €100,000) as the investor needs to withdraw €5,000 without invading initial capital: SFp; = (23% — 5%) /\n15% = 1.20; SFps = (12% — 5%) / 6% = 1.17; SFp3 = (15% — 5%) / 8% = 1.25. Therefore, Portfolio 3 is the satety-\nfirst optimal portfolio. “The portfolio for which EUR — R, is largest relative to standard deviation minimizes P(Rp =\nFi).",
    "los": "define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first critenon",
    "explanation_zh": "【知识点】Roy's Safety-First Ratio(SFRatio)。最低可接受收益 RL = 5000/100000 = 5%。SFRatio = (E(Rp) − RL) / σp:组合1 = (23%−5%)/15% ≈ 1.20;组合2 = (12%−5%)/6% ≈ 1.17;组合3 = (15%−5%)/8% = 1.25。SFRatio越大代表跌破门槛收益的概率越小、越安全,三者中组合3最大,故选C。"
  },
  {
    "id": "imported-032",
    "stem_en": "Roy's safety-first criterion:",
    "choices_en": [
      "A. evaluates only downside risk.",
      "B. uses semideviation as a risk measure.",
      "C. assumes asset prices are normally distributed."
    ],
    "answer": "A",
    "explanation_en": "Correct because mean—variance analysis generally considers risk symmetrically in the sense that standard\ndeviation captures variability both above and below the mean. An alternative approach evaluates only downside\nrisk. We discuss one such approach, safety-first rules, as it provides an excellent illustration of the application of\nnormal distnbution theory to practical investment problems. Safety-first rules focus on shortfall risk, the risk that\nportfolio value will fall below some minimum acceptable level over some time horizon. Roy's safety-tfirst criterion\nstates that the optimal portfolio minimizes the probability that portfolio return, Rp, falls below the threshold level,\nRi.",
    "los": "ma define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first criterion",
    "explanation_zh": "【知识点】Roy's safety-first criterion(shortfall risk)。均值-方差分析把标准差当作对称的风险指标,同时衡量高于和低于均值的波动;而safety-first准则只关心下行风险(downside risk),即组合收益跌破最低可接受水平RL的概率(shortfall risk)。它本身并不假设收益服从正态分布(正态假设只是让SFRatio的简便计算成立的常见前提),也不使用semideviation作为风险度量,所以B、C均不对,正确答案是A。"
  },
  {
    "id": "imported-049",
    "stem_en": "If the covariance between two positively correlated random variables remains the  same but the variance of both variables increases, the correlation between the two  variables.",
    "choices_en": [
      "A. decreases.",
      "B. stays the same.",
      "C. increases."
    ],
    "answer": "A",
    "explanation_en": "Correct because the correlation between two random variables, R; and A, is defined as p(Rj,R;) =\nCov(A;,))/[o(R)o(R)], where Cov denotes the covariance and o the standard deviation. Since the standard\ndeviation of each asset occurs in the denominator of the correlation formula, it is clear that, all else being equal,\nan increase in the variance (hence standard deviation) of either variable will decrease the correlation.",
    "los": "calculate and interpret the expected value, variance, standard deviation, covariances, and correlations of portfolio returns",
    "explanation_zh": "【知识点】Correlation Coefficient(相关系数)。ρ(Ri,Rj) = Cov(Ri,Rj) / [σ(Ri)σ(Rj)]。协方差保持不变,而分母中两个变量的标准差(方差的平方根)都增大,整个比值必然变小,所以相关系数会减小。容易误选C(增大)的人可能以为方差变大意味着两者共同变动更剧烈,但相关系数是协方差经过标准化后的结果,分母增大会拉低数值,正确答案是A。"
  },
  {
    "id": "imported-057",
    "stem_en": "An analyst produces the following joint probability function for the returns on  two companies, X and Y:    Return of Y    Return of Y=15%  Return of Y=10%  Return of Y=5%  Return of X=20%  0.2  0  0  Return of X=15%  0  0.4  0  Return of X=10%  0  0  0.4  The expected returns of companies X and Y are 14% and 9%, respectively. The  covariance of returns between X and Y (in percent squared) is closest to:",
    "choices_en": [
      "A. 0.",
      "B. 5.",
      "C. 14."
    ],
    "answer": "C",
    "explanation_en": "Correct because the formula for calculating the covariance between random variables R, and Res is Cov(Ry,Rs)\n= 22P(Rqi,Re MRai— El Ral Re; — El Rs).\nThe expected retum (given) for each company Is:\nE[R}4 = 0.2(20) + 0.4(15) + 0.4(10) =44+6+4= 14\nF[RY = 0.2(15) + 0.4(10) + 0.4/5) =3+44+27=9.\nHence, Cov(R,,,R,) = 0.2(20 — 14)(15 — 9) + 0.4(15 — 14)(10 — 9) + 0.4(10 — 14)(5 — 9) = 0.2(6)(6) + 0.4(1)(1) +\n0.4(4)\\(4) = 7.2+04+4+64= 14.",
    "los": "Calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns",
    "explanation_zh": "【知识点】Covariance(Joint Probability Function),即由联合概率分布计算协方差:Cov(Ri,Rj) = ΣP(Ri,Rj)[Ri−E(Ri)][Rj−E(Rj)]。先核对期望值:E(X)=0.2×20+0.4×15+0.4×10=14%,E(Y)=0.2×15+0.4×10+0.4×5=9%,与题目给定一致。代入协方差公式:0.2×(20−14)(15−9)+0.4×(15−14)(10−9)+0.4×(10−14)(5−9)=0.2×36+0.4×1+0.4×16=7.2+0.4+6.4=14,故答案为C。"
  },
  {
    "id": "imported-062",
    "stem_en": "An equally weighted portfolio consists of two securities, each with a standard  deviation of 3%. If the two securities' returns are uncorrelated, the portfolio's  standard deviation is closest to:",
    "choices_en": [
      "A. 0.0%.",
      "B. 2.1%.",
      "C. 3.0%."
    ],
    "answer": "B",
    "explanation_en": "Correct because the portfolio standard deviation is 2.1%:\n4f(0-5)°3)? + (0.5)°(3)? + 2(0.5(0.5)(3)(3)(0) = V4.5\nor 2.12%, using the formula\n{oe = ,|w,'o; + wy; + 2u,w,CovwR, .R,).\nwhere the Cov(R,,R5) =\nOCR, Ay)oLK )o(X,)\n,Which is equal to zero because the funds are uncorrelated;\nOCR, Ry) =0.",
    "los": "Calculate and interpret the expected value, variance, standard deviation, covanances, and correlations of portfolio returns",
    "explanation_zh": "【知识点】Two-Asset Portfolio Variance(两资产组合方差),σp² = w1²σ1² + w2²σ2² + 2w1w2Cov(R1,R2)。两证券等权(各50%)且不相关,Cov=0,交叉项消失:σp² = (0.5)²(3%)² + (0.5)²(3%)² = 2.25 + 2.25 = 4.5(%²),σp = √4.5 ≈ 2.12%,最接近2.1%,故选B。若误以为不相关时组合标准差仍等于单个证券的3%(选C),就忽略了分散化能降低波动这一核心结论。"
  }
];
