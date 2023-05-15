import React from 'react';

function SearchForm() {
  return (
    <section className="searchform">
      <form className="searchform__form" noValidate>
        <div className="searchform__container">
          <input className="searchform__input" placeholder="Фильм" required></input>
          <button className="searchform__btn"></button>
        </div>
        <div className="searchform__toggle">
          <p className="searchform__text">Короткометражки</p>
          <input type="checkbox" id="short-films-switch" className="searchform__switch" />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
