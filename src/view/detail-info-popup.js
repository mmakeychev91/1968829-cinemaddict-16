import dayjs from 'dayjs';
import {
  addClassIfTrue
} from './../utils/common';
import AbstractView from './abstract-view.js';

const createDetailInfoPopupTemplate = ({
  poster,
  title,
  originalTitle,
  rating,
  director,
  writers,
  actors,
  releaseDate,
  runtime,
  country,
  genres,
  description,
  ageRating,
  comments,
  isWatchlist,
  isWatched,
  isFavorite,
}) => {
  const activeClass = 'film-details__control-button--active';
  const dateTemplate = () => {
    const now = dayjs();
    return now.add(releaseDate, 'day').format('DD MMMM YYYY ');
  };

  const genresTitleTemplate = () => {
    if (genres.length !== 1) {
      return 'Genres';
    } else {
      return 'Genre';
    }
  };
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dateTemplate()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genresTitleTemplate()}</td>
              <td class="film-details__cell">
                ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('')}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${addClassIfTrue(isWatchlist, activeClass)}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${addClassIfTrue(isWatched, activeClass)}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${addClassIfTrue(isFavorite, activeClass)}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
            ${comments.map((comment) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.message}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
            </li>`).join('')}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class DetailInfoPopup extends AbstractView {
  #props;
  constructor(props) {
    super();
    this.#props = props;
  }

  get template() {
    return createDetailInfoPopupTemplate(this.#props);
  }

  setCloseClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setClickFavorite = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#clickFavorite);
  }

  #clickFavorite = (evt) => {
    evt.preventDefault();
    this._callback.clickFavorite();
  }

  setClickWatched = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#clickWatched);
  }

  #clickWatched = (evt) => {
    evt.preventDefault();
    this._callback.clickWatched();
  }

  setClickWatchlist = (callback) => {
    this._callback.clickWatchList = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#clickWatchlist);
  }

  #clickWatchlist = (evt) => {
    evt.preventDefault();
    this._callback.clickWatchList();
  }
}
