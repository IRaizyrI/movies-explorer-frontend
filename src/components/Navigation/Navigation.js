import './Navigation.css';
import { useLocation, Link, useNavigate } from "react-router-dom";
import accountIcon from '../../images/head.svg';

function Navigation() {

  const location = useLocation();
  const navigate = useNavigate();

  function handleAccount() {
    navigate('/profile');
  }

  return (
    <section className="navigation">
      <div className='navigation__block'>
        <div className='navigation__links'>
          <Link className={`navigation__link ${location.pathname === '/' ? 'navigation__link-active' : ''}`} to="/">Главная</Link>
          <Link className={`navigation__link ${location.pathname === '/movies' ? 'navigation__link-active' : ''}`} to="/movies">Фильмы</Link>
          <Link className={`navigation__link ${location.pathname === '/saved-movies' ? 'navigation__link-active' : ''}`} to="/saved-movies">Сохранённые фильмы</Link>
        </div>
        <button className="navigation__account-button" onClick={handleAccount}>
          <img className="navigation__account-logo" src={accountIcon} alt="Аккаунт"/>
          <p className="navigation__account-text">Аккаунт</p>
        </button>
      </div>
    </section>
  );
}

export default Navigation;