import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio-wrapper">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__links-list">
          <li className="portfolio__link-point">
            <a className="portfolio__link" href="https://github.com/IRaizyrI/how-to-learn">
              Статичный сайт
            </a>
            <a className="portfolio__link-symbol" href="https://github.com/IRaizyrI/how-to-learn">
              ↗
            </a>
          </li>
          <li className="portfolio__link-point portfolio__link-point_middle">
            <a className="portfolio__link" href="https://github.com/IRaizyrI/russian-travel">
              Адаптивный сайт
            </a>
            <a className="portfolio__link-symbol" href="https://github.com/IRaizyrI/russian-travel">
              ↗
            </a>
          </li>
          <li className="portfolio__link-point">
            <a className="portfolio__link" href="https://github.com/IRaizyrI/react-mesto-api-full-gha">
              Одностраничное приложение
            </a>
            <a
              className="portfolio__link-symbol"
              href="https://github.com/IRaizyrI/react-mesto-api-full"
            >
              ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
