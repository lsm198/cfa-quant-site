window.TOPIC_META = {
  "id": "hypothesis-testing",
  "title_zh": "假设检验",
  "title_en": "Hypothesis Testing",
  "essence_zh": "本质是一套「先假设、再用样本数据证伪」(falsification)的判断流程——先设一个「零假设」(null hypothesis, H0,通常是我们想推翻的、代表现状/无差异的命题),再看样本数据在零假设成立的前提下有多「反常」,反常到一定程度就拒绝零假设(reject the null),否则就不拒绝(fail to reject)。这一节要掌握假设怎么设、用什么检验统计量(test statistic)检验、以及检验可能犯的两类错误(Type I error / Type II error)。",
  "exam_pattern_zh": "常考:①根据题目里「怀疑/期望」的方向正确写出备择假设(alternative hypothesis, Ha,比如怀疑均值>0,备择假设就是 μ>0,零假设永远取等号那一边);②根据数据类型(配对/独立样本、方差已知/未知、方差是否相等)选对检验统计量(t/F/卡方 chi-square);③Type I/II 错误和检验功效(power of a test)的定义与相互关系——「power = 1 − P(Type II error)」「正确拒绝错误的零假设」这两句几乎是必考的定义题;④配对样本 t 检验的自由度(degrees of freedom)是 n−1(n 是「对」数,不是总观测数)。",
  "vocabulary": [
    { "term_en": "null hypothesis (H0)", "meaning_zh": "零假设:检验的对象,通常取等号,代表「无差异/现状」", "example_en": "We always conduct a test of the null hypothesis at the point of equality." },
    { "term_en": "alternative hypothesis (Ha)", "meaning_zh": "备择假设:研究者真正怀疑/想证明的命题,和零假设互斥", "example_en": "To test whether a population's mean is greater than zero, the alternative hypothesis should be formulated as μ > 0." },
    { "term_en": "Type I error", "meaning_zh": "第一类错误:零假设为真却被错误拒绝,犯错概率等于显著性水平 α", "example_en": "Rejecting a true null hypothesis is best described as a Type I error." },
    { "term_en": "Type II error", "meaning_zh": "第二类错误:零假设为假却未被拒绝", "example_en": "Failure to reject a false null hypothesis is best described as a Type II error." },
    { "term_en": "power of a test", "meaning_zh": "检验功效 = 1 − P(第二类错误) = 正确拒绝一个为假的零假设的概率", "example_en": "The probability of correctly rejecting a null hypothesis is best defined as the power of the test." },
    { "term_en": "degrees of freedom", "meaning_zh": "自由度:配对 t 检验用 n−1(n 为配对个数),两独立样本 t 检验用 n1+n2−2", "example_en": "For 30 paired monthly return observations, the t-test for the mean difference has 29 degrees of freedom." }
  ],
  "mnemonics": [
    { "title_zh": "备择假设怎么写", "content_zh": "「怀疑/希望」的那句话就是备择假设 Ha,零假设 H0 永远是它的对立面并且取等号。比如怀疑「均值大于0」,Ha: μ>0,H0: μ≤0(检验时在等号 μ=0 处进行)。" },
    { "title_zh": "两类错误对照表", "content_zh": "拒绝真H0 = Type I(误杀好人,概率=α);不拒绝假H0 = Type II(放过坏人,概率=β);power = 1−β = 正确抓到坏人的概率。" }
  ],
  "concepts": [
    {
      "term_en": "t-test for Mean Differences (Paired Samples)",
      "explain_zh": "配对样本检验均值差异是否为0,自由度为配对个数减一。",
      "formula": "t = \\frac{\\bar{d} - \\mu_{d0}}{s_{\\bar{d}}}, \\quad df = n-1"
    },
    {
      "term_en": "Power of a Test",
      "explain_zh": "检验功效衡量正确识别出「零假设确实为假」这一情形的能力(ability),数值越高越好。",
      "formula": "\\text{Power} = 1 - P(\\text{Type II error})"
    }
  ],
  "analogies_zh": [
    { "title_zh": "假设检验就像法庭审判", "content_zh": "零假设 H0 就像「被告无罪」的默认立场——除非证据(样本数据)强到「排除合理怀疑」,否则不会推翻它。这就是为什么假设检验的逻辑是「证伪」而不是「证实」:我们从不直接证明 H0 是对的,只能说证据不足以推翻它。" }
  ],
  "connections": [
    { "topic_id": "sampling-estimation", "note_zh": "假设检验和置信区间共用同一套抽样分布理论,只是一个用来「做决策」,一个用来「给区间」。" },
    { "topic_id": "tests-independence", "note_zh": "参数检验(t 检验)是假设检验的主体,非参数检验是数据不满足分布假设时的替代方案。" },
    { "topic_id": "regression", "note_zh": "回归系数的显著性检验,本质就是把这里学的 t 检验直接套在回归系数上。" }
  ],
  "flashcards": [
    { "front_en": "Null vs Alternative Hypothesis", "back_zh": "H0 取等号、代表现状;Ha 是研究者怀疑/想证明的命题" },
    { "front_en": "Type I error", "back_zh": "拒绝了为真的 H0,概率 = 显著性水平 α" },
    { "front_en": "Type II error", "back_zh": "未拒绝为假的 H0" },
    { "front_en": "Power of a test", "back_zh": "1 − P(Type II error),正确拒绝假 H0 的概率" },
    { "front_en": "Paired t-test degrees of freedom", "back_zh": "df = n − 1,n 是配对的对数,不是总观测数" }
  ]
};
