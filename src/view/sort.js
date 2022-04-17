import AbstractView from './abstract-view.js';

const createSortTemplate = () => (
  `<ul class="sort">
      <li><a href="#" data-sort="default" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort="date" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort="rating" class="sort__button">Sort by rating</a></li>
    </ul>`
);

export default class Sort extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setClickDefaultSort = (callback) => {
    this._callback.clickDefaultSort = callback;
    this.element.querySelector('[data-sort="default"]').addEventListener('click', this.#clickDefaultSort);
  }

  #clickDefaultSort = (evt) => {
    evt.preventDefault();
    this._callback.clickDefaultSort();
  }

  setClickDateSort = (callback) => {
    this._callback.clickDateSort = callback;
    this.element.querySelector('[data-sort="date"]').addEventListener('click', this.#clickDateSort);
  }

  #clickDateSort = (evt) => {
    evt.preventDefault();
    this._callback.clickDateSort();
  }

  setClickRatingSort = (callback) => {
    this._callback.clickRatingSort = callback;
    this.element.querySelector('[data-sort="rating"]').addEventListener('click', this.#clickRatingSort);
  }

  #clickRatingSort = (evt) => {
    evt.preventDefault();
    this._callback.clickRatingSort();
  }
}
