import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
function MoviesCardList({ movieCards, onSave, onDelete, savedMovies, listLength, hasSearched, checked, savedCheck, savedHasSearched}) {
  const location = useLocation();
  return (
    <section className="moviescardlist moviescardlist-wrapper">
        {movieCards.map((card, id) => {
          return (
              <div className='moviecard-wrapper' key={card.id ? card.id : id}>
                <MoviesCard
                  card={card}
                  isLiked={card.isLiked}
                  onSave={onSave}
                  onDelete={onDelete}
                  savedMovies={savedMovies}
                />
              </div>
          )
        }).slice(0, listLength)}

      {(movieCards.length === 0 && ((location.pathname === "/movies" && (hasSearched || checked === "1")) ||
                                   (location.pathname === "/saved-movies" && (savedCheck === "1" || savedHasSearched))
                                   )) ? <p className='moviescardlist__hint'>Ничего не найдено</p> : movieCards.length > listLength}
    </section>
  );
}

export default MoviesCardList;
