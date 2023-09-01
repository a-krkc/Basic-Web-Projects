//! Elementleri alma
const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearFilms = document.getElementById("clear-films");

//! Tüm eventleri yükleme:
evetListeners();

function evetListeners () {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    secondCardBody.addEventListener("click", deleteFilm);
    clearFilms.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        UI.displayMessage("Tüm Alanları Doldurun!", "danger");
    } else {
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm);
        UI.clearInputs(titleElement, directorElement, urlElement);
        UI.displayMessage("Film Başarıyla Eklendi!", "success");
    }
    
    e.preventDefault();
}

function deleteFilm (e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessage("Film Başarıyla Kaldırıldı!", "success");
    }
}

function clearAllFilms () {
    if (confirm("Emin misiniz ?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
        UI.displayMessage("Tüm Filmler Kaldırıldı!", "success");
    }
}
