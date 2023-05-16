
export class MainApi{
  constructor(headers, BASE_URL){
    this._headers = headers
    this._BASE_URL = BASE_URL
  }
  _checkResponse(res){
    if(res.ok){
      return res.json()
    }
      return Promise.reject(res.status);
    };


registration ({name, email, password}) {
  return fetch(`${this._BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: this._headers,
    body: JSON.stringify({ name, email, password }),
  }).then(this._checkResponse);
};

authorization ({email, password}) {
  return fetch(`${this._BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: this._headers,
    body: JSON.stringify({ email, password }),
  }).then(this._checkResponse);
};

checkToken () {
  return fetch(`${this._BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: this._headers,
  }).then(this._checkResponse);
};

getProfileInfo () {
  return fetch(`${this._BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: this._headers,
  }).then(this._checkResponse);
};

patchProfileInfo (data) {
  return fetch(`${this._BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(this._checkResponse);
};

getCards () {
  return fetch(`${this._BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(this._checkResponse);
};

postCard (data) {
  return fetch(`${this._BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: this._headers,
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: 'https://api.nomoreparties.co' + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then(this._checkResponse);
};

deleteCard (cardId) {
  return fetch(`${this._BASE_URL}/movies/${cardId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: this._headers,
  }).then(this._checkResponse);
};

signOut(){
  return fetch(`${this._BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(this._checkResponse);
};

}

// "https://api.logvinovilya-dip.nomoredomains.monster/api"
const mainApi = new MainApi({
  "Content-Type": "application/json",
}, "http://localhost:3001/api")
export { mainApi }
