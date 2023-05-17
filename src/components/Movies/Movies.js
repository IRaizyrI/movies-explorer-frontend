import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movieCards, onSave, savedMovies, handleSearch, durationSwitch, listLength, addMovies, onDelete, currentUser }) {
  return (
      <main>
          <section className="movies">
            <SearchForm
              handleSearch={handleSearch}
              durationSwitch={durationSwitch}
            />
            <MoviesCardList
              movieCards={movieCards || []}
              onSave={onSave}
              savedMovies={savedMovies}
              listLength={listLength}
              addMovies={addMovies}
              onDelete={onDelete}
              currentUser={currentUser}
            />
            <button className={`movies__btn-more ${(!movieCards || movieCards.length <= listLength || movieCards.length === 0) && 'movies__btn-more_hidden'}`} onClick={addMovies}>Ещё</button>
          </section>
      </main>
  );
}

export default Movies;
