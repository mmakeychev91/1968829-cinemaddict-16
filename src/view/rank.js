import {
  createElement
} from '../render';

const createRankTemplate = (rank) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class Rank {
  #props;
  constructor(rank) {
    this.#props = rank;
  }

  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createRankTemplate(this.#props);
  }

  removeElement() {
    this.#element = null;
  }
}
