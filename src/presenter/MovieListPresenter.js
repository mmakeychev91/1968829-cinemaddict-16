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
  #sortView = new Sort();
  #sortBtn = this.#sortView.element.querySelectorAll('.sort__button');

  #filmCards = [];

  constructor(siteMainElement) {
    this.#siteMainElement = siteMainElement;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards.sort((a, b) => a.id > b.id ? -1 : 1)];
    // Метод для инициализации (начала работы) модуля,
    render(this.#siteMainElement, this.#filmWrapper, RenderPosition.BEFOREEND);
    const sort = this.#sortView;
    render(this.#siteMainElement, sort, RenderPosition.AFTERBEGIN);
    if (this.#filmCards.length === 0) {
      remove(sort);
    }

    this.#renderMenuView(this.#filmCards);
    this.#renderFilmCards(this.#filmCards);
  }

  #renderMenuView = (filmCardsArrow) => {
    const prevMenuView = this.#menuView;
    const watchlist = [];
    const history = [];
    const favorite = [];
    for (const currentFilmCardsArrow of filmCardsArrow) {
      if (currentFilmCardsArrow.isWatchlist) {
        watchlist.push(currentFilmCardsArrow);
      }
      if (currentFilmCardsArrow.isWatched) {
        history.push(currentFilmCardsArrow);
      }
      if (currentFilmCardsArrow.isFavorite) {
        favorite.push(currentFilmCardsArrow);
      }
    }
    this.#menuView = new MenuView({
      watchlist: watchlist.length,
      history: history.length,
      favorite: favorite.length,
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
    this.#siteMainElement.classList.add('detail-card--open');
  }

  #closePopup = (detailInfoCardPopup) => {
    remove(detailInfoCardPopup);
    body.classList.remove('hide-overflow');
    this.#siteMainElement.classList.remove('detail-card--open');
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
      this.#toggleStatusPopupCard(obj, this.#detailInfoPopup, filmCard);
      this.#toggleStatusPreviewCard(obj, filmCard, this.#detailInfoPopup);
    });

  }

  #clickShowMoreButton = (renderedFilmCardCount, arr) => {
    this.#showMoreButton.setShowMoreClickHandler(() => {
      arr
        .slice(renderedFilmCardCount, renderedFilmCardCount + FILM_CARDS_AMOUNT_PER_STEP)
        .forEach((nextObject) => {
          this.#filmCard = new FilmCard(nextObject);
          this.#createFilmCards(nextObject, this.#filmCard);
          this.#toggleStatusPreviewCard(nextObject, this.#filmCard);
        });

      renderedFilmCardCount += FILM_CARDS_AMOUNT_PER_STEP;

      if (renderedFilmCardCount >= this.#filmCards.length) {
        remove(this.#showMoreButton);
      }
    });
  }

  #toggleStatusFirstCondition = (currentButton, currentSmallButton, currentPopupButton) => {
    if (currentButton.classList.contains('film-details__control-button')) {
      currentButton.classList.add('film-details__control-button--active');
      currentSmallButton.classList.add('film-card__controls-item--active');
    } else {
      currentButton.classList.add('film-card__controls-item--active');
      if (this.#siteMainElement.classList.contains('detail-card--open')) {
        currentPopupButton.classList.add('film-details__control-button--active');
      }
    }
  }

  #toggleStatusSecondaryCondition = (currentButton, currentSmallButton, currentPopupButton) => {
    if (currentButton.classList.contains('film-details__control-button')) {
      currentButton.classList.remove('film-details__control-button--active');
      currentSmallButton.classList.remove('film-card__controls-item--active');
    } else {
      currentButton.classList.remove('film-card__controls-item--active');
      if (this.#siteMainElement.classList.contains('detail-card--open')) {
        currentPopupButton.classList.remove('film-details__control-button--active');
      }
    }
  }

  #toggleFavoriteStatus = (currentButton, currentObject, currentSmallButton, currentPopupButton) => {
    this.#detailInfoPopup = new DetailInfoPopup(currentObject);
    if (currentObject['isFavorite'] === false) {
      this.#toggleStatusFirstCondition(currentButton, currentSmallButton, currentPopupButton);
      currentObject['isFavorite'] = true;

    } else {
      this.#toggleStatusSecondaryCondition(currentButton, currentSmallButton, currentPopupButton);
      currentObject['isFavorite'] = false;
    }
    this.#renderMenuView(this.#filmCards);
  }

  #toggleHistoryStatus = (currentButton, currentObject, currentSmallButton, currentPopupButton) => {
    this.#detailInfoPopup = new DetailInfoPopup(currentObject);
    if (currentObject['isWatched'] === false) {
      this.#toggleStatusFirstCondition(currentButton, currentSmallButton, currentPopupButton);
      currentObject['isWatched'] = true;

    } else {
      this.#toggleStatusSecondaryCondition(currentButton, currentSmallButton, currentPopupButton);
      currentObject['isWatched'] = false;
    }
    this.#renderMenuView(this.#filmCards);
  }

  #toggleWhatchlistStatus = (currentButton, currentObject, currentSmallButton, currentPopupButton) => {
    this.#detailInfoPopup = new DetailInfoPopup(currentObject);
    if (currentObject['isWatchlist'] === false) {
      this.#toggleStatusFirstCondition(currentButton, currentSmallButton, currentPopupButton);
      currentObject['isWatchlist'] = true;

    } else {
      this.#toggleStatusSecondaryCondition(currentButton, currentSmallButton, currentPopupButton);
      currentObject['isWatchlist'] = false;
    }
    this.#renderMenuView(this.#filmCards);
  }

  #toggleStatusPreviewCard = (currentObject, filmCard, cardPopup) => {
    filmCard.setClickWatchlist(() => {
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, cardPopup));
      const currentButton = filmCard.element.querySelector('.film-card__controls-item--add-to-watchlist');
      if (this.#siteMainElement.classList.contains('detail-card--open')) {
        const currentPopupButton = cardPopup.element.querySelector('.film-details__control-button--watchlist');
        this.#toggleWhatchlistStatus(currentButton, currentObject, '', currentPopupButton);
      } else {
        this.#toggleWhatchlistStatus(currentButton, currentObject);
      }
    });
    filmCard.setClickWatched(() => {
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, cardPopup));
      const currentButton = filmCard.element.querySelector('.film-card__controls-item--mark-as-watched');
      if (this.#siteMainElement.classList.contains('detail-card--open')) {
        const currentPopupButton = cardPopup.element.querySelector('.film-details__control-button--watched');
        this.#toggleHistoryStatus(currentButton, currentObject, '', currentPopupButton);
      } else {
        this.#toggleHistoryStatus(currentButton, currentObject);
      }
    });
    filmCard.setClickFavorite(() => {
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, cardPopup));
      const currentButton = filmCard.element.querySelector('.film-card__controls-item--favorite');
      if (this.#siteMainElement.classList.contains('detail-card--open')) {
        const currentPopupButton = cardPopup.element.querySelector('.film-details__control-button--favorite');
        this.#toggleFavoriteStatus(currentButton, currentObject, '', currentPopupButton);
      } else {
        this.#toggleFavoriteStatus(currentButton, currentObject);
      }
    });
  }

  #toggleStatusPopupCard = (currentObject, detailFilmCard, smallCard) => {
    detailFilmCard.setClickWatchlist(() => {
      const currentButton = detailFilmCard.element.querySelector('.film-details__control-button--watchlist');
      const currentSmallButton = smallCard.element.querySelector('.film-card__controls-item--add-to-watchlist');
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, detailFilmCard));
      this.#toggleWhatchlistStatus(currentButton, currentObject, currentSmallButton);
    });
    detailFilmCard.setClickWatched(() => {
      const currentButton = detailFilmCard.element.querySelector('.film-details__control-button--watched');
      const currentSmallButton = smallCard.element.querySelector('.film-card__controls-item--mark-as-watched');
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, detailFilmCard));
      this.#toggleHistoryStatus(currentButton, currentObject, currentSmallButton);

    });
    detailFilmCard.setClickFavorite(() => {
      const currentButton = detailFilmCard.element.querySelector('.film-details__control-button--favorite');
      const currentSmallButton = smallCard.element.querySelector('.film-card__controls-item--favorite');
      document.addEventListener('keydown', (evt) => this.#escOpenPopup(evt, detailFilmCard));
      this.#toggleFavoriteStatus(currentButton, currentObject, currentSmallButton);

    });
  }

  #renderCertainQuantityCards = (arr) => {
    //метод отрисовки n количества карточек за раз
    for (let i = 0; i < Math.min(arr.length, FILM_CARDS_AMOUNT_PER_STEP); i++) {
      const currentObject = arr[i];
      this.#filmCard = new FilmCard(currentObject);
      this.#createFilmCards(currentObject, this.#filmCard);
      this.#toggleStatusPreviewCard(currentObject, this.#filmCard);
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

  #renderFilmCards = (arr) => {
    this.#sortView.setClickDefaultSort(() => {
      for (const currentSortBtn of this.#sortBtn) {
        const sortBtnDataset = currentSortBtn.dataset.sort;
        if (!currentSortBtn.classList.contains('sort__button--active') && sortBtnDataset === 'default') {
          arr.sort((a, b) => a.id > b.id ? -1 : 1);
          this.#rerenderCards(arr);
          currentSortBtn.classList.add('sort__button--active');
        } else {
          if (sortBtnDataset !== 'default') {
            currentSortBtn.classList.remove('sort__button--active');
          }
        }
      }
    });
    this.#sortView.setClickRatingSort(() => {
      for (const currentSortBtn of this.#sortBtn) {
        const sortBtnDataset = currentSortBtn.dataset.sort;
        if (!currentSortBtn.classList.contains('sort__button--active') && sortBtnDataset === 'rating') {
          arr.sort((a, b) => a.rating > b.rating ? -1 : 1);
          this.#rerenderCards(arr);
          currentSortBtn.classList.add('sort__button--active');
        } else {
          if (sortBtnDataset !== 'rating') {
            currentSortBtn.classList.remove('sort__button--active');
          }
        }
      }
    });

    this.#sortView.setClickDateSort(() => {
      for (const currentSortBtn of this.#sortBtn) {
        const sortBtnDataset = currentSortBtn.dataset.sort;
        if (!currentSortBtn.classList.contains('sort__button--active') && sortBtnDataset === 'date') {
          arr.sort((a, b) => a.releaseDate > b.releaseDate ? -1 : 1);
          this.#rerenderCards(arr);
          currentSortBtn.classList.add('sort__button--active');
        } else {
          if (sortBtnDataset !== 'date') {
            currentSortBtn.classList.remove('sort__button--active');
          }
        }
      }
    });

    this.#renderCertainQuantityCards(arr);
    this.#conditionRenderCardsAndButton(arr);
  };
}
