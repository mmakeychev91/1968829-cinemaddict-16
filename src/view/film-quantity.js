import {createElement} from '../render';

const createFilmQuantityTemplate = (filmQuantity) => (`<p>${filmQuantity.toLocaleString('ru')} movies inside</p>`);

export default class FilmQuantity {
	#props;
	constructor(filmQuantity) {
		this.#props = filmQuantity;
	}

	#element = null;

	get element() {
		if (!this.#element) {
			this.#element = createElement(this.template);
		}

		return this.#element;
	}

	get template() {
		return createFilmQuantityTemplate(this.#props);
	}

	removeElement() {
		this.#element = null;
	}
}
