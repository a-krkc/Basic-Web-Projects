//! Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
eventListeners();

function eventListeners () {        //* Tüm eventListenerlar
    form.addEventListener("submit", addTodo);   //* form elementindeki butona basılınca
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI); //* ui'da gösterme
    secondCardBody.addEventListener("click", deleteTodoFromUI);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function addTodo (e) {  //* form alanındaki ekleme ilk işlemi
    const newTodo = todoInput.value.trim(); //* input alanındaki değer, trim > boşlukları silme
    if (newTodo === "") {                   //* todo boşsa
        showAlert("danger", "Lütfen bir todo girin!");
    }
    else {
        if (checkTodo(newTodo)) {
            addTodoToUI(newTodo);               //* verilen todo'yu ui'a ekler 
            addTodoToStorage(newTodo);          //* verilen todo'yu local storage'a ekler 
            showAlert("success", "Todo başarıyla eklendi.");
        }
        else {
            showAlert("danger", "Girilen Todo Listede Var!");
        }
    }
    e.preventDefault();
}

function checkTodo (newTodo) {  //* newTodo listede var mı yok mu? 
    const todos = JSON.parse(localStorage.getItem("todos"));

    const todoExists = todos.some(function (todo) {     //* array içinde dolaşma ve return
        return todo.toLowerCase() === newTodo.toLowerCase();
    });

    if (todoExists) {
        console.log("aynısı var");
        return false;
    }
    console.log("aynısı yok");
    return true;
}

function addTodoToUI (todo) {    //* string değeri list item olarak UI'a ekleyecek
    //* listItem oluşturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    //* link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    
    //* listItem içeriğini oluşturma : Text Node ekleme
    listItem.appendChild(document.createTextNode(todo));
    listItem.appendChild(link);

    //* todoList'e listItem ekleme
    todoList.appendChild(listItem);
    
    //* input alanını boşaltma
    todoInput.value = "";
}

function showAlert (type, message) { //* input alanındaki içeriğe göre uyarı verecek fonksiyon
    const hr = document.createElement("hr");        //* hr elementi oluşturma
    const alert = document.createElement("div");    //* div elementi oluşturma

    alert.className = `alert alert-${type}`;        //* div'e class verme
    alert.textContent = message;                    //* div içine yazı yazma
    // console.log(alert);
    firstCardBody.appendChild(hr);                  //* firstCardBody içine
    firstCardBody.appendChild(alert);               //* hr ve div elementlerini yerleştirme

    setTimeout( function () {        //* setTimeout(işleme alınacak fonksiyon, ms cinsinden süre)
        hr.remove();                 //* belirtilen süre sonunda işleme alınır
        alert.remove();
    }, 1000);
}

function getTodosFromStorage () { //* localStorage'dan tüm todoları alma
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];         //* localStorage içinde todos yoksa boş bir array'e atama 
    }
    else {                                   //* localStorage içinden todos array'ini alma 
        todos = JSON.parse(localStorage.getItem("todos"));  //* string'den array'e çevirme
    }
    return todos;
}

function addTodoToStorage (todo) {  //* localStorage'a ekleme
    let todos = getTodosFromStorage();  //* storage'dan içerikleri alma
    todos.push(todo);                   //* yeni ögeyi array'e ekleme
    
    //* localStoragedaki todos array'ini güncelleme 
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI () {  //* localdeki todoları sayfa yüklenince ui'da gösterme
    let todos = getTodosFromStorage();
    todos.forEach( function (todo) {     //* todos arrayi içinde gezinme
        addTodoToUI(todo);      //* herbir todos ögesini UI'a yazma
    });
}

function deleteTodoFromUI (e) {  //* UI üzerinden todo'yu silme
    if (e.target.className === "fa fa-remove") {
        //* ui üzerinden seçilen todo'yu silme
        e.target.parentElement.parentElement.remove();
        //* localStorage'dan seçilen todo'yu silme
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo Başarıyla Silindi!");
    }
}

function deleteTodoFromStorage (deleteTodo) { //* verilen todo'nun
    let todos = getTodosFromStorage();       //* localdeki değerini silme
    todos.forEach( function (todo, index) {
        if (todo === deleteTodo) {  //* array içinden belirtilen indexten 
            todos.splice(index, 1); //* sonraki 1 elementi sil
        }                           
    });
    //* JSON.stringify ile yeni arrayi todos key'ine atama
    localStorage.setItem("todos", JSON.stringify(todos))
}

function filterTodos (e) {
    const filterValue = e.target.value.toLowerCase(); //* input alanını küçük harf yap
    const listItems = document.querySelectorAll(".list-group-item");   //* liste elemanlarını al

    listItems.forEach ( function (listItem) {
        const text = listItem.textContent.toLowerCase(); //* elemanı küçük harf yaparak al
        if (text.indexOf(filterValue) === -1) {
            //* item yoksa display: none ile görünmez yapar
            listItem.setAttribute("style", "display: none !important");
        }
        else {
            //* item varsa display: block ile görünür yapar
            listItem.setAttribute("style", "display: block");
        }
    });
}

function clearAllTodos() {
    //* ui'dan kaldırma
    if (confirm("Tüm Todolar Silinsin mi?")) {
        //* todoList.innerHTML = "";    //* yavaş çalışır

        // console.log(todoList.firstElementChild); //* boş ise null değer döner 
        while (todoList.firstElementChild !== null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        //* todos array'ini siler
        localStorage.removeItem("todos");
    }
}
