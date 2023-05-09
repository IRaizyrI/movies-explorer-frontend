import React from 'react';
import photo from '../../../images/me.jpg';

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <div className="aboutme-wrapper">
        <h2 className="aboutme__title">Студент</h2>
        <div className="aboutme__info">
          <div className="aboutme__me">
            <h3 className="aboutme__name">Илья</h3>
            <p className="aboutme__specialty">Фронтенд-разработчик, 21 год</p>
            <p className="aboutme__paragraph">
              Cтудент 4 курса МГРИ на Геофизическом факультете. Люблю все что хотя бы маломальски связано с компьютерами, попробовал себя во всем, от Embedded до Кибербезопасности. В свободное время участвуем в CTF с командой. Касательно спорта, бег и вело путешествия - моя страсть.
            </p>
            <a
              className="aboutme__social"
              alt="github"
              href="https://github.com/IRaizyrI"
            >
              Github
            </a>
          </div>
          <img className="aboutme__img" src={photo} alt="profilepic"></img>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
