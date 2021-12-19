import {createMenuTemplate} from './view/menu.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createRankTemplate} from './view/rank.js';
import {createDetailInfoPopupTemplate} from './view/detail-info-popup.js';
import {createFilmQuantityTemplate} from './view/film-quantity.js';
import {createFilmWrapper} from './view/films-list.js';
import {generateDetailFilmCard} from './mock/film';
import {generateFilmCard} from './mock/film';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const FILM_CARDS_AMOUNT = 25;
console.log(generateDetailFilmCard());
const detailFilmCards = Array.from({length: 1}, generateDetailFilmCard);
const filmCards = Array.from({length: FILM_CARDS_AMOUNT}, generateDetailFilmCard);

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderTemplate(siteMainElement, createMenuTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createFilmWrapper(), RenderPosition.BEFOREEND);

const filmsLists = siteMainElement.querySelector('.films');
const mainFilmList = filmsLists.querySelector('.films-list');
const mainFilmListContainer = mainFilmList.querySelector('.films-list__container');
const body = document.querySelector('body');
const footer = document.querySelector('footer');

for (let i =0; i < FILM_CARDS_AMOUNT; i++) {
  renderTemplate(mainFilmListContainer, createFilmCardTemplate(),RenderPosition.AFTERBEGIN);
}
renderTemplate(mainFilmList, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);
renderTemplate(header, createRankTemplate(), RenderPosition.BEFOREEND);
renderTemplate(body, createDetailInfoPopupTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footer, createFilmQuantityTemplate(), RenderPosition.BEFOREEND);

