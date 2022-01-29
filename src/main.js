import MenuView from './view/menu.js';
import Rank from './view/rank.js';
import FilmQuantity from './view/film-quantity.js';
import FilmWrapper from './view/films-list.js';
import Stats from './view/stats.js';
import Sort from './view/sort.js';
import {
  generateFilmCard
} from './mock/film.js';
import {
  render,
  RenderPosition,
  remove
} from './utils/render';
import MovieListPresenter from './presenter/MovieListPresenter.js';

const filmCards = Array.from({
  length: 25
}, generateFilmCard);

const header = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteMainElement, new MenuView({
  watchlist: filmCards.filter((obj) => obj.isWatchlist === true).length,
  history: filmCards.filter((obj) => obj.isWatched === true).length,
  favorite: filmCards.filter((obj) => obj.isFavorite === true).length,
}), RenderPosition.AFTERBEGIN);

const rank = new Rank('Movie Buff');
const sort = new Sort();
render(header, rank, RenderPosition.BEFOREEND);
render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, new Stats(), RenderPosition.BEFOREEND);

const filmWrapper = new FilmWrapper();
render(siteMainElement, filmWrapper, RenderPosition.BEFOREEND);

const filmsLists = siteMainElement.querySelector('.films');
const mainFilmList = filmsLists.querySelector('.films-list');
const mainFilmListContainer = mainFilmList.querySelector('.films-list__container');
const filmListTitle = filmWrapper.element.querySelector('.films-list__title');
const body = document.querySelector('body');
const footer = document.querySelector('footer');

if (filmCards.length === 0) {
  filmListTitle.textContent = 'There are no movies in our database';
  remove(sort);
  remove(rank);
  mainFilmList.removeChild(mainFilmListContainer);
}

render(footer, new FilmQuantity(filmCards.length), RenderPosition.BEFOREEND);
const movieListPresenter = new MovieListPresenter(mainFilmListContainer);
movieListPresenter.init(filmCards);
