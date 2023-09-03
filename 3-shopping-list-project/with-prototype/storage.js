function Storage() {}

Storage.prototype.addItemToStorage = function (item) {
  let items = this.getItemsFromStorage();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
};

Storage.prototype.getItemsFromStorage = function () {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
};

Storage.prototype.deleteItemFromStorage = function (toDeleteItem) {
  let items = this.getItemsFromStorage();
  items.forEach(function (item, index) {
    if (item === toDeleteItem) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
};

Storage.prototype.clearAllItemsFromStorage = function () {
  localStorage.removeItem("items");
};
