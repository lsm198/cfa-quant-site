window.TOPIC_META = {
  "id": "big-data",
  "title_zh": "大数据技术导论",
  "title_en": "Introduction to Big Data Techniques",
  "essence_zh": "本质不是数学公式,而是让你了解大数据、AI/机器学习、Fintech、区块链这些新技术在投资行业的实际应用场景和基本概念——考的是「是什么」和「能干什么」,不是计算题。",
  "exam_pattern_zh": "常考:①机器学习模型失效的两种情况——过拟合(overfitting,在训练集上表现好但换数据集就不行,模型太复杂)和欠拟合(underfitting,没学到数据里的规律,预测不准);②算法交易/高频交易的特点(依赖低延迟网络、把大单拆成小单分散执行);③NLP 自然语言处理在情绪监测等场景的应用;④区块链/分布式账本相关概念——代币化(tokenization,把实物资产的所有权用链上记录表示)、加密货币的核心特征(点对点交易、不需要中介);⑤智能投顾(robo-adviser)相对传统顾问的优劣势——擅长低成本标准化服务,但面对复杂资产配置需求时不如真人顾问。",
  "vocabulary": [
    { "term_en": "Big Data", "meaning_zh": "大数据:体量大、种类多、生成速度快的数据集合,常以「3V」(Volume, Velocity, Variety)概括特征" },
    { "term_en": "machine learning (ML)", "meaning_zh": "机器学习:让算法从数据中自动学习规律、而不是靠人工写死规则的技术" },
    { "term_en": "overfitting / underfitting", "meaning_zh": "过拟合(模型太复杂,换数据集就失灵)/ 欠拟合(模型太简单,没学到数据里真正的规律)" },
    { "term_en": "natural language processing (NLP)", "meaning_zh": "自然语言处理:让计算机理解、分析文本/语音数据(比如分析师评论里的情绪倾向)的技术" },
    { "term_en": "algorithmic trading / high-frequency trading (HFT)", "meaning_zh": "算法交易/高频交易:用计算机程序自动下单,高频交易是其中依赖超低延迟网络、以毫秒级速度执行的一种" },
    { "term_en": "distributed ledger technology (DLT)", "meaning_zh": "分布式账本技术:多方共同维护、不依赖单一中心化机构的数据记录系统,区块链是其中一种实现" },
    { "term_en": "tokenization", "meaning_zh": "代币化:把实物资产的所有权凭证用区块链/分布式账本记录和转让的过程" },
    { "term_en": "robo-adviser", "meaning_zh": "智能投顾:全自动化的数字化财富管理服务,低费率低门槛,但面对复杂资产配置需求时能力有限" }
  ],
  "mnemonics": [
    { "title_zh": "过拟合 vs 欠拟合", "content_zh": "过拟合 = 学得太「死」,把训练集的噪音都当规律记下来了,换个数据集就不准;欠拟合 = 学得太「浅」,压根没抓住数据里真正的规律。两种都会导致模型预测不准,但原因相反。" }
  ],
  "concepts": [],
  "flashcards": [
    { "front_en": "Overfitting", "back_zh": "模型过于复杂,在训练集表现好,换新数据集预测不准" },
    { "front_en": "Underfitting", "back_zh": "模型过于简单,没能学到数据里真正的规律" },
    { "front_en": "Tokenization", "back_zh": "把实物资产所有权用区块链/分布式账本记录和转让的过程" },
    { "front_en": "Cryptocurrency key feature", "back_zh": "允许点对点交易,不需要银行等中介机构" },
    { "front_en": "Robo-adviser limitation", "back_zh": "面对复杂、高净值客户的定制化资产配置需求时,不如真人顾问团队" }
  ]
};
