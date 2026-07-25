# CFA L1 数量方法学习小站 — 设计文档

日期: 2026-07-25
状态: 待用户审阅

## 背景与目标

为 CFA Level 1 数量方法(Quantitative Methods)科目做一个轻量、独立的静态 HTML 学习小站,与已有的 `/Users/liushiming/cfa-l1-study-app`(Next.js 全功能刷题系统)完全独立、互不依赖。

目标使用场景:安静地按知识点学习——先看讲解,翻公式卡片加深记忆,再做几道真题自测,遇到需要计算的题用内置计算器验证。中文讲解为主帮助快速理解,关键术语标注英文原文帮助适应全英文考试。

## 范围

**第一版做什么:**
- 11 个数量方法知识点的目录框架(讲解页 + 数据文件),内容随后逐步填充
- 每个知识点页面:讲解区块(中文为主,术语标英文)+ 翻卡片区块 + 练习题区块
- 一个 TVM(货币时间价值)计算器
- 本地 localStorage 记录练习/卡片进度,支持导出/导入 JSON 备份
- 基于用户已有的 `CFA L11000题.docx` + `数量分析.docx` 做一次性半自动导入,产出 93 道数量方法真题的初始内容

**第一版不做(明确排除):**
- 账号系统、后端、数据库——纯静态站,浏览器本地存储
- 跨知识点错题本汇总(先在知识点内部记录正确率,够用了再加)
- 统计分布类计算器(先做 TVM,验证过手感后再加)
- 构建工具链——纯手写 HTML/CSS/JS,打开即用

## 技术方案

纯静态 HTML/CSS/JS,零依赖、零构建步骤。公式用本地引入的 KaTeX 渲染(不依赖联网 CDN,离线可用)。

### 目录结构

```
cfa-quant-site/
  index.html                    # 首页:11个知识点导航目录
  css/style.css
  js/
    app.js                      # 导航渲染、localStorage 工具、导出/导入
    flashcard.js                # 翻卡片引擎(所有知识点共用)
    quiz.js                     # 练习/自测引擎(所有知识点共用)
    calculators/
      tvm-calculator.js         # TVM 计算器(N/I/PV/PMT/FV 互解)
  lib/katex/                    # 本地 KaTeX,离线渲染公式
  topics/
    rates-returns/        index.html + data.js   # 收益率衡量
    tvm/                  index.html + data.js   # 货币时间价值应用
    stats-returns/        index.html + data.js   # 资产收益的统计度量
    probability-trees/    index.html + data.js   # 概率树与条件期望
    portfolio-math/       index.html + data.js   # 组合数学
    simulation/           index.html + data.js   # 模拟方法
    sampling-estimation/  index.html + data.js   # 抽样与估计
    hypothesis-testing/   index.html + data.js   # 假设检验
    tests-independence/   index.html + data.js   # 独立性的参数与非参数检验
    regression/           index.html + data.js   # 简单线性回归
    big-data/             index.html + data.js   # 大数据技术导论
```

每个知识点一个文件夹:`index.html` 是讲解页,内嵌"卡片模式"和"练习模式"两个区块,由共用的 `flashcard.js`/`quiz.js` 读取同目录下 `data.js` 渲染。以后新增内容只改对应知识点的 `data.js`,不牵动其他代码。

### 知识点讲解页的内容结构(MECE)

11 个知识点本身照搬 CFA 官方 Quant 科目的 reading 划分,天然互斥且完整覆盖考纲,不存在自造分类导致重叠或漏项的问题。

每个知识点页面内部,讲解区块拆成五块互不重叠的内容,各司其职、按顺序呈现:

1. **本质**(`essence_zh`)——开篇一句话说清这个知识点到底在考什么核心思想,作为整页的 TL;DR
2. **详细讲解**(`concepts`)——中文讲透概念和公式推导,关键术语标英文原文
3. **高频词汇**(`vocabulary`)——英中对照表,不止公式里的词,还包括真题里反复出现的表达(如 "most likely" / "least likely" / "all else being equal"),帮助适应全英文考试
4. **记忆口诀**(`mnemonics`)——针对容易混淆的公式或分类给的记忆技巧,不是每个知识点都需要,没有的留空数组即可
5. **考试怎么考**(`exam_pattern_zh`)——这个知识点常见的出题角度、常见干扰项/易错点总结

这五块各自负责不同维度(是什么/怎么用/怎么说/怎么记/怎么考),不互相包含,拼起来覆盖"快速理解+高效记忆+应试准备"的完整需求。之后是卡片模式和练习模式两个交互区块。

### 数据格式(`data.js` 示例)

```js
window.TOPIC_DATA = {
  id: "tvm",
  title: "货币时间价值应用 (Time Value of Money in Finance)",
  essence_zh: "本质是给未来或过去的现金流找一个统一时点上可比的价值,核心工具是复利折现。",
  exam_pattern_zh: "常考:年金/永续年金的 PV、FV 互算,延迟年金(第一笔现金流不在 t=1),以及和真实计算器操作步骤对应的陷阱选项(比如混淆 BGN/END 模式)。",
  vocabulary: [
    { term_en: "Holding Period Return (HPR)", meaning_zh: "持有期收益率" },
    { term_en: "most likely / least likely", meaning_zh: "CFA 选择题常见问法,表示\"最可能/最不可能\"" }
  ],
  mnemonics: [
    { title_zh: "年金5要素记忆", content_zh: "N-I-PV-PMT-FV,填四求一,现金流方向符号要相反" }
  ],
  concepts: [
    {
      term_en: "Holding Period Return (HPR)",
      explain_zh: "持有期收益率:某项资产在单一持有期内赚取的回报率。",
      formula: "R = (P_1 - P_0 + D_1) / P_0"
    }
  ],
  flashcards: [
    { front_en: "HPR formula", back_zh: "R = (P1 − P0 + D) / P0,涵盖资本利得和股息收益" }
  ],
  questions: [
    {
      id: "tvm-001",
      stem_en: "An investor purchases a stock for $100. ...",
      choices_en: ["A. 0%.", "B. 7%.", "C. 14%."],
      answer: "C",
      explanation_en: "Correct because a holding period return is ...",
      explanation_zh: "持有期收益率 = (卖出价 − 买入价 + 股息) / 买入价,代入数字得 14%。",
      los: "Calculate and interpret major return measures and describe their appropriate uses"
    }
  ]
};
```

题目题干、选项、官方解析保留英文原文(练习真实 CFA 英文表达),额外附一句中文解析摘要帮助快速理解。讲解页的 `concepts` 区块中文为主,术语和公式标英文原文。`essence_zh`、`exam_pattern_zh`、`vocabulary`、`mnemonics` 这四类内容需要针对每个知识点单独整理,不是从 93 题的解析里能自动抽出来的——初期可以先留空由我后续手写补充,或者你有对应的复习资料/笔记也可以发我参考整理。

### 视觉风格

已通过可视化对比选定:**柔和蓝灰**色调。

| 用途 | 颜色 |
|---|---|
| 页面背景 | `#eef1f5` |
| 顶栏背景 | `#dce3ea` |
| 顶栏/标题文字 | `#34506b` |
| 正文文字 | `#2c3e50` |
| 卡片边框 | `#d7dee5` |
| 弱化标签文字 | `#5b7d9a` |
| 正确/选中态背景 | `#d7e6f0`,边框 `#7fa8c9`,文字 `#204060` |

整体冷静、克制,适合安静做题的场景。

### 交互设计

**卡片模式**:点击翻面查看背面(公式/解释),下方"还不熟 / 记住了"两个按钮。标记"记住了"的卡片存入 `mastered` 状态,页面顶部可切换"只看未掌握"。

**练习模式**:选完选项立即变色反馈(绿色=正确,红色=错误)并展开中英双语解析,知识点页面顶部实时显示该知识点当前正确率。

**TVM 计算器**:N / I/Y / PV / PMT / FV 五个输入框,填其中任意四个,点击"求解"计算剩下一个,操作逻辑对齐真实金融计算器(BA II Plus 等)的使用习惯。

### 进度存储

纯前端 `localStorage`,无需账号/服务器:

```js
// key: "cfa-quant-progress"
{
  flashcards: { "tvm-001": { mastered: true } },
  questions:  { "tvm-001": { attempts: [{ correct: true, ts: 1690000000 }] } }
}
```

提供"导出 JSON / 导入 JSON"按钮,供换设备或清缓存前手动备份——本地存储没有云同步,这是最低成本的防丢失手段。

### 内容导入(数量方法初始 93 题)

`CFA L11000题.docx` 的"数量分析"段落(93 道题,仅题干选项)与配套 `数量分析.docx`(93 条 Solution,含逐选项解析+ LOS 标注)按序号一一对应。写一个一次性脚本:两份 docx 转文本 → 按序号配对合并为完整题目对象 → 依据每题解析末尾的 LOS 文字自动归类到 11 个知识点之一 → 写入对应知识点的 `data.js`。原始转换存在乱码和公式符号丢失(如上下标、希腊字母），自动导入后仍需人工过一遍校对,不保证 100% 干净。

## 错误处理

- `localStorage` 不可用时(隐私模式等)降级提示"当前浏览器不支持本地存储,练习记录不会保存",但页面其他功能不阻断。
- 公式渲染依赖本地 KaTeX 文件,不请求外部 CDN,避免离线/网络问题导致公式打不出来。
- `data.js` 中字段缺失(如某题没写 `explanation_zh`)时,对应区块直接不渲染,不报错、不崩溃。

## 测试与验证

纯静态站没有后端逻辑,人工验证为主:
- 每新增一个知识点或一批题目,本地打开页面走一遍"讲解 → 翻卡片 → 做题 → 看正确率"完整流程。
- TVM 计算器额外挑 1000 题库中 3-5 道真实 PV/FV 题目验证算出的结果与参考答案一致,确认公式实现无误。
- 93 题批量导入完成后,抽样检查若干题目的题干、选项、答案、解析是否正确配对,确认脚本没有错位。

## 后续可能扩展(明确不在第一版范围)

- 跨知识点错题本
- 统计分布计算器(正态分布查表等)
- 更多科目(固定收益、权益投资等,复用同一套骨架)
