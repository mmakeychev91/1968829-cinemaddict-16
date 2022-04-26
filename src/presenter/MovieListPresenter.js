import FilmCard from '../view/film-card.js';
import DetailInfoPopup from '../view/detail-info-popup.js';
import ShowMoreButton from '../view/show-more-button.js';
import FilmWrapper from '../view/films-list.js';
import MenuView from '../view/menu.js';
import Sort from '../view/sort.js';
import {
  render,
  RenderPosition,
  replace,
  remove
} from './../utils/render';

const FILM_CARDS_AMOUNT_PER_STEP = 5;
const body = document.querySelector('body');

export default class MovieListPresenter {
  #siteMainElement = null;
  #menuView = null;
  #filmCard = null;
  #detailInfoPopup = null;

  #showMoreButton = new ShowMoreButton();
  #filmWrapper = new FilmWrapper();
  #mainFilmList = this.#filmWrapper.element.querySelector('.films-list');
  #mainFilmCardContainer = this.#filmWrapper.element.querySelector('.films-list__container');
  #sort = new Sort();

  #filmCards = [];

  constructor(siteMainElement) {
    this.#siteMainElement = siteMainElement;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards.sort((a, b) => a.id > b.id ? -1 : 1)];
    // Метод для инициализации (начала работы) модуля,
    render(this.#siteMainElement, this.#filmWrapper, RenderPosition.BEFOREEND);
    const sort = this.#sort;
    render(this.#siteMainElement, sort, RenderPosition.AFTERBEGIN);
    if (this.#filmCards.length === 0) {
      remove(sort);
    }

    this.#renderMenuView(this.#filmCards);
    this.#renderFilmCards(this.#filmCards);
  }

  #renderMenuView = (arrow) => {
    const prevMenuView = this.#menuView;
    this.#menuView = new MenuView({
      watchlist: arrow.filter((obj) => obj.isWatchlist === true).length,
      history: arrow.filter((obj) => obj.isWatched === true).length,
      favorite: arrow.filter((obj) => obj.isFavorite === true).length,
    });
    if (prevMenuView === null) {
      render(this.#siteMainElement, this.#menuView, RenderPosition.AFTERBEGIN);
      return;

    }
    if (this.#siteMainElement.contains(prevMenuView.element)) {
      replace(this.#menuView, prevMenuView);

    }
    remove(prevMenuView);
  };

  #renderShowButton = () => {
    render(this.#mainFilmList, this.#showMoreButton, RenderPosition.BEFOREEND);

  }

  #renderPopup = (currentPopup) => {
    render(body, currentPopup, RenderPosition.BEFOREEND);
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

  #clickFilmCard = (obj, filmCard) => {

    this.#filmCard.setOpenClickHandler(() => {
      this.#detailInfoPopup = new DetailInfoPopup(obj);
      this.#renderPopup(this.#detailInfoPopup);
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, this.#detailInfoPopup));
      this.#clickClosePopup(this.#detailInfoPopup);
      this.#changeDataPopup(obj, this.#detailInfoPopup, filmCard);
    });

  }

  #clickShowMoreButton = (renderedFilmCardCount, arr) => {
    this.#showMoreButton.setShowMoreClickHandler(() => {
      arr
        .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARDS_AMOUNT_PER_STEP)
        .forEach((nextObject) => {
          this.#filmCard = new FilmCard(nextObject);
          this.#createFilmCards(nextObject, this.#filmCard);
          this.#changeData(nextObject, this.#filmCard);
        });

      renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

      if (renderedFilmCardCount >= this.#filmCards.length) {
        remove(this.#showMoreButton);
      }
    });
  }

  #changeData = (currentObject, filmCard) => {
    const changeDataCondition = (objectName, currentButton) => {
      if (currentObject[objectName] === false) {

        currentButton.classList.add('film-card__controls-item--active');
        currentObject[objectName] = true;

      } else {

        currentButton.classList.remove('film-card__controls-item--active');
        currentObject[objectName] = false;
      }
      this.#renderMenuView(this.#filmCards);
    };
    filmCard.setClickWatchlist(() => {
      const currentButton = filmCard.element.querySelector('.film-card__controls-item--add-to-watchlist');
      changeDataCondition('isWatchlist', currentButton);
    });
    filmCard.setClickWatched(() => {
      const currentButton = filmCard.element.querySelector('.film-card__controls-item--mark-as-watched');
      changeDataCondition('isWatched', currentButton);
    });
    filmCard.setClickFavorite(() => {
      const currentButton = filmCard.element.querySelector('.film-card__controls-item--favorite');
      changeDataCondition('isFavorite', currentButton);
    });
  }


  #changeDataPopup = (currentObject, filmCard, smallCard) => {
    //TODO Нужно сделать рефакторинг: в changeDate и changeDatePopup не DRY
    const changeDataCondition = (objectName, currentButton, currentSmallButton) => {
      if (currentObject[objectName] === false) {

        currentButton.classList.add('film-details__control-button--active');
        currentSmallButton.classList.add('film-card__controls-item--active');
        currentObject[objectName] = true;

      } else {

        currentButton.classList.remove('film-details__control-button--active');
        currentSmallButton.classList.remove('film-card__controls-item--active');
        currentObject[objectName] = false;
      }
      this.#renderMenuView(this.#filmCards);
    };

    filmCard.setClickWatchlist(() => {
      const currentButton = filmCard.element.querySelector('.film-details__control-button--watchlist');
      const currentSmallButton = smallCard.element.querySelector('.film-card__controls-item--add-to-watchlist');
      changeDataCondition('isWatchlist', currentButton, currentSmallButton);

    });
    filmCard.setClickWatched(() => {
      const currentButton = filmCard.element.querySelector('.film-details__control-button--watched');
      const currentSmallButton = smallCard.element.querySelector('.film-card__controls-item--mark-as-watched');
      changeDataCondition('isWatched', currentButton, currentSmallButton);

    });
    filmCard.setClickFavorite(() => {
      const currentButton = filmCard.element.querySelector('.film-details__control-button--favorite');
      const currentSmallButton = smallCard.element.querySelector('.film-card__controls-item--favorite');
      changeDataCondition('isFavorite', currentButton, currentSmallButton);

    });


  }

  #renderCertainQuantityCards = (arr) => {
    //метод отрисовки n количества карточек за раз
    for (let i = 0; i < Math.min(arr.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
      const currentObject = arr[i];
      this.#filmCard = new FilmCard(currentObject);
      this.#createFilmCards(currentObject, this.#filmCard);
      this.#changeData(currentObject, this.#filmCard);
    }
  }


  #conditionRenderCardsAndButton = (arr) => {
    if (arr.length > FILM_CARDS_AMOUNT_PER_STEP) {
      const renderedFilmCardCount = FILM_CARDS_AMOUNT_PER_STEP;
      this.#renderShowButton();
      this.#clickShowMoreButton(renderedFilmCardCount, arr);
    }

  };

  #createFilmCards = (obj, filmCard) => {


    this.#renderFilmCard(filmCard);


    this.#clickFilmCard(obj, filmCard);


  };

  #renderFilmCard = (filmCard) => {

    render(this.#mainFilmCardContainer, filmCard, RenderPosition.BEFOREEND);
  };

  #rerenderCards = (arr) => {
    while (this.#mainFilmCardContainer.firstChild) {
      this.#mainFilmCardContainer.removeChild(this.#mainFilmCardContainer.firstChild);
    }
    this.#renderCertainQuantityCards(arr);
  };

  #compareArray = (oldArr, arr) => {
    let num = 0;
    for (let i = 0; i <= arr.length; i++) {
      if (oldArr[i] === arr[i]) {
        num++;
        if (num === arr.length) {
          return null;
        } else {
          this.#rerenderCards(arr);
        }
      }
    }
  };

  #renderFilmCards = (arr) => {
    this.#sort.setClickDefaultSort(() => {
      const oldArr = arr.slice(0);
      arr.sort((a, b) => a.id > b.id ? -1 : 1);
      this.#compareArray(oldArr, arr);
    });
    this.#sort.setClickRatingSort(() => {
      const oldArr = arr.slice(0);
      arr.sort((a, b) => a.rating > b.rating ? -1 : 1);
      this.#compareArray(oldArr, arr);
    });

    this.#sort.setClickDateSort(() => {
      const oldArr = arr.slice(0);
      arr.sort((a, b) => a.releaseDate > b.releaseDate ? -1 : 1);
      this.#compareArray(oldArr, arr);
    });

    this.#renderCertainQuantityCards(arr);
    this.#conditionRenderCardsAndButton(arr);
  };
}
