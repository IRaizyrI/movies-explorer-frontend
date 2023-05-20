import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearch, durationSwitch, hasSearched, setHasSearched, checked, setChecked, savedCheck, setSavedCheck, setSavedHasSearched}) {
  const savedSearch = localStorage.getItem('saveSearchValue')
  const location = useLocation()
  const [value, setValue] = useState(savedSearch ?? '')
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (value.trim() !== '') {
      setErrorMessage('');
      handleSearch(value);
      if (location.pathname === "/movies"){
        setHasSearched(true);
      }
      if (location.pathname === "/saved-movies"){
        durationSwitch(savedCheck);
        setSavedHasSearched(true);
      }
    } else {
        setErrorMessage('Нужно ввести ключевое слово');
    }
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setSavedCheck('0')
      handleSearch('')
      setValue('')
    }
  }, [location])
  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('saveSearchValue', value)
      if (value.trim() === '') {
        setHasSearched(false);
      }
    }
  }, [value, checked, location])

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      durationSwitch(savedCheck)
    }

    if (location.pathname === '/movies') {
      durationSwitch(checked ?? '0')
      localStorage.setItem('saveCheck', checked);
    }
  }, [checked, savedCheck])

  useEffect(() => {
    if (location.pathname === '/movies' && hasSearched) {
        handleSearch(savedSearch ?? '')
        // console.log(checked)
        // setChecked(localStorage.getItem('saveCheck'));
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
          checked={(location.pathname === '/movies' && checked === '1') || (location.pathname === '/saved-movies' && savedCheck === '1')}
          onChange={(e) => {
            const newCheck = e.target.checked ? '1' : '0';
            if (location.pathname === '/saved-movies') {
              setSavedCheck(newCheck);
            }
            if (location.pathname === '/movies') {
              setChecked(newCheck);
            }
          }}/>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
