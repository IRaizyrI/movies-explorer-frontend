import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearch, durationSwitch }) {
  const location = useLocation();
  const localStorageKey = location.pathname === '/saved-movies' ? 'savedMoviesSearchValue' : 'saveSearchValue';
  const localStorageCheckedKey = location.pathname === '/saved-movies' ? 'savedMoviesCheck' : 'saveCheck';

  const localStorageValue = localStorage.getItem(localStorageKey);
  const localChecked = localStorage.getItem(localStorageCheckedKey);

  const [checked, setChecked] = useState(localChecked ?? '0');
  const [value, setValue] = useState(localStorageValue ?? '');

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
    localStorage.setItem(localStorageCheckedKey, checked);
  }, [value, checked]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSearch(value);
    durationSwitch(checked);
  }

  useEffect(() => {
    handleSearch(localStorage.getItem(localStorageKey) ?? '');
    durationSwitch(localStorage.getItem(localStorageCheckedKey) ?? '0');
  }, [location]);

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmitForm}>
        <div className="searchform__container">
          <input className="searchform__input" placeholder="Фильм" type="search" id="search" value={value} name="search" required
          onChange={(e) => setValue(e.target.value)}></input>
          <button className="searchform__btn"></button>
        </div>
        <div className="searchform__toggle">
          <p className="searchform__text">Короткометражки</p>
          <input type="checkbox" id="short-films-switch" className="searchform__switch"
          checked={checked === '1'}
          onChange={(e) => {
            const newCheck = e.target.checked ? '1' : '0';
            setChecked(newCheck);
          }}/>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
