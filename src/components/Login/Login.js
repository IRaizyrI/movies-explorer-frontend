import React from 'react'
import { Link } from 'react-router-dom'
function Login() {
  return (
    <section className='login'>
      <div className='login__header'>
        <Link to='/' className='login__header-logo'></Link>
        <h1 className='login__header-title'>Рады видеть!</h1>
      </div>
      <form className="login__form">
      <label className='login__form-label login__form-label_email'>E-mail</label>
        <input className="login__form-input" placeholder="Email" type="email"></input>
      <label className='login__form-label login__form-label_password'>Пароль</label>
        <input className="login__form-input" placeholder="Пароль" type="password"></input>
        <button className="login__btn login__btn_signup" type="submit" disabled>Войти</button>
        <div className='login__signin'>
          <p className='signin__text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login__btn login__btn_signin'>Регистрация</Link>
        </div>
      </form>
    </section>
  )
}

export default Login