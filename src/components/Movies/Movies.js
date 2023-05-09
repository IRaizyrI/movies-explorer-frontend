import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList isSaved={false} />
      <button className="movies__btn-more">Ещё</button>
    </main>
  );
}

export default Movies;
