import { test } from "node:test";
import assert from "node:assert/strict";
import { solveTVM } from "../js/calculators/tvm-math.js";

function assertClose(actual, expected, tolerance, message) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message}: expected ~${expected}, got ${actual}`);
}

// Grounded in a real CFA L1 Quant question (数量分析 #78): a pension fund needs a
// $10,000,000 lump sum in 15 years, earning 5%/year compounded semi-annually.
// n = 30 semiannual periods, i = 2.5% per period, pmt = 0.
// Reference answer: PV closest to $4,767,427.
test("solveTVM solves PV for a single lump sum (real exam question #78)", () => {
  const result = solveTVM({ n: 30, iPct: 2.5, pv: undefined, pmt: 0, fv: 10000000 });
  assert.equal(result.field, "pv");
  assertClose(Math.abs(result.value), 4767427, 50, "PV of lump sum");
});

// Grounded in a real CFA L1 Quant question (数量分析 #6): an asset earns 13.1%
// over a 16-month period. Reframed as PV=-1, FV=1.131, n=16/12 years, pmt=0.
// Reference answer: annualized rate closest to 9.7%.
test("solveTVM solves interest rate for a single lump sum (real exam question #6)", () => {
  const result = solveTVM({ n: 16 / 12, iPct: undefined, pv: -1, pmt: 0, fv: 1.131 });
  assert.equal(result.field, "iPct");
  assertClose(result.value, 9.7, 0.1, "annualized rate");
});

test("solveTVM round-trips: solving FV then PV from that FV recovers the original PV", () => {
  const fvResult = solveTVM({ n: 10, iPct: 6, pv: -1000, pmt: -100, fv: undefined });
  const pvResult = solveTVM({ n: 10, iPct: 6, pv: undefined, pmt: -100, fv: fvResult.value });
  assertClose(pvResult.value, -1000, 0.01, "round-tripped PV");
});

test("solveTVM round-trips: solving PMT then N from scratch recovers a consistent N", () => {
  const pmtResult = solveTVM({ n: 5, iPct: 4, pv: -1000, pmt: undefined, fv: 0 });
  const nResult = solveTVM({ n: undefined, iPct: 4, pv: -1000, pmt: pmtResult.value, fv: 0 });
  assertClose(nResult.value, 5, 0.01, "round-tripped N");
});

test("solveTVM throws when zero or more than one field is missing", () => {
  assert.throws(() => solveTVM({ n: 5, iPct: 6, pv: -1000, pmt: 0, fv: 1000 }));
  assert.throws(() => solveTVM({ n: undefined, iPct: undefined, pv: -1000, pmt: 0, fv: 1000 }));
});
