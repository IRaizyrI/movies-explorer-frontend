import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <main className="savedmovies">
      <div className="savedmovies__wrapper">
        <SearchForm />
        <MoviesCardList isSaved={true} storedSave={true}/>
      </div>
    </main>
  );
}

export default SavedMovies;
