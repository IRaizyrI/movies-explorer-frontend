import React from 'react';

function AboutProject() {
  return (
    <section className="about" id="about">
      <div className="about-wrapper">
        <h2 className="about__title">О проекте</h2>
        <div className="about__text">
          <div className="about__paragraph">
            <h3 className="about__item-title">Дипломный проект включал 5 этапов</h3>
            <p className="about__item-description">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__paragraph">
            <h3 className="about__item-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about__item-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__progress">
          <div className="about__cell">
            <p className="about__cell_backend">1 неделя</p>
            <p className="about__cell_frontend">4 недели</p>
          </div>
          <div className="about__name">
            <p className="about__name_backend">Back-end</p>
            <p className="about__name_frontend">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
