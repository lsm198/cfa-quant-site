window.TOPIC_QUESTIONS = [
  {
    "id": "imported-013",
    "stem_en": "An investment pays $1,000 annually for five years, with the first payment  occurring three years from today. If the discount rate is 6% compounded annually,  the present value of the investment today is closest to:",
    "choices_en": [
      "A. $3,537.",
      "B. $3,749.",
      "C. $4,212."
    ],
    "answer": "B",
    "explanation_en": "Correct because by drawing a time line, the investment ts recognized as a delayed annuity with the first\npayment starting at f= 3.\nThe first step is to compute the present value of an ordinary annuity at f= 2 because the first annuity payment Is\nthen one period away, as PV2= A[1 — 1/(1 + A\") / r=$1,000 = [1 — 1/(1 + 0.06)°/0.06 = $4,212.36.\nUsing the present value formula for a lump sum te bring the single cash flow from f= 2 to f= 0, PV, = FVa(1 +\nr-* = $4,212.36 (1 + 0.06) = $3,748.99 ~ $3. 749.\nCalculator solution:\n(1) END mode: N = 5: |= 6%: PMT = —-1,000; FV = 0: solve for PV = 4,212.36.\n(2) END mode: N = 2: 1= 6%: PMT = 0: FV =4 212.36: solve for PV = 3. 748.99 ~ 3, 749.",
    "los": "calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows",
    "explanation_zh": "【知识点】递延年金(deferred annuity)+ 普通年金现值(Present Value of an Ordinary Annuity)。首笔现金流发生在 t=3,属于递延年金,按“N怎么数”原则,普通年金现值点在首笔现金流前一期,即 t=2。先算 t=2 时点的年金现值:PV2=1000×[1-1.06^-5]/0.06≈4212.37(N=5,I=6%,PMT=1000)。再把这笔现值当作一笔单一现金流,从 t=2 折回 t=0(只折2期):PV0=4212.37/1.06^2≈3749,对应B。若误把折现期数算成3期(把年金现值点错当在t=3),会得到偏低的A($3,537);若忘记最后一步把t=2的现值折回今天、直接把4212当答案,就会误选C。"
  },
  {
    "id": "imported-031",
    "stem_en": "An investor has three options for receiving payments from an investment:  ·Option 1:a single payment of $136,000 today,  ·Option 2:30 annual payments of $12,000,beginning one year from today,  ·Option 3:20 annual payments of $13,000,beginning today.  If the annual discount rate is 8%, the option with the highest present value is:",
    "choices_en": [
      "A. Option 1.",
      "B. Option 2.",
      "C. Option 3."
    ],
    "answer": "C",
    "explanation_en": "Correct because Option 3 (annuity due with 20 payments of $13,000 each) has the highest present value of the\nannuities and the $136,000 lump sum.\nCalculator solution for Option 2: End mode: N = 30; YY = 6: PMT =—12,000; compute PV = 135,093.\nCalculator solution for Option 3: Begin mode; N = 20: I/¥ = & PMT =-13,000; compute PV = 13/7, 84/7.",
    "los": "calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows",
    "explanation_zh": "【知识点】Present Value of an Ordinary Annuity + 期初年金(annuity due)现值调整公式(Annuity Due Adjustment)。比较三种现金流在8%折现率下的现值:方案一为已知现值$136,000;方案二是从t=1开始的30期普通年金,PV=12,000×[1-1.08^-30]/0.08≈$135,093;方案三是从t=0开始的20期期初年金,先算20期普通年金现值127,636(=13,000×[1-1.08^-20]/0.08),再乘以(1+r)得期初年金现值:127,636×1.08≈$137,847。三者比较方案三现值最高,故选C。期初年金比普通年金整体提前一期发生、多享受一期复利,这是其现值更高的根本原因。"
  },
  {
    "id": "imported-063",
    "stem_en": "An investment requires 10 equal annual payments, starting today, and will pay  out a lump sum of $500,000 15 years from today. If the interest rate is 4% per  year compounded annually, the required annual payment is closest to:",
    "choices_en": [
      "A. $32,913.",
      "B. $34,230.",
      "C. $40,044."
    ],
    "answer": "A",
    "explanation_en": "Correct because the present value of the future lump sum payment Is PV = FV,(1 + rN = $500,000(1 +\n0.04) = $277,632.25. The 10 annual payments form an annuity due (since the payments start today) whose\npresent value equals the present value of an ordinary annuity with 9 annual payments plus the first payment, |.e.\nPV=A+A[1—1/(1 + Nr =A + [1 — 1/(1 + 0.04)*1/0.04) = 8.4353(A). Setting the PV of the cash outflows (the\nannuity) equal to the PV of the cash inflows (the return in 15 years), we can solve for the annual payment\namount; A = $277 ,632.25/8.4353 = $32,913. Calculator solution: BGN; N = 10; TY = 4. PV = 277,632.25: solve\nfor PMT = 32,913.",
    "los": "# calculate and interpret the implied retum of fixed-income instruments and required retum and implied growth of equity instruments given the present value (PV) and cash flows",
    "explanation_zh": "【知识点】期初年金现值调整(Annuity Due Adjustment)+ 单笔现值(Present Value of a Single Lump Sum)。先把15年后50万元的一次性现金流折算到今天:PV=500,000/1.04^15≈277,632。10次缴款从今天(t=0)就开始,属于期初年金,其现值可拆成“今天这笔A”加上“t=1至t=9共9期普通年金现值”:PV=A×(1+[1-1.04^-9]/0.04)=A×8.4353。令其等于277,632,解得A≈$32,913,对应A。若误把10期缴款当成从t=1开始的普通年金(漏掉期初年金的调整),改用普通年金因子8.1109去除,会得到偏高的B($34,230)。"
  },
  {
    "id": "imported-066",
    "stem_en": "An investor needs to make the following payments to cover college tuition fees,  starting 10 years from today:  Annual fee (payable at the beginning of each year) $50,000  Number of years of fee payments    4  If the investor's annual discount rate is 3%, the minimum investment amount  required today to fund all four years of college tuition is closest to:",
    "choices_en": [
      "A. $138,294.",
      "B. $142,442.",
      "C. $146,716."
    ],
    "answer": "B",
    "explanation_en": "Correct because the present value (PV) of the annuity due 10 years from today equals PV,, = $50,000 +\n$50,000 x [1 — 1/(1.03)7]/0.03 = $50,000 + $50,000 x 2.828611 = $191,431. The PV of the annuity today equals\nPV, = $191,431/(1.03)\"\" = $142 442.\nCalculator solution: BEGIN mode: N = 4 I/¥ = 3%: PMT = 50,000: solve for PV = 191,431. Discounted back 10\nyears: N = 10: IY = 3%: FV = 191,431; solve for PV = 142,442.\nAlternatively, the annuity can be treated as an ordinary annuity, with a PV 9 years from today of PV, = $50,000 x\n[1 — 1/(1.03)*]/0.03 = $50,000 x 3.717098 = $185,855. The PV of the annuity today equals PV, =\n$185,855/(1.03)? = $142 442.\nCalculator solution: END mode; N = 4: I/¥ = 3%; PMT = 50,000; solve for PV = 185,655. Discounted back 9\nyears: N=9: MY = 3%: FV = 185,855: solve for PV = 142,442.",
    "los": "calculate and interpret the implied retum of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows",
    "explanation_zh": "【知识点】递延年金(deferred annuity)与期初年金(annuity due)的组合运用。学费从t=10起、每年年初缴纳共4年,是“递延的期初年金”。先求t=10时点的年金现值(期初年金=首笔5万+剩余3期普通年金现值):PV10=50,000+50,000×[1-1.03^-3]/0.03=50,000+141,431=191,431。再把这笔现值从t=10整整折回t=0共10期:PV0=191,431/1.03^10≈$142,442,对应B。若误只折9期(把年金现值点错当成t=9),会得到偏高的C($146,716)。"
  },
  {
    "id": "imported-067",
    "stem_en": "An annuity makes seven annual payments of $10,000 each, with the first payment  occurring five years from today. If the discount rate is 6% per year, the value of  the annuity today is closest to:",
    "choices_en": [
      "A. $41,715.",
      "B. $44,218.",
      "C. $55,824."
    ],
    "answer": "B",
    "explanation_en": "Correct because the present value in Year 4 of an ordinary annuity with 7 payments of $10.000 at a 6%\ndiscount rate is calculated as follows:\nPV = A[1 — 1/11 + \"ir\nPV. = $10,000 x [1 — 1/(1 + 0.06)'1/0.06\nPV, = $55,823.81\nThen, using a time line, the PV of the annuity in today’s dollars ts\nPVo = FV.(1 + 9\nPV, = $55,823.81 = (1 + 0.06)4\nPV, = $44,217.69 = $44 216.\nCalculator solution: (1) END mode; N = 7, |=6; PMT =—10,000; FV = 0: solve for PV = 55,623.61.\n(2) END mode; N = 4. 1=6; PMT = 0; FV = —=55.823.81, solve for PV = 44,217.69.",
    "los": "» calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows",
    "explanation_zh": "【知识点】递延年金(deferred annuity)+ 普通年金现值(Present Value of an Ordinary Annuity)。7笔$10,000的年金首笔发生在t=5,故普通年金现值点在t=4。先算t=4时的年金现值:PV4=10,000×[1-1.06^-7]/0.06≈55,823.83(N=7,I=6%,PMT=10000)。再把这笔现值折回今天,只需折4期:PV0=55,823.83/1.06^4≈$44,218,对应B。若误把折现期数多算一期(N=5),会得到偏低的A($41,715);若忘记最后一步折现、直接把t=4的年金现值当答案,就会误选C($55,824)。"
  }
];
