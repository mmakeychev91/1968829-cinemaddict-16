import dayjs from 'dayjs';
import {
  addClassIfTrue
} from './../utils/common';
import AbstractView from './abstract-view.js';

const createFilmCardTemplate = ({
  title,
  poster,
  rating,
  releaseDate,
  runtime,
  genres,
  description,
  comments,
  isWatchlist,
  isWatched,
  isFavorite
}) => {
  const activeClass = 'film-card__controls-item--active';
  const dateTemplate = () => {
    const now = dayjs();
    return now.add(releaseDate, 'day').format('YYYY ');
  };
  const callDescriptionTemplate = () =>
    //Добавить условие: "Если описание фильма больше 140 символов, то в карточке отображается 139 символов описания и знак многоточие (…)."
    description;
  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${dateTemplate()}</span>
              <span class="film-card__duration">${runtime}</span>
              <span class="film-card__genre">${genres[0]}</span>
            </p>
            <img src=${poster} alt="" class="film-card__poster">
            <p class="film-card__description">${callDescriptionTemplate()}</p>
            <span class="film-card__comments">${comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addClassIfTrue(isWatchlist, activeClass)}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addClassIfTrue(isWatched,activeClass)}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${addClassIfTrue(isFavorite,activeClass)}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  #props;
  constructor(props) {
    super();
    this.#props = props;
  }

  get template() {
    return createFilmCardTemplate(this.#props);
  }

  setOpenClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  }

  setClickFavorite = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
  /*

  setClickWatched = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#clickWatched);
  }

  #clickWatched = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setClickWatchlist = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#clickWatchlist);
  }

  #clickWatchlist = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
  */
}
