import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearch, durationSwitch }) {
  const savedSearch = localStorage.getItem('saveSearchValue')
  const savedCheck = localStorage.getItem('saveCheck')

  const location = useLocation()

  const [checked, setChecked] = useState(savedCheck ?? '0')
  const [value, setValue] = useState(savedSearch ?? '')
  const [hasSearched, setHasSearched] = useState(false); // new state variable

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (value.trim() !== '') {
      setHasSearched(true);
      handleSearch(value);
    }
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setChecked('0')
      handleSearch(value)
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
    if (location.pathname === '/movies' && hasSearched) {
      handleSearch(savedSearch ?? '')

    }
    if (location.pathname === '/movies') {
      durationSwitch(checked ?? '0')
    }
  }, [location, checked, hasSearched, savedSearch])
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
