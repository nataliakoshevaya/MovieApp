const API_KEY = "9a86d1f1-b6e7-405d-9386-e7038bfeaea7";
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

let currentPage = 1;
const moviesBtn = document.querySelector('.movies__btn')
      
async function getMovies(url, currentPage) {
  const resp = await fetch(`${url}${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  let respData = await resp.json();
  addMovies(respData);
}

getMovies(API_URL_POPULAR, currentPage);

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else {
    return "red"
  }
}

function addMovies(data) {
  const moviesBlock = document.querySelector(".movies"); 

  data.films.forEach((film) => {
    const movieEl = document.createElement("div");

    movieEl.classList.add("movies__wrapper");
    movieEl.innerHTML = `
       <figure>
         <img class="movies__poster" src="${film.posterUrl}" alt="poster" />
       </figure>
       <div class="movies__text">
       <div class="movies__title">
          ${film.nameRu}
        </div>
        <div class="movies__genres">
             ${film.genres.map((genre) => ` ${genre.genre}`)}
        </div>
            ${film.rating && `<div class="movies__rating movies__rating--${getClassByRate(film.rating)}"> ${film.rating} </div>`}
       </div>
    `;

    moviesBlock.append(movieEl);
  });
};   

function paginator(currentPage) {  
  moviesBtn.addEventListener('click', () => {
    getMovies(API_URL_POPULAR, ++currentPage);
  });     
};

paginator(currentPage)

const searchForm = document.querySelector('.header__search-panel');
const searchInput = document.querySelector('.header__input');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const apiSearchUrl = `${API_URL_SEARCH}${searchInput.value}`;

  if(searchInput.value) {
    getMovies(apiSearchUrl, currentPage);
  }

  searchInput.value = '';
  document.querySelector(".movies").innerHTML = "";
  
  moviesBtn.classList.add('hide');
})

