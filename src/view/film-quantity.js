import AbstractView from './abstract-view.js';

const createFilmQuantityTemplate = (filmQuantity) => (`<p>${filmQuantity.toLocaleString('ru')} movies inside</p>`);

export default class FilmQuantity extends AbstractView {
  #props;
  constructor(filmQuantity) {
    super();
    this.#props = filmQuantity;
  }

  get template() {
    return createFilmQuantityTemplate(this.#props);
  }
}
