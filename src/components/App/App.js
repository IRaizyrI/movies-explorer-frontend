import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi"
import { moviesApi } from "../../utils/MoviesApi"
import {useWindowWidth} from '../../hooks/useWindowWidth'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import Preloader from "../Preloader/Preloader"
function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [localData, setLocalData] = useState([]);
  const [localSavedData, setLocalSavedData] = useState([]);
  const [savedMoviesFilter, setSavedMoviesFilter] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [addMoviesCount, setAddMoviesCount] = useState(0);
  const [listLength, setListLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInitialized, setSearchInitialized] = useState(false);
  const location = useLocation();
  function handleAuth(data, operationType) {
    const authFn = operationType === 'login' ? mainApi.authorization(data) : mainApi.registration(data);
    authFn
      .then((res) => {
        if (operationType === 'login') {
          setLoggedIn(true);
          setIsSuccess({success: true, message: ''});
          navigate('/');
        } else if (operationType === 'register') {
          mainApi.authorization(data)
            .then(() => {
              setLoggedIn(true);
              setIsSuccess({success: true, message: ''});
              navigate('/');
            })
            .catch((err) => {
              setIsSuccess({success: false, message: err.message});
              console.log(isSuccess);
            });
        }
      })
      .catch((err) => {
        setIsSuccess({success: false, message: err.message});
        console.log(isSuccess);
      });
  }

  useEffect(() => {
    setIsSuccess({});
  }, [location]);

  useEffect(() => {
      mainApi.checkToken()
        .then((res) => {
          navigate('/movies')
          setLoggedIn(true);
        })
        .catch((err) => console.log(err))
  }, [loggedIn])

  function signOut() {
    mainApi.signOut().then((res) => {
      setLoggedIn(false)
      navigate('/signin')
  })
  }
  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      moviesApi.getCards()
      .then(res => {
        localStorage.setItem('data', JSON.stringify(res));
        const allMovies = JSON.parse(localStorage.getItem('data'));
        setLocalData(allMovies);
      })
      .catch((err) => {
        console.log(`Фильмы не удалось получить: ${err}`)
      })
      .finally(() => setIsLoading(false));
      mainApi.getProfileInfo()
        .then(data => setCurrentUser(data))
        .catch(err => console.log(err.message))
    }
  }, [loggedIn])

  useEffect(() => {
    setIsLoading(true);
      mainApi.getCards()
        .then(res => {
          localStorage.setItem('savedMovies', JSON.stringify(res.filter((i) => i.owner === currentUser._id)))
          const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
          setLocalSavedData(userMovies);
        })
        .catch((err) => {
          console.log(`Сохраненные фильмы не удалось получить: ${err}`)
        })
        .finally(() => setIsLoading(false));
  }, [currentUser])

  function addMovies() {
    setListLength(listLength + addMoviesCount);
  }

  const handleSaveMovie = (card) => {
    const like = localSavedData.some((i) =>
      i.movieId === card.id
    );

    if (!like) {
      mainApi.postCard(card).then(res => {
        setLocalSavedData([...localSavedData, res])
      })
    } else {
      const dislike = localSavedData.find((i) => i.movieId === card.id)
      handleDeleteCard(dislike)
    }
  }

  const handleDeleteCard = (card) => {
    mainApi.deleteCard(card._id)
      .then(() => {
        setSavedMoviesFilter(savedMoviesFilter.filter((i) => i._id !== card._id))
        setLocalSavedData(localSavedData.filter(i => i._id !== card._id))
      })
  }

  const handleEditProfile = (userData) => {
    mainApi.patchProfileInfo(userData)
      .then(data => {
        setCurrentUser(data);
        setIsSuccess({success: true, message: "Сохранено успешно"});
      })
      .catch(err => {
        setIsSuccess({success: false, message: err.message});
      });

  };

  const handleSearch = (value) => {
    const sortedMovieSearch = localData.filter((item) => {
      const nameEN = item.nameEN.toLowerCase();
      const nameRU = item.nameRU.toLowerCase();
      return (nameEN && nameEN.toLowerCase().includes(value.toLowerCase()))
      || (nameRU && nameRU.toLowerCase().includes(value.toLowerCase()))
        ? item : null
    });

    localStorage.setItem('filteredMovies', JSON.stringify(sortedMovieSearch));
    setSearchInitialized(true);
    setFilteredMovies(sortedMovieSearch)
  }

  const handleSearchSaved = (value) => {
    const sortedMovieSearch = localSavedData.filter((item) => {
      const nameEN = item.nameEN.toLowerCase();
      const nameRU = item.nameRU.toLowerCase();
      return (nameEN && nameEN.toLowerCase().includes(value.toLowerCase()))
      || (nameRU && nameRU.toLowerCase().includes(value.toLowerCase()))
        ? item : null
    });
    localStorage.setItem('savedFilter', JSON.stringify(sortedMovieSearch));
    setSavedMoviesFilter(sortedMovieSearch);
  }

  const durationSwitch = (checked) => {
    const filterMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if (checked === '1' && filterMovies) {
      const shorts = filterMovies.filter((item) => item.duration <= 40);
      setFilteredMovies(shorts);
    } else {
      setFilteredMovies(filterMovies);
    }
  };

  const savedDurationSwitch = (checked) => {
    const savedFiltered = JSON.parse(localStorage.getItem('savedFilter'));
    if (checked === '1' && savedFiltered) {
      const shorts = savedFiltered.filter((item) => item.duration <= 40);
      setSavedMoviesFilter(shorts);
    } else {
      setSavedMoviesFilter(savedFiltered);
    }
  }

  const width = useWindowWidth();
  useEffect(() => {
    if (width >= 1280) {
      setListLength(12);
      setAddMoviesCount(3);
    } else if (width >= 768 && width <= 1279) {
      setListLength(8);
      setAddMoviesCount(2);
    } else if (width <= 320 && width <= 480) {
      setListLength(5);
      setAddMoviesCount(1);
    }
    setSearchInitialized(false);
  }, [width, searchInitialized])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Preloader isLoading={isLoading}/>
                <Movies
                  currentUser={currentUser}
                  listLength={listLength}
                  durationSwitch={durationSwitch}
                  handleSearch={handleSearch}
                  savedMovies={localSavedData}
                  movieCards={filteredMovies}
                  onSave={handleSaveMovie}
                  addMovies={addMovies}
                  onDelete={handleDeleteCard}
                />
                </ProtectedRoute>} />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Preloader isLoading={isLoading}/>
                <SavedMovies
                  movieCards={savedMoviesFilter}
                  durationSwitch={savedDurationSwitch}
                  handleSearch={handleSearchSaved}
                  onDelete={handleDeleteCard}
                  addMovies={addMovies}
                  savedMovies={savedMoviesFilter}
                  listLength={listLength}
                />
            </ProtectedRoute>
              } />
          <Route path="/profile" element={<ProtectedRoute loggedIn={loggedIn}><Profile user = {currentUser} handleEditProfile={handleEditProfile} signOut={signOut} handleError={isSuccess}/> </ProtectedRoute>} />
          <Route path="/signup" element={<Register handleRegister={handleAuth} handleError={isSuccess}/>} />
          <Route path="/signin" element={<Login handleLogin={handleAuth} handleError={isSuccess}/>} />
          <Route path="*" element={<ProtectedRoute loggedIn={loggedIn}><NotFoundPage /> </ProtectedRoute>} />
        </Routes>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
