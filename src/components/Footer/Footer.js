// import React from 'react'

// function Footer() {
//   return (
//     <footer className='footer'>
//       <div className='footer__wrapper'>
//         <p className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
//         <div className='footer__info'>
//           <p className='footer__info-year'>© 2023</p>
//           <ul className='footer__info-links'>
//             <li className='footer__link'><a className='footer__info-link_out' href='https://practicum.yandex.ru'>Яндекс Практикум</a></li>
//             <li className='footer__link'><a className='footer__info-link_out' href='https://github.com/IRaizyrI'>Github</a></li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__wrapper'>
        <p className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__info'>
          <p className='footer__info-year'>© 2023</p>
          <ul className='footer__info-links'>
            <li className='footer__info-link'><a className='footer__info-link_out' href='https://practicum.yandex.ru'>Яндекс Практикум</a></li>
            <li className='footer__info-link'><a className='footer__info-link_out' href='https://github.com/IRaizyrI'>Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
