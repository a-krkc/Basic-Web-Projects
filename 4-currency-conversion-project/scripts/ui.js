class UI {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  displayResult(result) {
    resultArea.textContent = result;
  }

  resetAmountInput() {
    amount.value = "";
  }
}
