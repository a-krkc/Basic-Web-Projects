const form = document.getElementById("form");
const input = document.getElementById("item-input");
const filter = document.getElementById("filter");
const ul = document.querySelector(".item-list");
const clearButton = document.querySelector(".btn-clear");
const ui = new UI();
const storage = new Storage();
init();

function init() {
  form.addEventListener("submit", addItem);
  ul.addEventListener("click", ui.deleteItemFromUI.bind(ui));
  clearButton.addEventListener("click", clearAllItems);
  filter.addEventListener("keyup", filterItems);
  document.addEventListener("DOMContentLoaded", ui.loadAllItemsToUI.bind(ui));
}

function addItem(e) {
  const newItem = input.value.trim();
  // console.log(newItem);
  if (newItem === "") {
    input.setAttribute("placeholder", "Geçersiz Giriş");
    ui.showAlert(false);
    input.value = "";
  } else {
    if (checkItem(newItem)) {
      setTimeout(function () {
        ui.addItemToUI(newItem);
        storage.addItemToStorage(newItem);
      }, 500);
      ui.showAlert(true);
      input.removeAttribute("placeholder");
    } else {
      input.value = "";
      input.setAttribute("placeholder", "Girilen Öge Listede Var!");
      ui.showAlert(false);
    }
  }
  e.preventDefault();
}

function checkItem(newItem) {
  const items = storage.getItemsFromStorage();
  // console.log(items);
  if (items !== null) {
    const itemExists = items.some(
      (item) => item.toLowerCase() === newItem.toLowerCase()
    );
    if (itemExists) {
      // console.log("aynısı var");
      return false;
    }
    // console.log("aynısı yok");
    return true;
  }
}

function filterItems(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-items");
  // console.log(filterValue);
  listItems.forEach(function (item) {
    const text = item.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      item.setAttribute("style", "display: none !important");
    } else {
      item.setAttribute("style", "display: flex");
    }
  });
}

function clearAllItems() {
  ui.clearAllItemsFromUI();
  storage.clearAllItemsFromStorage();
}
