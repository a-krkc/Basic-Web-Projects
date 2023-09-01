const form = document.getElementById("form");
const input = document.getElementById("item-input");
const filter = document.getElementById("filter");
const ul = document.querySelector(".item-list");
const clearButton = document.querySelector(".btn-clear");
init();

function init() {
  form.addEventListener("submit", addItem);
  ul.addEventListener("click", deleteItemFromUI);
  clearButton.addEventListener("click", clearAllItems);
  filter.addEventListener("keyup", filterItems);
  document.addEventListener("DOMContentLoaded", loadAllItemsToUI);
}

function addItem(e) {
  const newItem = input.value.trim();
  if (newItem === "") {
    input.value = "";
    input.setAttribute("placeholder", "Geçersiz Giriş");
    showAlert(false);
  } else {
    if (checkItem(newItem)) {
      setTimeout(function () {
        addItemToUI(newItem);
        addItemToStorage(newItem);
      }, 500);
      showAlert(true);
      input.removeAttribute("placeholder");
    } else {
      input.value = "";
      showAlert(false);
      input.setAttribute("placeholder", "Girilen Öge Listede Var!");
    }

    e.preventDefault();
  }
}

function checkItem(newItem) {
  const items = getItemsFromStorage();
  console.log(items);
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

function addItemToUI(item) {
  const li = document.createElement("li");
  li.className = "list-items";
  li.appendChild(document.createTextNode(item));
  li.appendChild(createButton(createIcon()));
  ul.appendChild(li);
  input.value = "";
}

const createButton = (i) => {
  const button = document.createElement("button");
  button.className = "remove-item btn-remove red";
  button.appendChild(i);
  return button;
};
const createIcon = () => {
  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";
  return i;
};

function showAlert(tf) {
  tf
    ? (input.style.borderColor = "rgba(0, 255, 0, 1)")
    : (input.style.borderColor = "rgba(255, 0, 0, 1)");
  setTimeout(function () {
    input.style.borderColor = "rgba(0, 0, 0, 0)";
  }, 1000);
}

function getItemsFromStorage() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

function addItemToStorage(item) {
  let items = getItemsFromStorage();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}

function loadAllItemsToUI() {
  let items = getItemsFromStorage();
  items.map((item) => addItemToUI(item));
}

function deleteItemFromUI(e) {
  if (e.target.className === "fa-solid fa-xmark") {
    deleteItemFromStorage(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.parentElement.remove();
  }
}

function deleteItemFromStorage(toDeleteItem) {
  let items = getItemsFromStorage();
  items.forEach(function (item, index) {
    if (item === toDeleteItem) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function filterItems(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-items");
  console.log(filterValue);
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
  while (ul.firstElementChild !== null) {
    ul.removeChild(ul.firstElementChild);
  }
  localStorage.removeItem("items");
}
