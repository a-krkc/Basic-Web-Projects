class Storage {
  static addItemToStorage(item) {
    let items = this.getItemsFromStorage();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }

  static getItemsFromStorage() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }

  static deleteItemFromStorage(toDeleteItem) {
    let items = this.getItemsFromStorage();
    items.forEach(function (item, index) {
      if (item === toDeleteItem) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  }
  static clearAllItemsFromStorage() {
    localStorage.removeItem("items");
  }
}
