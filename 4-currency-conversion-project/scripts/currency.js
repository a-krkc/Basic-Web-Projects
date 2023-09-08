class Currency {
  constructor(first, second) {
    this.first = first;
    this.second = second;
    this.amount = null;
  }

  exchange(amount) {
    this.changeAmount(amount);
    return new Promise((resolve, reject) => {
      fetch(this.updateUrl())
        .then((response) => response.json())
        .then((data) => resolve(data.rates[this.second]))
        .catch((err) => reject(err));
    });
  }

  changeAmount(amount) {
    this.amount = amount;
  }

  updateUrl() {
    const fullUrl = `https://api.frankfurter.app/latest?amount=
                      ${this.amount}&from=${this.first}&to=${this.second}`;
    return fullUrl;
  }

  newFirstCurrency(newCurrency) {
    this.first = newCurrency;
  }

  newSecondCurrency(newCurrency) {
    this.second = newCurrency;
  }
}
