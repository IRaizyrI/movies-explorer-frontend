import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { Route, Routes } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
function App() {
  return (
    <div className="App">
      <Header isLogged={false}
        isMain={true}/>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/saved-movies" element={<SavedMovies />} />
        <Route exact path="/profile" element={<Profile name = {"Илья"} />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
