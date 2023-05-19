import React from 'react'
import { Link } from 'react-router-dom'
import { useFormValidation } from "../../hooks/useFormValidation";

function Login({ handleLogin, handleError }) {
  const { values, handleChange, isValid, errors } = useFormValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleLogin(values, 'login');

    }
  }

  return (
    <main className='login'>
      <div className='login__header'>
        <Link to='/' className='login__header-logo'></Link>
        <h1 className='login__header-title'>Рады видеть!</h1>
      </div>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className='login__form-label login__form-label_email'>E-mail</label>
        <input
          className="login__form-input"
          placeholder="Email"
          type="email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <label className='login__form-label login__form-label_password'>Пароль</label>
        <input
          className="login__form-input"
          placeholder="Пароль"
          type="password"
          name="password"
          value={values.password || ''}
          onChange={handleChange}
          required
        />
        <label className='login__form-label login__form-label_error'>{errors.email ||errors.password || handleError.message}</label>
        <button className={`login__btn login__btn_signup ${!isValid && 'login__btn_disabled'}`} type="submit" disabled={!isValid}>Войти</button>
        <div className='login__signin'>
          <p className='signin__text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login__btn login__btn_signin'>Регистрация</Link>
        </div>
      </form>
    </main>
  )
}

export default Login
