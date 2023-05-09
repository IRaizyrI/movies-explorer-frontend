import React from 'react'
import img from '../../images/banksy.png'

function MoviesCard({isSaved, storedSave}) {
  return (
    <div className='moviecard'>
      <img className='moviecard__img' src={img} alt='movie'></img>
      <button className={`moviecard__save  ${isSaved ? 'moviecard__save_saved' : 'moviecard__save_unsaved'} ${storedSave ? 'moviecard__stored-save' : ''} `}></button>
      <div className='moviecard__info'>
        <h2 className='moviecard__title'>В погоне за Бенкси</h2>
        <p className='moviecard__duration'>1ч 17м</p>
      </div>
      
      
    </div>
  )
}

export default MoviesCard