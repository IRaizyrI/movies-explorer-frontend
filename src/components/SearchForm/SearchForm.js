import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearch, durationSwitch, hasSearched, setHasSearched, checked, setChecked }) {
  const savedSearch = localStorage.getItem('saveSearchValue')
  const location = useLocation()
  const [value, setValue] = useState(savedSearch ?? '')
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (value.trim() !== '') {
      setErrorMessage('');
      setChecked('0')
      handleSearch(value);
      setHasSearched(true);
    } else {
        setErrorMessage('Нужно ввести ключевое слово');
    }
  }
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setChecked('0')
      handleSearch('')
      setValue('')
    }
  }, [location])
  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('saveSearchValue', value)
      localStorage.setItem('saveCheck', checked)
      if (value.trim() === '') {
        setHasSearched(false);
      }
    }
  }, [value, checked, location])

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      durationSwitch(checked)
    }

    if (location.pathname === '/movies') {
      durationSwitch(checked ?? '0')
    }
  }, [location, checked])

  useEffect(() => {
    if (location.pathname === '/movies' && hasSearched) {
        setChecked('0')
        handleSearch(savedSearch ?? '')
    }
  }, [location])

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmitForm}>
      <div className="searchform__container">
        <div className="searchform__search-container">
          <input className="searchform__input" placeholder="Фильм" type="search" id="search" value={value} name="search"
          onChange={(e) => setValue(e.target.value)}></input>
          <button className="searchform__btn"></button>
        </div>
          {errorMessage && <p className="searchform__error">{errorMessage}</p>}
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
