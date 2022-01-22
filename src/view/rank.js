import AbstractView from './abstract-view.js';

const createRankTemplate = (rank) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class Rank extends AbstractView {
  #props;
  constructor(rank) {
    super();
    this.#props = rank;
  }

  get template() {
    return createRankTemplate(this.#props);
  }
}
