window.TOPIC_META = {
  "id": "big-data",
  "title_zh": "大数据技术导论",
  "title_en": "Introduction to Big Data Techniques",
  "essence_zh": "本质不是数学公式,而是让你了解大数据(Big Data)、AI/机器学习(machine learning)、金融科技(Fintech)、区块链/分布式账本技术(distributed ledger technology, DLT)这些新技术在投资行业的实际应用场景和基本概念——考的是「是什么」和「能干什么」,不是计算题。",
  "exam_pattern_zh": "常考:①机器学习模型失效的两种情况——过拟合(overfitting,在训练集上表现好但换数据集就不行,模型太复杂)和欠拟合(underfitting,没学到数据里的规律,预测不准);②算法交易/高频交易(algorithmic trading / high-frequency trading, HFT)的特点(依赖低延迟网络 low-latency network、把大单拆成小单分散执行);③NLP 自然语言处理(natural language processing)在情绪监测等场景的应用;④区块链/分布式账本相关概念——代币化(tokenization,把实物资产的所有权用链上记录表示)、加密货币(cryptocurrency)的核心特征(点对点交易 peer-to-peer、不需要中介 intermediary);⑤智能投顾(robo-adviser)相对传统顾问的优劣势——擅长低成本标准化服务,但面对复杂资产配置需求时不如真人顾问。",
  "vocabulary": [
    { "term_en": "Big Data", "meaning_zh": "大数据:体量大、种类多、生成速度快的数据集合,常以「3V」(Volume, Velocity, Variety)概括特征", "example_en": "Big Data is generally described in terms of its volume, velocity, and variety." },
    { "term_en": "machine learning (ML)", "meaning_zh": "机器学习:让算法从数据中自动学习规律、而不是靠人工写死规则的技术", "example_en": "Machine learning involves training a model on data so that it can identify patterns and make predictions without being explicitly programmed with rules." },
    { "term_en": "overfitting / underfitting", "meaning_zh": "过拟合(模型太复杂,换数据集就失灵)/ 欠拟合(模型太简单,没学到数据里真正的规律)", "example_en": "An overfitted model performs well on its training data but fails to generalize to new data, while an underfitted model fails to capture the underlying pattern in either data set." },
    { "term_en": "natural language processing (NLP)", "meaning_zh": "自然语言处理:让计算机理解、分析文本/语音数据(比如分析师评论里的情绪倾向)的技术", "example_en": "Natural language processing techniques can scan analyst commentary or news text to detect shifts in sentiment." },
    { "term_en": "algorithmic trading / high-frequency trading (HFT)", "meaning_zh": "算法交易/高频交易:用计算机程序自动下单,高频交易是其中依赖超低延迟网络、以毫秒级速度执行的一种", "example_en": "High-frequency trading relies on low-latency networks to execute a large number of orders in fractions of a second." },
    { "term_en": "distributed ledger technology (DLT)", "meaning_zh": "分布式账本技术:多方共同维护、不依赖单一中心化机构的数据记录系统,区块链是其中一种实现", "example_en": "Distributed ledger technology allows multiple parties to maintain a shared, synchronized record of transactions without a central authority." },
    { "term_en": "tokenization", "meaning_zh": "代币化:把实物资产的所有权凭证用区块链/分布式账本记录和转让的过程", "example_en": "The process of representing ownership rights to physical assets on a distributed ledger is referred to as tokenization." },
    { "term_en": "robo-adviser", "meaning_zh": "智能投顾:全自动化的数字化财富管理服务,低费率低门槛,但面对复杂资产配置需求时能力有限", "example_en": "Robo-advisers offer low-cost, automated portfolio management, but they are generally less equipped to handle highly complex or customized wealth-management needs." }
  ],
  "mnemonics": [
    { "title_zh": "过拟合 vs 欠拟合", "content_zh": "过拟合 = 学得太「死」,把训练集的噪音都当规律记下来了,换个数据集就不准;欠拟合 = 学得太「浅」,压根没抓住数据里真正的规律。两种都会导致模型预测不准,但原因相反。" }
  ],
  "concepts": [
    { "term_en": "fintech", "explain_zh": "金融科技的广义定义:金融服务/产品在设计与交付方式上的技术驱动型创新,涵盖大数据、人工智能、区块链等新技术在金融行业各环节的应用;狭义/日常用法中也可以指从事这些创新的初创公司或行业板块本身。" },
    { "term_en": "cryptocurrency", "explain_zh": "加密货币:一种运行在分布式账本/区块链上的电子货币,核心特征是允许交易双方点对点(peer-to-peer)完成近乎实时的交易而不需要银行等中介机构;价格波动通常较大,且许多加密货币(如比特币)对发行总量设有明确上限,并非无限量发行。" }
  ],
  "analogies_zh": [
    { "title_zh": "死记硬背 vs 真正学会", "content_zh": "过拟合的模型像「死记硬背了练习题答案」——练习册上的题都对,换一套新题就不会做了;欠拟合的模型像「根本没认真复习」——连练习题本身都做不对。真正学会,是既不死记硬背、又能抓住规律。" }
  ],
  "connections": [
    { "topic_id": "regression", "note_zh": "机器学习模型可以看作更复杂版本的回归——都是拟合一个函数去预测结果,过拟合/欠拟合的问题在简单回归里同样存在,只是这里被放大和系统化讨论。" }
  ],
  "flashcards": [
    { "front_en": "Overfitting", "back_zh": "模型过于复杂,在训练集表现好,换新数据集预测不准" },
    { "front_en": "Underfitting", "back_zh": "模型过于简单,没能学到数据里真正的规律" },
    { "front_en": "Tokenization", "back_zh": "把实物资产所有权用区块链/分布式账本记录和转让的过程" },
    { "front_en": "Cryptocurrency key feature", "back_zh": "允许点对点交易,不需要银行等中介机构" },
    { "front_en": "Robo-adviser limitation", "back_zh": "面对复杂、高净值客户的定制化资产配置需求时,不如真人顾问团队" },
    { "front_en": "Algorithmic trading & HFT", "back_zh": "依赖低延迟网络(low-latency network)执行,常将大额机构订单拆分成多笔小单分散执行以降低单笔规模" },
    { "front_en": "NLP in investment management", "back_zh": "用于监测分析师评论中的情绪变化,可能早于分析师正式调整买入/持有/卖出评级" },
    { "front_en": "Fintech (broad definition)", "back_zh": "金融服务/产品在设计与交付方式上的技术驱动型创新,涵盖大数据、AI、区块链等应用" }
  ]
};
