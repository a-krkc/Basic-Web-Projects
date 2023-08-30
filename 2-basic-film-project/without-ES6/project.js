//! Elementleri alma
const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearFilms = document.getElementById("clear-films");


//! UI objesini başlatma
const ui = new UI();

//! Storage objesini başlatma
const storage = new Storage();

//! Tüm eventleri yükleme
evetListeners();

function evetListeners () {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    secondCardBody.addEventListener("click", deleteFilm);
    clearFilms.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        ui.displayMessage("Tüm Alanları Doldurun!", "danger");
    } else {
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);
        ui.clearInputs(titleElement, directorElement, urlElement);
        ui.displayMessage("Film Başarıyla Eklendi!", "success");
    }

    e.preventDefault();
}

function deleteFilm (e) {
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessage("Film Başarıyla Kaldırıldı!", "success");
    }
}

function clearAllFilms () {
    if (confirm("Emin misiniz ?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
        ui.displayMessage("Tüm Filmler Kaldırıldı!", "success");
    }
}
