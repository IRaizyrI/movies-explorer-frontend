import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSaved, storedSave }) {
  return (
    <section className="moviescardlist">
      {isSaved ? (
        <div className="moviescardlist-wrapper">
          <MoviesCard isSaved={isSaved} storedSave={storedSave}/>
          <MoviesCard isSaved={isSaved} storedSave={storedSave}/>
          <MoviesCard isSaved={isSaved} storedSave={storedSave}/>
          <MoviesCard isSaved={isSaved} storedSave={storedSave}/>
          <MoviesCard isSaved={isSaved} storedSave={storedSave}/>
          <MoviesCard isSaved={isSaved} storedSave={storedSave}/>
          <MoviesCard isSaved={isSaved} storedSave={storedSave}/>
        </div>
      ) : (
        <div className="moviescardlist-wrapper">
          <MoviesCard isSaved={!isSaved} />
          <MoviesCard isSaved={isSaved}/>
          <MoviesCard isSaved={isSaved}/>
          <MoviesCard isSaved={isSaved}/>
          <MoviesCard isSaved={isSaved}/>
          <MoviesCard isSaved={isSaved}/>
          <MoviesCard isSaved={isSaved}/>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
