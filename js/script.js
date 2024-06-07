import { movies } from "./db.js";

const cont = document.querySelector('.promo__interactive-list');
const promo__bg = document.querySelector('.promo__bg');
const ul = document.querySelector('.promo__menu-list ul');
const genres = ['All', ...new Set(movies.map(item => item.Genre))];

reload(movies, cont);
reloadGenres(genres, ul);

function reload(arr, place) {
    place.innerHTML = "";
    if (arr.length > 0) {
        setMovie(arr[0]);
    }

    arr.forEach((item, idx) => {
        let li = document.createElement('li');
        let del = document.createElement('div');

        li.innerHTML = `${idx + 1}. ${item.Title}`;
        li.classList.add('promo__interactive-item');
        del.classList.add('delete');

        li.append(del);
        place.append(li);

        del.onclick = () => {
            arr.splice(idx, 1);
            reload(arr, place);
        };

        li.onclick = () => {
            promo__bg.style.backgroundImage = `url(${item.Poster})`;
        };
    });
}

function reloadGenres(arr, place) {
    place.innerHTML = '';

    arr.forEach((item, idx) => {
        let li = document.createElement('li');
        let a = document.createElement('a');

        a.classList.add('promo__menu-item');
        a.innerHTML = item;
        a.href = '#';

        li.append(a);
        place.append(li);

        if (idx === 0) {
            a.classList.add('promo__menu-item_active');
        }

        a.onclick = (event) => {
            event.preventDefault();
            ul.querySelector('.promo__menu-item_active').classList.remove('promo__menu-item_active');
            a.classList.add('promo__menu-item_active');
            filterMovieList(item);
        };
    });
}

function filterMovieList(genre = "All") {
    if (genre === "All") {
        reload(movies, cont);
        return;
    }

    const filtered = movies.filter(movie => movie.Genre === genre);
    reload(filtered, cont);
}

let search = document.querySelector('.search');
search.onkeyup = () => {
    let value = search.value.toLowerCase().trim();

    let filtered = movies.filter(item => item.Title.toLowerCase().includes(value));
    reload(filtered, cont);
};

function setMovie(movie) {
    console.log(`Setting movie: ${movie.Title}`);
}

replay(movies, cont);

function replay(arr, place) {
    place.innerHTML = "";

    arr.forEach((item, idx) => {
        let li = document.createElement('li');

        li.classList.add('promo__interactive-item');
        li.innerHTML = `${idx + 1}. ${item.Title}`;

        li.onclick = () => {
            promo__bg.style.backgroundImage = `url(${item.Poster})`;
        };

        place.append(li);
    });
}