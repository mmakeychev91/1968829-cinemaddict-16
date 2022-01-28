import FilmCard from '../view/film-card.js';
import DetailInfoPopup from '../view/detail-info-popup.js';
import ShowMoreButton from '../view/show-more-button.js';
import FilmWrapper from '../view/films-list';
import {
  render,
  RenderPosition,
  remove
} from './utils/render';

const FILM_CARDS_AMOUNT_PER_STEP = 5;
const body = document.querySelector('body');

export default class MovieListPresenter {
  #filmCardContainer = null;

  #filmList = new FilmWrapper();
  #filmCard = new FilmCard();
  #detailInfoPopup = new DetailInfoPopup();
  #showMoreButton = new ShowMoreButton();

  #filmCards = [];

  constructor(filmCardContainer) {
    this.#filmCardContainer = filmCardContainer;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции createFilmCards в main.js
    render(this.#filmCardContainer, this.#filmCard, RenderPosition.BEFOREEND);

    this.#createFilmCards();
  }

  #renderShowButton = () => {
    render(this.#filmCardContainer, this.#showMoreButton, RenderPosition.BEFOREEND);

  }

  #renderPopup = () => {
    render(this.#filmCardContainer, this.#detailInfoPopup, RenderPosition.BEFOREEND);
  }

  #clickFilmCard = () => {
    this.#filmCard.setOpenClickHandler(() => {
      this.#renderPopup;
      body.classList.add('hide-overflow');
      this.#escOpenPopup;
      this.#clickClosePopup;
    });

  }
  //TODO: Ну правда я бы вынес у отдельную функцию закоытие попапа. Потому что у тебя по клику и по кнопке одно и тоже должно происходить
  #clickClosePopup = () => {
    this.#detailInfoPopup.setCloseClickHandler(() => {
      this.#detailInfoPopup.removeElement();
      body.classList.remove('hide-overflow');
    });

  }
  #escOpenPopup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#detailInfoPopup.removeElement();
      body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#escOpenPopup);
    };
  };

  #clickShowMoreButton = () => {
    this.#showMoreButton.setShowMoreClickHandler(() => {
      let renderedFilmCardCount = FILM_CARDS_AMOUNT_PER_STEP;
      this.#filmCards
        .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARDS_AMOUNT_PER_STEP)
        //передать сюда в фор ич значение и создавая элементы в скобках создавать с ним
        .forEach(() => {
          this.#filmCard;
          this.#detailInfoPopup;
          this.#createFilmCards();
        });

      renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

      if (renderedFilmCardCount >= this.#filmCards.length) {
        this.#showMoreButton.removeElement();
      }
    });
  }

  #renderCertainQuantityCards = () => {
    //метод отрисовки n количества карточек за раз
    for (let i = 0; i < Math.min(this.#filmCard.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
      /*const filmCard = new FilmCard(filmCards[i]);
      const detailInfoCardPopup = new DetailInfoPopup(filmCards[i]);
      createFilmCards(filmCard, detailInfoCardPopup);*/
    }
  }

  #createFilmCards = () => {


  }

};
