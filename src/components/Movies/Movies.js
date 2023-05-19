import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ fetchMovies, movieCards, onSave, savedMovies, handleSearch, durationSwitch, listLength, addMovies, onDelete, hasSearched, setHasSearched, checked, setChecked }) {
  return (
      <main>
          <section className="movies">
            <SearchForm
              fetchMovies={fetchMovies}
              handleSearch={handleSearch}
              durationSwitch={durationSwitch}
              hasSearched={hasSearched}
              setHasSearched={setHasSearched}
              setChecked={setChecked}
              checked={checked}
            />
            <MoviesCardList
              hasSearched={hasSearched}
              movieCards={movieCards || []}
              onSave={onSave}
              savedMovies={savedMovies}
              listLength={listLength}
              addMovies={addMovies}
              onDelete={onDelete}
              checked={checked}
            />
            <button className={`movies__btn-more ${(!movieCards || movieCards.length <= listLength || movieCards.length === 0) && 'movies__btn-more_hidden'}`} onClick={addMovies}>Ещё</button>
          </section>
      </main>
  );
}

export default Movies;
