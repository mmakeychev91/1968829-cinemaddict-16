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
render(siteMainElement, new Sort().element, RenderPosition.BEFOREEND);
render(siteMainElement, new Stats().element, RenderPosition.BEFOREEND);
render(siteMainElement, new FilmWrapper().element, RenderPosition.BEFOREEND);

const filmsLists = siteMainElement.querySelector('.films');
const mainFilmList = filmsLists.querySelector('.films-list');
const mainFilmListContainer = mainFilmList.querySelector('.films-list__container');
const body = document.querySelector('body');
const footer = document.querySelector('footer');

for (let i = 0; i < Math.min(filmCards.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
  const filmCard = new FilmCard(filmCards[i]);
  const detailInfoCardPopup = new DetailInfoPopup(filmCards[i]);
  render(mainFilmListContainer, filmCard.element, RenderPosition.BEFOREEND);
  filmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
    render(body, detailInfoCardPopup.element, RenderPosition.BEFOREEND);
    body.classList.add('hide-overflow');
  });
  detailInfoCardPopup.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    body.removeChild(detailInfoCardPopup.element);
    body.classList.remove('hide-overflow');
  });


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
        render(mainFilmListContainer, nextFilmCard.element, RenderPosition.BEFOREEND);
        nextFilmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
          render(body, nextDetailInfoPopup.element, RenderPosition.BEFOREEND);
          body.classList.add('hide-overflow');
        });
        nextDetailInfoPopup.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
          body.removeChild(nextDetailInfoPopup.element);
          body.classList.remove('hide-overflow');
        });

      });

    renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

    if (renderedFilmCardCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}

render(header, new Rank('Movie Buff').element, RenderPosition.BEFOREEND);
render(footer, new FilmQuantity(filmCards.length).element, RenderPosition.BEFOREEND);
