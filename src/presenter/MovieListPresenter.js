import FilmCard from '../view/film-card.js';
import DetailInfoPopup from '../view/detail-info-popup.js';
import ShowMoreButton from '../view/show-more-button.js';
import {
  render,
  RenderPosition,
  remove
} from './../utils/render';

const FILM_CARDS_AMOUNT_PER_STEP = 5;
const body = document.querySelector('body');

export default class MovieListPresenter {
  #filmCardsContainer = null;

  #filmCard = (callback) => {
    new FilmCard(callback);
  };

  #detailInfoPopup = (callback) => {
    new DetailInfoPopup(callback);
  };
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

  #renderPopup = () => {
    render(this.#filmCardsContainer, this.#detailInfoPopup, RenderPosition.BEFOREEND);
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
      this.#createFilmCards(this.#filmCard(this.#filmCards[i]));
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
    /*
    //#clickFilmCard
    filmCard.setOpenClickHandler(() => {
      //#renderPopup
      render(body, detailInfoCardPopup, RenderPosition.BEFOREEND);
      body.classList.add('hide-overflow');
      //#escOpenPopup 
      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          remove(detailInfoCardPopup);
          body.classList.remove('hide-overflow');
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };
      document.addEventListener('keydown', onEscKeyDown);
      //#clickClosePopup
      detailInfoCardPopup.setCloseClickHandler(() => {
        remove(detailInfoCardPopup);
        body.classList.remove('hide-overflow');
      });
    });*/
  };

  #renderFilmCards = () => {
    this.#renderCertainQuantityCards();

  };

};
