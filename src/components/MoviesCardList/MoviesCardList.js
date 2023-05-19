import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards, onSave, onDelete, savedMovies, listLength, hasSearched, checked}) {
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

      {(movieCards.length === 0 && (hasSearched || checked === "1")) ? <p className='moviescardlist__hint'>Ничего не найдено</p> : movieCards.length > listLength}
    </section>
  );
}

export default MoviesCardList;
