const form = document.getElementById("form");
const input = document.getElementById("item-input");
const filter = document.getElementById("filter");
const ul = document.querySelector(".item-list");
const clearButton = document.querySelector(".btn-clear");
init();

function init() {
  form.addEventListener("submit", addItem);
  ul.addEventListener("click", UI.deleteItemFromUI.bind(UI));
  clearButton.addEventListener("click", clearAllItems);
  filter.addEventListener("keyup", filterItems);
  document.addEventListener("DOMContentLoaded", UI.loadAllItemsToUI.bind(UI));
}

function addItem(e) {
  const newItem = input.value.trim();
  if (newItem === "") {
    input.setAttribute("placeholder", "Geçersiz Giriş");
    UI.showAlert(false);
    input.value = "";
  } else {
    if (checkItem(newItem)) {
      setTimeout(function () {
        UI.addItemToUI(newItem);
        Storage.addItemToStorage(newItem);
      }, 500);
      UI.showAlert(true);
      input.removeAttribute("placeholder");
    } else {
      input.value = "";
      input.setAttribute("placeholder", "Girilen Öge Listede Var!");
      UI.showAlert(false);
    }
  }
  e.preventDefault();
}

function checkItem(newItem) {
  const items = Storage.getItemsFromStorage();
  if (items !== null) {
    const itemExists = items.some(
      (item) => item.toLowerCase() === newItem.toLowerCase()
    );
    if (itemExists) {
      return false;
    }
    return true;
  }
}

function filterItems(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-items");
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
  UI.clearAllItemsFromUI();
  Storage.clearAllItemsFromStorage();
}
