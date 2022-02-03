import FilmCard from '../view/film-card.js';
import DetailInfoPopup from '../view/detail-info-popup.js';
import ShowMoreButton from '../view/show-more-button.js';
import FilmWrapper from '../view/films-list.js';
import {
  render,
  RenderPosition,
  remove
} from './../utils/render';

const FILM_CARDS_AMOUNT_PER_STEP = 5;
const body = document.querySelector('body');

export default class MovieListPresenter {
  #siteMainElement = null;

  #showMoreButton = new ShowMoreButton();
  #filmWrapper = new FilmWrapper();
  #mainFilmList = this.#filmWrapper.element.querySelector('.films-list');
  #mainFilmCardContainer = this.#filmWrapper.element.querySelector('.films-list__container');
  #filmCards = [];

  constructor(siteMainElement) {
    this.#siteMainElement = siteMainElement;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards];
    // Метод для инициализации (начала работы) модуля,
    render(this.#siteMainElement, this.#filmWrapper, RenderPosition.BEFOREEND);

    this.#renderFilmCards();
  }

  #renderShowButton = () => {
    render(this.#mainFilmList, this.#showMoreButton, RenderPosition.BEFOREEND);

  }

  #renderPopup = (detailInfoCardPopup) => {
    render(body, detailInfoCardPopup, RenderPosition.BEFOREEND);
    body.classList.add('hide-overflow');
  }

  #closePopup = (detailInfoCardPopup) => {
    remove(detailInfoCardPopup);
    body.classList.remove('hide-overflow');
  };

  #clickClosePopup = (detailInfoCardPopup) => {
    detailInfoCardPopup.setCloseClickHandler(() => {
      this.#closePopup(detailInfoCardPopup);
    });

  }

  #escOpenPopup = (evt, detailInfoCardPopup) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup(detailInfoCardPopup);
      document.removeEventListener('keydown', this.#escOpenPopup);
    }
  };

  #clickFilmCard = (filmCard, detailInfoCardPopup) => {
    filmCard.setOpenClickHandler(() => {
      this.#renderPopup(detailInfoCardPopup);
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, detailInfoCardPopup));
      this.#clickClosePopup(detailInfoCardPopup);
    });

  }

  #clickShowMoreButton = (renderedFilmCardCount) => {
    this.#showMoreButton.setShowMoreClickHandler(() => {
      this.#filmCards
        .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARDS_AMOUNT_PER_STEP)
        .forEach((filmCard) => {
          const nextFilmCard = new FilmCard(filmCard);
          const nextDetailInfoPopup = new DetailInfoPopup(filmCard);
          const nextObject = filmCard;
          this.#createFilmCards(nextFilmCard, nextDetailInfoPopup);
          this.#changeData(nextObject, nextFilmCard, nextDetailInfoPopup);
        });

      renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

      if (renderedFilmCardCount >= this.#filmCards.length) {
        remove(this.#showMoreButton);
      }
    });
  }


  #renderCertainQuantityCards = () => {
    //метод отрисовки n количества карточек за раз
    for (let i = 0; i < Math.min(this.#filmCards.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
      const currentFilmCard = new FilmCard(this.#filmCards[i]);
      const currentPopup = new DetailInfoPopup(this.#filmCards[i]);
      const currentObject = this.#filmCards[i];
      this.#createFilmCards(currentFilmCard, currentPopup);
      this.#changeData(currentObject, currentFilmCard, currentPopup);
    }
  }

  #changeData = (currentObject, currentFilmCard, currentPopup) => {
    const changeDataCondition = (objectName, currentButton) => {
      if (currentObject[objectName] === false) {
        currentButton.classList.add('film-card__controls-item--active');
        currentObject[objectName] = true;

      } else {
        currentButton.classList.remove('film-card__controls-item--active');
        currentObject[objectName] = false;
      }
    };
    currentFilmCard.setClickWatchlist(() => {
      const currentButton = currentFilmCard.element.querySelector('.film-card__controls-item--add-to-watchlist');
      changeDataCondition('isWatchlist', currentButton);
    });
    currentFilmCard.setClickWatched(() => {
      const currentButton = currentFilmCard.element.querySelector('.film-card__controls-item--mark-as-watched');
      changeDataCondition('isWatched', currentButton);
    });
    currentFilmCard.setClickFavorite(() => {
      const currentButton = currentFilmCard.element.querySelector('.film-card__controls-item--favorite');
      changeDataCondition('isFavorite', currentButton);
    });
    currentPopup.setClickWatchlist(() => {
      const currentButton = currentPopup.element.querySelector('.film-details__control-button--watchlist');
      changeDataCondition('isWatchlist', currentButton);
    });
    currentPopup.setClickWatched(() => {
      const currentButton = currentPopup.element.querySelector('.film-details__control-button--watched');
      changeDataCondition('isWatched', currentButton);
    });
    currentPopup.setClickFavorite(() => {
      const currentButton = currentPopup.element.querySelector('.film-details__control-button--watchlist');
      changeDataCondition('isFavorite', currentButton);
    });
  }

  #conditionRenderCardsAndButton = () => {
    if (this.#filmCards.length > FILM_CARDS_AMOUNT_PER_STEP) {
      const renderedFilmCardCount = FILM_CARDS_AMOUNT_PER_STEP;
      this.#renderShowButton();
      this.#clickShowMoreButton(renderedFilmCardCount);
    }

  };

  #createFilmCards = (filmCard, detailInfoCardPopup) => {
    render(this.#mainFilmCardContainer, filmCard, RenderPosition.BEFOREEND);
    this.#clickFilmCard(filmCard, detailInfoCardPopup);
  };


  #renderFilmCards = () => {
    this.#renderCertainQuantityCards();
    this.#conditionRenderCardsAndButton();
    console.log(this.#filmCards);
  };
}
