const amount = document.getElementById("numberInput");
const selection1 = document.getElementById("selection-1");
const selection2 = document.getElementById("selection-2");
const resultArea = document.querySelector(".resultArea");
const currency = new Currency("USD", "TRY");
const ui = new UI();

init();
function init() {
  amount.addEventListener("input", exchangeCurrency);

  selection1.onchange = function () {
    const option = selection1.options[selection1.selectedIndex].textContent;
    currency.newFirstCurrency(option);
    ui.resetAmountInput();
  };

  selection2.onchange = function () {
    const option = selection2.options[selection2.selectedIndex].textContent;
    currency.newSecondCurrency(option);
    ui.resetAmountInput();
  };
}

function exchangeCurrency() {
  if (isEqual()) {
    return;
  }

  currency
    .exchange(amount.value)
    .then((result) => ui.displayResult(result))
    .catch((err) => console.error(err));
}

function isEqual() {
  const opt1 = selection1.options[selection1.selectedIndex].textContent;
  const opt2 = selection2.options[selection2.selectedIndex].textContent;

  if (opt1 === opt2) {
    resultArea.textContent = amount.value;
    return true;
  }
}
