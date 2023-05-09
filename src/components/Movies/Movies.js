import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <div className='movies'>
      <Header/>
      <SearchForm />
      <MoviesCardList isSaved={false} />
      <button className="movies__btn_more">Ещё</button>
      <Footer/>
    </div>
  );
}

export default Movies;
