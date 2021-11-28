import {createMenuTemplate} from './view/menu.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createRankTemplate} from './view/rank.js';
import {createDetailInfoPopupTemplate} from './view/detail-info-popup.js';
import {createFilmQuantityTemplate} from './view/film-quantity.js';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsLists = siteMainElement.querySelector('.films');
const mainFilmList = filmsLists.querySelector('.films-list');
const mainFilmListContainer = mainFilmList.querySelector('.films-list__container');
const body = document.querySelector('body');
const footer = document.querySelector('footer');


renderTemplate(siteMainElement, createMenuTemplate(), RenderPosition.AFTERBEGIN);
for (let i =0; i<=4; i++) {
  renderTemplate(mainFilmListContainer, createFilmCardTemplate(),RenderPosition.AFTERBEGIN);
}
renderTemplate(mainFilmList, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);
renderTemplate(header, createRankTemplate(), RenderPosition.BEFOREEND);
renderTemplate(body, createDetailInfoPopupTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footer, createFilmQuantityTemplate(), RenderPosition.BEFOREEND);
