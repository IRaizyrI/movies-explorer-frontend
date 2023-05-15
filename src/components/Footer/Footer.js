import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ? (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__caption">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__info">
          <p className="footer__info-year">© 2023</p>
          <ul className="footer__info-links">
            <li className="footer__info-link">
              <a
                className="footer__link"
                href="https://practicum.yandex.ru"
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс Практикум
              </a>
            </li>
            <li className="footer__info-link">
              <a
                className="footer__link"
                href="https://github.com/IRaizyrI"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  ) : (
    <></>
  );
}

export default Footer;
