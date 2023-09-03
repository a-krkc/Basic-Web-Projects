class UI {
  static addItemToUI(item) {
    const li = document.createElement("li");
    li.className = "list-items";
    li.appendChild(document.createTextNode(item));
    li.appendChild(this.createButton(this.createIcon()));
    ul.appendChild(li);
    input.value = "";
  }

  static createButton(i) {
    const button = document.createElement("button");
    button.className = "remove-item btn-remove red";
    button.appendChild(i);
    return button;
  }

  static createIcon() {
    const i = document.createElement("i");
    i.className = "fa-solid fa-xmark";
    return i;
  }

  static loadAllItemsToUI() {
    let items = Storage.getItemsFromStorage();
    items.map((item) => this.addItemToUI(item));
  }

  static deleteItemFromUI(e) {
    if (e.target.className === "fa-solid fa-xmark") {
      Storage.deleteItemFromStorage(
        e.target.parentElement.parentElement.textContent
      );
      e.target.parentElement.parentElement.remove();
    }
  }

  static clearAllItemsFromUI() {
    while (ul.firstElementChild !== null) {
      ul.removeChild(ul.firstElementChild);
    }
  }

  static showAlert(tf) {
    tf
      ? (input.style.borderColor = "rgba(0, 255, 0, 1)")
      : (input.style.borderColor = "rgba(255, 0, 0, 1)");
    setTimeout(function () {
      input.style.borderColor = "rgba(0, 0, 0, 0)";
    }, 1000);
  }
}
