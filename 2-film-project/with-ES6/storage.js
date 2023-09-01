class Storage {

    static addFilmToStorage (film) {
        let films = this.getFilmsFromStorage();
        films.push(film);
        localStorage.setItem("films", JSON.stringify(films));
    }

    static getFilmsFromStorage () {
        let filmArr;

        if (localStorage.getItem("films") === null) {
            filmArr = [];
        } else {
            filmArr = JSON.parse(localStorage.getItem("films"));
        }

        return filmArr;
    }

    static deleteFilmFromStorage (filmTitle) {
        let films = this.getFilmsFromStorage();

        films.forEach( function (film, index) {
            if (film.title === filmTitle) {
                films.splice(index, 1);
            }
        });

        localStorage.setItem("films", JSON.stringify(films));
    }

    static clearAllFilmsFromStorage () {
        localStorage.removeItem("films");
    }
}
