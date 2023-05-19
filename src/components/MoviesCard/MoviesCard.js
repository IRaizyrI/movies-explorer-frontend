import React from 'react'
import {useLocation} from "react-router-dom";
import {durationConverter} from '../../utils/utils'
function MoviesCard({ card, onSave, onDelete, savedMovies}) {
  const location = useLocation();
  function handleSaveClick () {
    if (location.pathname === "/movies") {
      onSave(card)
    }
    if (location.pathname === "/saved-movies") {
      onDelete(card)
    }
  }
  return (
    <div className='moviecard'>
      <a className='moviescard__link' href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className='moviecard__img' src={location.pathname === "/movies" ?
          `https://api.nomoreparties.co${card.image.url}` : card.image} alt='movie'></img>
      </a>
      <button className={`moviecard__save ${location.pathname === "/movies" ?
        (card.id && savedMovies.some((m) => m.movieId === card.id) ? "moviecard__save_saved" : "moviecard__save_unsaved")
        : "moviecard__stored-save"}`}
        onClick={handleSaveClick}></button>
      <div className='moviecard__info'>
        <h2 className='moviecard__title'>{card.nameRU}</h2>
        <p className='moviecard__duration'>{durationConverter(card.duration)}</p>
      </div>


    </div>
  )
}

export default MoviesCard
