import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function SavedMovies({ movieCards, onDelete, listLength, handleSearch, durationSwitch, addMovies, savedMovies }) {
  return (
    <main className="savedmovies">
      <div className="savedmovies__wrapper">
        <SearchForm handleSearch={handleSearch} durationSwitch={durationSwitch}/>
        <MoviesCardList movieCards={movieCards} onDelete={onDelete} listLength={listLength}
            addMovies={addMovies} savedMovies={savedMovies} />
      </div>
    </main>
  );
}

export default SavedMovies;
