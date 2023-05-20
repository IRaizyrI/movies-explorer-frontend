import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function SavedMovies({ movieCards, onDelete, listLength, handleSearch, durationSwitch, addMovies, savedMovies, hasSearched, setHasSearched, setChecked, checked, savedCheck, setSavedCheck }) {
  return (
    <main className="savedmovies">
      <div className="savedmovies__wrapper">
        <SearchForm handleSearch={handleSearch}
                  durationSwitch={durationSwitch}
                  hasSearched={hasSearched}
                  setHasSearched={setHasSearched}
                  setChecked={setChecked}
                  checked={checked}
                  savedCheck={savedCheck}
                  setSavedCheck={setSavedCheck}/>
        <MoviesCardList movieCards={movieCards} onDelete={onDelete} listLength={listLength}
            addMovies={addMovies} savedMovies={savedMovies} checked={checked} hasSearched={hasSearched} savedCheck={savedCheck}/>
      </div>
    </main>
  );
}

export default SavedMovies;
