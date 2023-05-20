export class MoviesApi{
  constructor(BASE_URL){
    this._BASE_URL = BASE_URL
  }
  _checkResponse(res){
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Бип-Буп-Бип! Что-то пошло не так. Статус: ${res.status}`)
  }
  getCards() {
    return fetch(this._BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(this._checkResponse);
  }
}
const moviesApi = new MoviesApi("https://api.nomoreparties.co/beatfilm-movies")
export { moviesApi }
