import React from 'react'
import { Link } from 'react-router-dom'
function Register() {
  return (
    <section className='register'>
      <div className='login__header'>
        <Link to='/' className='login__header-logo'></Link>
        <h1 className='login__header-title'>Добро пожаловать!</h1>
      </div>
      <form className='register__form'>
          <label className='register__form-label register__form-label_name'>Имя</label>
          <input className='register__form-input register__form-input_name' placeholder="Имя"></input>
          <label className='register__form-label register__form-label_email'>E-mail</label>
          <input className='register__form-input register__form-input_email' placeholder="Email" type="email"></input>
          <label className='register__form-label register__form-label_password'>Пароль</label>
          <input className='register__form-input register__form-input_password' placeholder="Пароль" type="password"></input>
          <label className='register__form-label register__form-label_error'>Что-то пошло не так...</label>
        </form>
        <button className='register__btn register__btn_signup'>Зарегистрироваться</button>
        <div className='register__signin'>
          <p className='signin__text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__btn register__btn_signin'>Войти</Link>
        </div>
    </section>
  )
}

export default Register