import MenuView from './view/menu.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createRankTemplate} from './view/rank.js';
import {createDetailInfoPopupTemplate} from './view/detail-info-popup.js';
import {createFilmQuantityTemplate} from './view/film-quantity.js';
import {createFilmWrapper} from './view/films-list.js';
import {createStatsTemplate} from './view/stats.js';
import {createSortTemplate} from './view/sort.js';
import {generateFilmCard} from './mock/film.js';
import {renderTemplate, renderElement, RenderPosition} from './render';

const FILM_CARDS_AMOUNT_PER_STEP = 5;
const filmCards = Array.from({length: 25}, generateFilmCard);

const header = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const sampleWatchlist = filmCards.filter((obj) => obj.isWatchlist === true).length;
const sampleWatched = filmCards.filter((obj) => obj.isWatched === true).length;
const sampleFavorite = filmCards.filter((obj) => obj.isFavorite === true).length;

renderElement(siteMainElement, new MenuView().element, RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createStatsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmWrapper(), RenderPosition.BEFOREEND);

const filmsLists = siteMainElement.querySelector('.films');
const mainFilmList = filmsLists.querySelector('.films-list');
const mainFilmListContainer = mainFilmList.querySelector('.films-list__container');
const body = document.querySelector('body');
const footer = document.querySelector('footer');

for (let i =0; i < Math.min(filmCards.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
  renderTemplate(mainFilmListContainer, createFilmCardTemplate(filmCards[i]),RenderPosition.BEFOREEND);
}


if (filmCards.length > FILM_CARDS_AMOUNT_PER_STEP) {
  let renderedFilmCardCount = FILM_CARDS_AMOUNT_PER_STEP;
  renderTemplate(mainFilmList, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);
  const loadMoreButton = mainFilmList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARDS_AMOUNT_PER_STEP)
      .forEach((filmCard) => renderTemplate(mainFilmListContainer, createFilmCardTemplate(filmCard), RenderPosition.BEFOREEND));

    renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

    if (renderedFilmCardCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}

renderTemplate(header, createRankTemplate('Movie Buff'), RenderPosition.BEFOREEND);
renderTemplate(body, createDetailInfoPopupTemplate(filmCards[0]), RenderPosition.BEFOREEND);
renderTemplate(footer, createFilmQuantityTemplate(filmCards.length), RenderPosition.BEFOREEND);

