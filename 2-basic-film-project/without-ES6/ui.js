function UI () {
}

UI.prototype.addFilmToUI = function (film) {
    let table = 
    `<tr>
        <td><img src="${film.url}" class="img-fluid img-thumbnail"></td>
        <td>${film.title}</td>
        <td>${film.director}</td>
        <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
    </tr>`

    const filmList = document.getElementById("films");
    filmList.innerHTML += table;
}

UI.prototype.clearInputs = function (title, director, url) {
    title.value = "";
    director.value = "";
    url.value = "";
}

UI.prototype.displayMessage = function (message, type) {
    const cardBody = document.querySelector(".card-body");
    const div = document.createElement("div");

    div.className = `alert alert-${type}`;
    div.textContent = message;
    cardBody.appendChild(div);
    setTimeout(function () {
        div.remove();    
    }, 1000);
}

UI.prototype.loadAllFilms = function (films) {
    const filmList = document.getElementById("films");

    films.forEach( function ($) {
        filmList.innerHTML +=
        `<tr>
            <td><img src="${$.url}" class="img-fluid img-thumbnail"></td>
            <td>${$.title}</td>
            <td>${$.director}</td>
            <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
        </tr>`;
    });
}

UI.prototype.deleteFilmFromUI = function (film) {
    film.parentElement.parentElement.remove();
}

UI.prototype.clearAllFilmsFromUI = function () {
    const filmList = document.getElementById("films");

    while(filmList.firstElementChild !== null) {
        filmList.firstElementChild.remove();
    }
}
