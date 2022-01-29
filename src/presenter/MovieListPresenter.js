import FilmCard from '../view/film-card.js';
import DetailInfoPopup from '../view/detail-info-popup.js';
import ShowMoreButton from '../view/show-more-button.js';
import {
  render,
  RenderPosition
} from './../utils/render';

const FILM_CARDS_AMOUNT_PER_STEP = 5;
const body = document.querySelector('body');

export default class MovieListPresenter {
  #filmCardsContainer = null;

  #filmCard = (callback) => new FilmCard(callback);

  #detailInfoPopup = (callback) => new DetailInfoPopup(callback);

  #showMoreButton = new ShowMoreButton();

  #filmCards = [];

  constructor(filmCardsContainer) {
    this.#filmCardsContainer = filmCardsContainer;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards];
    // Метод для инициализации (начала работы) модуля,


    this.#renderFilmCards();
  }

  #renderShowButton = () => {
    render(this.#filmCardsContainer, this.#showMoreButton, RenderPosition.BEFOREEND);

  }

  #renderPopup = (detailInfoCardPopup) => {
    render(body, detailInfoCardPopup, RenderPosition.BEFOREEND);
    body.classList.add('hide-overflow');
  }

  #closePopup = () => {
    this.#detailInfoPopup.removeElement();
    body.classList.remove('hide-overflow');
  };

  #clickClosePopup = () => {
    this.#detailInfoPopup.setCloseClickHandler(() => {
      this.#closePopup();
    });

  }

  #escOpenPopup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#escOpenPopup());
    }
  };

  #clickFilmCard = (filmCard, detailInfoCardPopup) => {
    filmCard.setOpenClickHandler(() => {
      this.#renderPopup(detailInfoCardPopup);
      document.addEventListener('keydown', this.#escOpenPopup());
    });

  }

  #clickShowMoreButton = () => {
    this.#showMoreButton.setShowMoreClickHandler(() => {
      let renderedFilmCardCount = FILM_CARDS_AMOUNT_PER_STEP;
      this.#filmCards
        .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARDS_AMOUNT_PER_STEP)
        .forEach((filmCard) => {
          this.#filmCard(filmCard);
          this.#detailInfoPopup(filmCard);
        });

      renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

      if (renderedFilmCardCount >= this.#filmCards.length) {
        this.#showMoreButton.removeElement();
      }
    });
  }

  #renderCertainQuantityCards = () => {
    //метод отрисовки n количества карточек за раз
    for (let i = 0; i < Math.min(this.#filmCards.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
      const currentFilmCard = this.#filmCard(this.#filmCards[i]);
      const currentPopup = this.#detailInfoPopup(this.#filmCards[i]);
      this.#createFilmCards(currentFilmCard, currentPopup);
      //this.#detailInfoPopup(this.#filmCards[i]);
    }
  }

  #conditionRenderCardsAndButton = () => {
    if (this.#filmCards.length > FILM_CARDS_AMOUNT_PER_STEP) {
      this.#renderShowButton();
      this.#clickShowMoreButton();
    }

  };

  #createFilmCards = (filmCard, detailInfoCardPopup) => {
    render(this.#filmCardsContainer, filmCard, RenderPosition.BEFOREEND);
    this.#clickFilmCard(filmCard, detailInfoCardPopup);
  };

  #renderFilmCards = () => {
    this.#renderCertainQuantityCards();
  };

}
