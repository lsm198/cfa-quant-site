# Plan: Flashcard Coverage & Explanation Completeness

Spec: `docs/superpowers/specs/2026-07-27-flashcard-coverage-design.md`

## Global Constraints

- Only edit `meta.js` `flashcards[]` arrays (append new entries) and, in
  Task 4, one `explanation_zh` string in `tvm/questions.js`.
- Do not touch `js/flashcard.js`, `js/review.js`, `js/progress.js`, or any
  other application code.
- Do not change question stems, choices, or answers.
- New flashcard entries: `{ "front_en": "...", "back_zh": "..." }`,
  appended to the end of the topic's existing `flashcards` array (preserve
  the array's existing entries and order, just add new ones after them).
  `front_en` is a short English concept name/prompt; `back_zh` is a
  concise Chinese formula/fact, matching the style of existing entries in
  that file.
- After each task: run the full test suite
  (`node tests/progress.test.js && node tests/tvm-math.test.js && node
  tests/import-quant-questions.test.js`, or however `tests/` scripts are
  invoked — check for an npm script first) and confirm it still passes
  (34/34 as of the last commit on `main`). These are pure JSON-like data
  edits; the test suite is a regression guard only (nothing in it directly
  reads `flashcards[]`), so passing means "nothing else broke."
- Each task also requires a manual JSON-shape sanity check: the edited
  `meta.js` file must remain valid JS (no trailing commas that break older
  patterns, matching quote style) — verify by loading it with Node
  (`node -e "global.window={}; require('./topics/<id>/meta.js')"` will not
  work directly since it's a browser global-assignment script; instead use
  `node -e "const window={}; eval(require('fs').readFileSync('topics/<id>/meta.js','utf8')); console.log(window.TOPIC_META.flashcards.length)"`
  to confirm it parses and the array length is as expected).

## Task 1: big-data, hypothesis-testing, portfolio-math

Add to `topics/big-data/meta.js` `flashcards[]` (append after existing entries):
```json
{ "front_en": "Algorithmic trading & HFT", "back_zh": "依赖低延迟网络(low-latency network)执行,常将大额机构订单拆分成多笔小单分散执行以降低单笔规模" },
{ "front_en": "NLP in investment management", "back_zh": "用于监测分析师评论中的情绪变化,可能早于分析师正式调整买入/持有/卖出评级" },
{ "front_en": "Fintech (broad definition)", "back_zh": "金融服务/产品在设计与交付方式上的技术驱动型创新,涵盖大数据、AI、区块链等应用" }
```

Add to `topics/hypothesis-testing/meta.js` `flashcards[]`:
```json
{ "front_en": "Independent-samples t-test (equal variances)", "back_zh": "t=[(X̄1−X̄2)−(μ1−μ2)]/√(Sp²/n1+Sp²/n2), df=n1+n2−2;改变假设的均值差只影响t统计量,不影响df或联合方差Sp²" }
```

Add to `topics/portfolio-math/meta.js` `flashcards[]`:
```json
{ "front_en": "Roy's safety-first criterion", "back_zh": "只关注下行风险(downside risk),不假设正态分布、不使用semideviation,聚焦跌破最低门槛收益的概率(shortfall risk)" },
{ "front_en": "Correlation & variance relationship", "back_zh": "协方差不变时,任一变量方差(标准差)增大 ⟹ 相关系数减小" },
{ "front_en": "Covariance via joint probability", "back_zh": "Cov(Ri,Rj)=ΣP(Ri,Rj)[Ri−E(Ri)][Rj−E(Rj)],对每种联合结果按概率加权求和" }
```

Verify: `node -e "const window={}; eval(require('fs').readFileSync('topics/big-data/meta.js','utf8')); console.log(window.TOPIC_META.flashcards.length)"` prints `8` (was 5). Same pattern for `hypothesis-testing` (expect `6`, was 5) and `portfolio-math` (expect `6`, was 3). Run full test suite, confirm 34/34.

Commit message: "Add missing flashcards for big-data, hypothesis-testing, portfolio-math"

## Task 2: probability-trees, rates-returns

Add to `topics/probability-trees/meta.js` `flashcards[]`:
```json
{ "front_en": "Variance of a discrete random variable", "back_zh": "σ²(X)=ΣP(Xi)[Xi−E(X)]²,先求期望值E(X)再算概率加权离差平方和" },
{ "front_en": "Scatter plot use case", "back_zh": "展示两个数值变量联合分布最直观的可视化工具,用于判断相关系数的方向与强弱" },
{ "front_en": "Tree diagram use case", "back_zh": "适合展示分阶段、离散型不确定性场景(如多层情景+条件概率);区别于tree-map(层级占比图)和概率密度函数(连续变量)" }
```

Add to `topics/rates-returns/meta.js` `flashcards[]`:
```json
{ "front_en": "Opportunity cost", "back_zh": "放弃次优可比选项而损失的收益,如同等期限/风险的定存中利率差额" },
{ "front_en": "Continuously compounded return", "back_zh": "r=ln(1+HPR);两种复利方式EAR相等时可互相换算,如e^r−1=EAR" },
{ "front_en": "Real risk-free rate", "back_zh": "反映个人对现在消费与未来消费的时间偏好(time preference),是名义无风险利率的基础组成部分" },
{ "front_en": "Arithmetic vs Geometric vs Harmonic Mean", "back_zh": "非负且不全相等的数据恒有:算术平均数≥几何平均数≥调和平均数;定期定额投资的平均成本用调和平均数" },
{ "front_en": "Compounding frequency formula", "back_zh": "FV=PV×(1+r/m)^(m×N),m为每年复利次数,把年利率和年数换算成每期利率和总期数" }
```

Verify: `probability-trees` flashcards length expect `7` (was 4). `rates-returns` expect `9` (was 4). Run full test suite, confirm 34/34.

Commit message: "Add missing flashcards for probability-trees, rates-returns"

## Task 3: regression, sampling-estimation

Add to `topics/regression/meta.js` `flashcards[]`:
```json
{ "front_en": "F-test for overall significance", "back_zh": "简单线性回归中检验H0: b1=0 vs Ha: b1≠0,F=MSR/MSE" },
{ "front_en": "Simple linear regression assumptions", "back_zh": "X与Y线性相关、残差期望为0、残差方差不变(同方差性)、残差不相关且服从正态分布;残差图应随机无规律" },
{ "front_en": "Dependent vs independent variable", "back_zh": "被解释的变量(Y)=因变量/explained variable;用来解释Y的变量(X)=自变量/explanatory variable" },
{ "front_en": "Prediction interval formula", "back_zh": "Ŷf=b0+b1Xf,预测区间=Ŷf±tc×sf;SEE越大,sf越大,区间越宽" }
```

Add to `topics/sampling-estimation/meta.js` `flashcards[]`:
```json
{ "front_en": "Convenience / judgmental sampling", "back_zh": "非概率抽样,依赖抽样者判断或取样便利性,代表性通常比概率抽样差" },
{ "front_en": "Sampling error definition", "back_zh": "统计量的观测值与其所要估计的真实总体参数之间的差,不是置信区间公式的一项" }
```

Verify: `regression` flashcards length expect `9` (was 5). `sampling-estimation` expect `7` (was 5). Run full test suite, confirm 34/34.

Commit message: "Add missing flashcards for regression, sampling-estimation"

## Task 4: stats-returns flashcards + tvm explanation fix

Add to `topics/stats-returns/meta.js` `flashcards[]`:
```json
{ "front_en": "Interquartile Range (IQR)", "back_zh": "IQR=Q3−Q1,衡量中间50%数据的离散程度,不受极端值影响" },
{ "front_en": "Quantile location formula", "back_zh": "Ly=(n+1)×(y/100);若不是整数,在相邻两观测值间线性插值" },
{ "front_en": "Target downside deviation", "back_zh": "只对低于目标收益率B的观测值算偏差平方,分母仍用(n−1):√[Σ(Xi−B)²/(n−1)], Xi≤B" },
{ "front_en": "Mean Absolute Deviation (MAD)", "back_zh": "MAD=Σ|Xi−X̄|/n;比标准差小(标准差因取平方而放大极端值的影响)" },
{ "front_en": "Trimmed mean vs winsorized mean", "back_zh": "截尾均值:剔除两端极端值后取算术平均;缩尾均值:不剔除,而是替换为临界值再求均值" },
{ "front_en": "Lognormal distribution properties", "back_zh": "以0为下界(不能为负)、右偏(非对称),且均值不等于对应正态分布的均值" },
{ "front_en": "Skewness: tail & economic meaning", "back_zh": "左尾长=负偏,右尾长=正偏;均值为0的负偏分布代表「常见小赚、偶尔巨亏」" }
```

Verify: `stats-returns` flashcards length expect `11` (was 4).

Also fix `topics/tvm/questions.js` question `imported-031`'s `explanation_zh`:
read the current field first (it currently leads with a 【知识点】 tag naming
only the annuity-due adjustment). Rewrite the leading tag/sentence so it
names BOTH concepts the question needs — the ordinary-annuity PV formula
AND the annuity-due adjustment — e.g. change the opening to something like
`【知识点】Present Value of an Ordinary Annuity + 期初年金(annuity due)现值调整`
and, if the existing body doesn't already make explicit that Option 2's PV
is computed via the standard ordinary-annuity formula before any
adjustment, add one clause doing so. Keep the rest of the explanation's
reasoning and answer intact — this is a tagging/completeness fix, not a
rewrite of the solution logic.

Run full test suite, confirm 34/34.

Commit message: "Add missing stats-returns flashcards; broaden tvm imported-031 explanation tag"

## Final Verification (after Task 4)

- Run the full test suite one more time.
- Spot check: total flashcard count across all topics should now be
  45 + 3 + 1 + 3 + 3 + 5 + 4 + 2 + 7 = 73.
- Confirm no `questions.js` file other than `tvm/questions.js` was touched,
  and that `tvm/questions.js`'s only change is within `imported-031`'s
  `explanation_zh` field (stem/choices/answer/explanation_en/los untouched).
