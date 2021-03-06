import AbstractView from './abstract-view.js';

//note: Функцию для генерации HTML-разметки можно превратить в метод класса, однако делать мы этого не будем, чтобы не раздувать diff изменений
const createSiteMenuTemplate = ({
  watchlist,
  history,
  favorite,
}) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  <ul class="sort visually-hidden">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
);

export default class MenuView extends AbstractView {
  #props;
  constructor(props) {
    super();
    this.#props = props;
  }

  get template() {
    return createSiteMenuTemplate(this.#props);
  }
}
