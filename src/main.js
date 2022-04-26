import Rank from './view/rank.js';
import FilmQuantity from './view/film-quantity.js';
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
//TODO: создать метод у калсса для динамического изменения ранга
const rank = new Rank('Movie Buff');
const sort = new Sort();
const footer = document.querySelector('footer');

render(header, rank, RenderPosition.BEFOREEND);
render(siteMainElement, sort, RenderPosition.BEFOREEND);
render(siteMainElement, new Stats(), RenderPosition.BEFOREEND);
render(footer, new FilmQuantity(filmCards.length), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement);
movieListPresenter.init(filmCards);

const mainFilmList = siteMainElement.querySelector('.films-list');
const mainFilmListContainer = mainFilmList.querySelector('.films-list__container');
const filmListTitle = mainFilmList.querySelector('.films-list__title');


if (filmCards.length === 0) {
  filmListTitle.textContent = 'There are no movies in our database';
  remove(sort);
  remove(rank);
  mainFilmList.removeChild(mainFilmListContainer);
}
