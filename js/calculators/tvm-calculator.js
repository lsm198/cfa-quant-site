import { solveTVM } from "./tvm-math.js";

export function initTvmCalculator(formElement, outputElement) {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(formElement);
    const inputs = {
      n: data.get("n"),
      iPct: data.get("iPct"),
      pv: data.get("pv"),
      pmt: data.get("pmt"),
      fv: data.get("fv"),
    };
    try {
      const result = solveTVM(inputs);
      outputElement.textContent = `${result.field.toUpperCase()} = ${result.value.toFixed(4)}`;
    } catch (error) {
      outputElement.textContent = error.message;
    }
  });
}
