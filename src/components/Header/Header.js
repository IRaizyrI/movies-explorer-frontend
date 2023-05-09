import './Header.css';
import logoHeader from '../../images/logo.svg';
import accountIcon from '../../images/head.svg';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = () => setIsActive(!isActive);

  const headerContent = () => {
    if (location.pathname === '/') {
      return (
        <header className="header">
          <img className="header__logo" onClick={() => navigate('/')} src={logoHeader} alt="Логотип" />
          <nav className="header__nav">
            <p className="header__text" onClick={() => navigate('/signup')}>Регистрация</p>
            <button className='header__button' type="button" onClick={() => navigate('/signin')}>Войти</button>
          </nav>
        </header>
      );
    } else if (['/movies', '/saved-movies', '/profile'].includes(location.pathname)) {
      return (
        <header className="header header__not-home-page">
          <img className="header__logo" onClick={() => navigate('/')} src={logoHeader} alt="Логотип" />
          <div className="header__navigation-links">
            <Link className="header__navigation-link" to="/movies">Фильмы</Link>
            <Link className="header__navigation-link" to="/saved-movies">Сохраненные фильмы</Link>
          </div>
          <nav className="header__navigation">
            <button className="header__account-button" onClick={() => navigate('/profile')}>
              <img className="header__account-logo" src={accountIcon} alt="Аккаунт" />
              <p className="header__account-text">Аккаунт</p>
            </button>
            <button className={`header__burger ${isActive ? "header__burger_active" : ''}`} type="button" onClick={handleNav} />
          </nav>
          {isActive && <Navigation />}
        </header>
      );
    }
  };

  return (
    <div className="location">
      {headerContent()}
    </div>
  );
}

export default Header;