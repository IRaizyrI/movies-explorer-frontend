import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function Profile({ handleEditProfile, signOut, handleError }) {
  const user = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [formEnabled, setFormEnabled] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const nameRegex = /^[а-яА-Я a-zA-Z-\s]{2,50}$/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

  function handleChangeName(evt) {
    const value = evt.target.value;
    setUserName(value);
    setNameError(nameRegex.test(value) ? "" : "Имя должно быть от 2 символов и содержать только латиницу, кириллицу, пробел или дефис ");
  }

  function handleChangeEmail(evt) {
    const value = evt.target.value;
    setUserEmail(value);
    setEmailError(emailRegex.test(value) ? "" : "Введите корректный email");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!nameError && !emailError) {
      handleEditProfile({
        name: userName,
        email: userEmail,
      });
    }
  }

  useEffect(() => {
    if (userName !== user.name || userEmail !== user.email) {
      setFormEnabled(true);
    } else {
      setFormEnabled(false);
    }
  }, [userName, userEmail, user.name, user.email]);

  return (
    <main className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <input
            className="profile__input profile__input_name"
            placeholder="Имя"
            onChange={handleChangeName}
            name="name"
            defaultValue={user.name}
            required
          ></input>
          <input
            className="profile__input profile__input_email"
            placeholder="E-mail"
            onChange={handleChangeEmail}
            name="email"
            type="email"
            defaultValue={user.email}
            required
          ></input>
          {(emailError || nameError ) && <p className="profile__error">{nameError || emailError}</p>}
          <label className="profile__input_label profile__input_label_name">Имя</label>
          <label className="profile__input_label profile__input_label_email">Email</label>

          <label className={`profile__status ${handleError.success ? "profile__status_success" : "profile__status_error"}`}>{handleError.message}</label>
          <button
            className={`profile__btn profile__button_edit ${
              (formEnabled && !nameError && !emailError) && "profile__btn-edit_active"
            }`}
            disabled={!formEnabled || nameError || emailError}
          >
            Редактировать
          </button>
        </form>

        <Link
          to="/signin"
          className="profile__btn profile__button_signout profile__btn_active"
          onClick={signOut}
        >
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
}

export default Profile;
