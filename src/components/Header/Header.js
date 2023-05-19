import './Header.css';
import logoHeader from '../../images/logo.svg';
import accountIcon from '../../images/head.svg';
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";

function Header( {loggedIn} ) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => setIsActive(!isActive);

  const headerContent = () => {
    if (!loggedIn) {
      return (
        <header className="header">
          <img className="header__logo" onClick={() => navigate('/')} src={logoHeader} alt="Логотип" />
          <nav className="header__nav">
            <p className="header__text" onClick={() => navigate('/signup')}>Регистрация</p>
            <button className='header__button' type="button" onClick={() => navigate('/signin')}>Войти</button>
          </nav>
        </header>
      );
    } else {
      return (
        <header className="header header_not-home-page">
          <img className="header__logo" onClick={() => navigate('/')} src={logoHeader} alt="Логотип" />
          <div className="header__navigation-links">
            <NavLink className={({isActive}) =>isActive ? "header__navigation-link header__navigation-link_active" : "header__navigation-link"} to="/movies">Фильмы</NavLink>
            <NavLink className={({isActive}) =>isActive ? "header__navigation-link header__navigation-link_active" : "header__navigation-link"} active={'header__navigation-link_active'} to="/saved-movies">Сохраненные фильмы</NavLink>
          </div>
          <nav className="header__navigation">
            <button className="header__account-button" onClick={() => navigate('/profile')}>
              <img className="header__account-logo" src={accountIcon} alt="Аккаунт" />
              <span className="header__account-text">Аккаунт</span>
            </button>
            <button className={`header__burger ${isActive ? "header__burger_active" : ''}`} type="button" onClick={handleNav} />
          </nav>
          {isActive && <Navigation />}
        </header>
      );
    }
  };

  return (
      headerContent()
  );
}

export default Header;
