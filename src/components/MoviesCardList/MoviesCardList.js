import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movieCards, onSave, onDelete, savedMovies, listLength, currentUser }) {
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
                  currentUser={currentUser}
                />
              </div>
          )
        }).slice(0, listLength)}

      {movieCards.length === 0 ? <p className='moviescardlist__hint'>Ничего не найдено или строка поиска пуста</p> : movieCards.length > listLength}
    </section>
  );
}

export default MoviesCardList;
