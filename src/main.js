import MenuView from './view/menu.js';
import FilmCard from './view/film-card.js';
import ShowMoreButton from './view/show-more-button.js';
import Rank from './view/rank.js';
import DetailInfoPopup from './view/detail-info-popup.js';
import FilmQuantity from './view/film-quantity.js';
import FilmWrapper from './view/films-list.js';
import Stats from './view/stats.js';
import Sort from './view/sort.js';
import {
  generateFilmCard
} from './mock/film.js';
import {
  render,
  RenderPosition
} from './render';

const FILM_CARDS_AMOUNT_PER_STEP = 5;
const filmCards = Array.from({
  length: 25
}, generateFilmCard);

const header = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteMainElement, new MenuView({
  watchlist: filmCards.filter((obj) => obj.isWatchlist === true).length,
  history: filmCards.filter((obj) => obj.isWatched === true).length,
  favorite: filmCards.filter((obj) => obj.isFavorite === true).length,
}).element, RenderPosition.AFTERBEGIN);

const rank = new Rank('Movie Buff');
const sort = new Sort();
render(header, rank.element, RenderPosition.BEFOREEND);
render(siteMainElement, sort.element, RenderPosition.BEFOREEND);
render(siteMainElement, new Stats().element, RenderPosition.BEFOREEND);

const filmWrapper = new FilmWrapper();
render(siteMainElement, filmWrapper.element, RenderPosition.BEFOREEND);

const filmsLists = siteMainElement.querySelector('.films');
const mainFilmList = filmsLists.querySelector('.films-list');
const mainFilmListContainer = mainFilmList.querySelector('.films-list__container');
const filmListTitle = filmWrapper.element.querySelector('.films-list__title');
const body = document.querySelector('body');
const footer = document.querySelector('footer');

if (filmCards.length === 0) {
  filmListTitle.textContent = 'There are no movies in our database';
  siteMainElement.removeChild(sort.element);
  header.removeChild(rank.element);
  mainFilmList.removeChild(mainFilmListContainer);
}

const createFilmCards = (filmCard, detailInfoCardPopup) => {
  render(mainFilmListContainer, filmCard.element, RenderPosition.BEFOREEND);
  filmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
    render(body, detailInfoCardPopup.element, RenderPosition.BEFOREEND);
    body.classList.add('hide-overflow');
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        body.removeChild(detailInfoCardPopup.element);
        body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    document.addEventListener('keydown', onEscKeyDown);
  });
  detailInfoCardPopup.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    body.removeChild(detailInfoCardPopup.element);
    body.classList.remove('hide-overflow');
  });
};

for (let i = 0; i < Math.min(filmCards.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
  const filmCard = new FilmCard(filmCards[i]);
  const detailInfoCardPopup = new DetailInfoPopup(filmCards[i]);
  createFilmCards(filmCard, detailInfoCardPopup);
}

if (filmCards.length > FILM_CARDS_AMOUNT_PER_STEP) {
  let renderedFilmCardCount = FILM_CARDS_AMOUNT_PER_STEP;
  render(mainFilmList, new ShowMoreButton().element, RenderPosition.BEFOREEND);
  const loadMoreButton = mainFilmList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARDS_AMOUNT_PER_STEP)
      .forEach((filmCard) => {
        const nextFilmCard = new FilmCard(filmCard);
        const nextDetailInfoPopup = new DetailInfoPopup(filmCard);
        createFilmCards(nextFilmCard, nextDetailInfoPopup);
      });

    renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

    if (renderedFilmCardCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}

render(footer, new FilmQuantity(filmCards.length).element, RenderPosition.BEFOREEND);
