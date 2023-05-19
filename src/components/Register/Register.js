import React from 'react'
import { Link } from 'react-router-dom'
import { useFormValidation } from "../../hooks/useFormValidation";

function Register({ handleRegister, handleError }) {
  const { values, handleChange, isValid, errors } = useFormValidation(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegister(values, 'register')
    }
  }

  return (
    <main className='register'>
      <div className='login__header'>
        <Link to='/' className='login__header-logo'></Link>
        <h1 className='login__header-title'>Добро пожаловать!</h1>
      </div>
      <form className='register__form' onSubmit={handleFormSubmit}>
          <label className='register__form-label register__form-label_name'>Имя</label>
          <input
            className='register__form-input register__form-input_name'
            placeholder="Имя"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            required
          />
          <label className='register__form-label register__form-label_email'>E-mail</label>
          <input
            className='register__form-input register__form-input_email'
            placeholder="Email"
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            required
          />
          <label className='register__form-label register__form-label_password'>Пароль</label>
          <input
            className='register__form-input register__form-input_password'
            placeholder="Пароль"
            type="password"
            name="password"
            value={values.password || ''}
            onChange={handleChange}
            required
          />
          <label className='register__form-label register__form-label_error register__form-label_server-error'>{errors.password || errors.email || errors.name || handleError.message}</label>
          <button className={`register__btn register__btn_signup ${!isValid && 'register__btn_disabled'}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <div className='register__signin'>
          <p className='signin__text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__btn register__btn_signin'>Войти</Link>
        </div>
    </main>
  )
}

export default Register
