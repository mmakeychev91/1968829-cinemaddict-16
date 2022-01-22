import AbstractView from './abstract-view.js';

const createFilmWrapper = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title"></h2>

      <div class="films-list__container">

      </div>
    </section>

  </section>`
);

export default class FilmWrapper extends AbstractView {
  get template() {
    return createFilmWrapper();
  }
}
