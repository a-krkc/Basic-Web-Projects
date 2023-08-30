function Storage () {
}

Storage.prototype.addFilmToStorage = function (film) {
    let films = this.getFilmsFromStorage();
    films.push(film);
    localStorage.setItem("films", JSON.stringify(films));
}

Storage.prototype.getFilmsFromStorage = function () {
    let filmArr;

    if (localStorage.getItem("films") === null) {
        filmArr = [];
    } else {
        filmArr = JSON.parse(localStorage.getItem("films"));
    }

    return filmArr;
}

Storage.prototype.deleteFilmFromStorage = function (filmTitle) {
    let films = this.getFilmsFromStorage();

    films.forEach( function (film, index) {
        if (film.title === filmTitle) {
            films.splice(index, 1);
        }
    });

    localStorage.setItem("films", JSON.stringify(films));
}

Storage.prototype.clearAllFilmsFromStorage = function () {
    localStorage.removeItem("films");
}
