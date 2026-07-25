function fvAnnuityFactor(iDec, n) {
  if (iDec === 0) return n;
  return (Math.pow(1 + iDec, n) - 1) / iDec;
}

function normalize(value) {
  return value === null || value === undefined || value === "" ? undefined : Number(value);
}

export function solveTVM({ n, iPct, pv, pmt, fv }) {
  const raw = { n, iPct, pv, pmt, fv };
  const missing = Object.keys(raw).filter((k) => raw[k] === null || raw[k] === undefined || raw[k] === "");
  if (missing.length !== 1) {
    throw new Error("Exactly one of n, iPct, pv, pmt, fv must be left blank to solve for it.");
  }
  const target = missing[0];
  const nVal = normalize(n);
  const iDec = normalize(iPct) === undefined ? undefined : normalize(iPct) / 100;
  const pvVal = normalize(pv);
  const pmtVal = normalize(pmt) === undefined ? 0 : normalize(pmt);
  const fvVal = normalize(fv);

  if (target === "fv") {
    const grownPv = pvVal * Math.pow(1 + iDec, nVal);
    const grownPmt = pmtVal * fvAnnuityFactor(iDec, nVal);
    return { field: "fv", value: -(grownPv + grownPmt) };
  }

  if (target === "pv") {
    const grownPmt = pmtVal * fvAnnuityFactor(iDec, nVal);
    return { field: "pv", value: -(fvVal + grownPmt) / Math.pow(1 + iDec, nVal) };
  }

  if (target === "pmt") {
    const annuityFactor = fvAnnuityFactor(iDec, nVal);
    const grownPv = pvVal * Math.pow(1 + iDec, nVal);
    return { field: "pmt", value: -(fvVal + grownPv) / annuityFactor };
  }

  if (target === "n") {
    if (pmtVal === 0) {
      return { field: "n", value: Math.log(-fvVal / pvVal) / Math.log(1 + iDec) };
    }
    const numerator = pmtVal / iDec - fvVal;
    const denominator = pvVal + pmtVal / iDec;
    return { field: "n", value: Math.log(numerator / denominator) / Math.log(1 + iDec) };
  }

  // target === "iPct": bisection search for the rate that satisfies
  // pv*(1+i)^n + pmt*((1+i)^n - 1)/i + fv = 0
  const f = (iDecGuess) => {
    const grownPv = pvVal * Math.pow(1 + iDecGuess, nVal);
    const grownPmt = pmtVal * fvAnnuityFactor(iDecGuess, nVal);
    return grownPv + grownPmt + fvVal;
  };
  let lo = -0.9999;
  let hi = 10;
  let flo = f(lo);
  let mid = 0;
  for (let iter = 0; iter < 200; iter += 1) {
    mid = (lo + hi) / 2;
    const fmid = f(mid);
    if (Math.abs(fmid) < 1e-9) break;
    if ((flo < 0 && fmid < 0) || (flo > 0 && fmid > 0)) {
      lo = mid;
      flo = fmid;
    } else {
      hi = mid;
    }
  }
  return { field: "iPct", value: mid * 100 };
}
