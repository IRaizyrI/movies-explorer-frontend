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
import { RU_ERRORS,
  DESKTOP_WIDTH,
  DESKTOP_CARD_COUNT,
  DESKTOP_ADD_MOVIES_COUNT,
  TABLET_WIDTH,
  TABLET_CARD_COUNT,
  TABLET_ADD_MOVIES_COUNT,
  MOBILE_S_WIDTH,
  MOBILE_CARD_COUNT,
  MOBILE_ADD_MOVIES_COUNT,
  MOBILE_L_WIDTH,
  SHORT_MOVIES_DURATION,
    } from '../../utils/constants';
function App() {
  const navigate = useNavigate();
  const [savedCheck, setSavedCheck] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [localData, setLocalData] = useState([]);
  const [localSavedData, setLocalSavedData] = useState([]);
  const [savedMoviesFilter, setSavedMoviesFilter] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [addMoviesCount, setAddMoviesCount] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedMovies, setHasFetchedMovies] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchInitialized, setSearchInitialized] = useState(false);
  const storedCheck = localStorage.getItem('saveCheck')
  const [checked, setChecked] = useState(storedCheck ?? '0')
  const location = useLocation();
  function handleAuth(data, operationType) {
    const authFn = operationType === 'login' ? mainApi.authorization(data) : mainApi.registration(data);
    authFn
      .then((res) => {
        if (operationType === 'login') {
          navigate('/movies')
          setLoggedIn(true);
          setIsSuccess({success: true, message: ''});
        } else if (operationType === 'register') {
          mainApi.authorization(data)
            .then(() => {
              setLoggedIn(true);
              navigate('/movies')
              setIsSuccess({success: true, message: ''});
            })
            .catch((err) => {
              setIsSuccess({success: false, message: RU_ERRORS[err]});
              console.log(isSuccess);
            });
        }
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess({success: false, message: RU_ERRORS[err]});
      });
  }

  useEffect(() => {
    setIsSuccess({});
  }, [location]);

  useEffect(() => {
      setIsLoading(true)
      mainApi.checkToken()
        .then((res) => {
          setLoggedIn(true);
          mainApi.getProfileInfo()
          .then(data => setCurrentUser(data))
          .catch(err => console.log(err.message))
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
  }, [loggedIn])

  function signOut() {
    mainApi.signOut().then((res) => {
      setLoggedIn(false)
      navigate('/')
      localStorage.clear();
  })
  }

  useEffect(() => {
      mainApi.getCards()
        .then(res => {
          localStorage.setItem('savedMovies', JSON.stringify(res.filter((i) => i.owner === currentUser._id)))
          const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
          setLocalSavedData(userMovies);
          setSavedMoviesFilter(userMovies);
        })
        .catch((err) => {
          console.log(`Проблема с получением сохраненных фильмов: ${err}`)
        })
        .finally(() => setIsLoading(false));
  }, [currentUser])

  function addMovies() {
    setCardCount(cardCount + addMoviesCount);
  }

  const handleSaveMovie = (card) => {
    const save = localSavedData.some((i) =>
      i.movieId === card.id
    );

    if (!save) {
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
        setIsSuccess({success: false, message: RU_ERRORS[err]});
      });

  };

  const handleSearch = (value) => {
    if (!hasFetchedMovies) {
      setIsLoading(true);
      moviesApi.getCards()
      .then(res => {
        setHasFetchedMovies(true);
        localStorage.setItem('data', JSON.stringify(res));
        const allMovies = JSON.parse(localStorage.getItem('data'));
        setLocalData(allMovies);
        const sortedMovieSearch = allMovies.filter((item) => {
          const nameEN = item.nameEN.toLowerCase();
          const nameRU = item.nameRU.toLowerCase();
          return (nameEN && nameEN.toLowerCase().includes(value.toLowerCase()))
          || (nameRU && nameRU.toLowerCase().includes(value.toLowerCase()))
            ? item : null
        })
        localStorage.setItem('filteredMovies', JSON.stringify(sortedMovieSearch));
        setSearchInitialized(true);
      })
      .catch((err) => {
        console.log(`Movies could not be fetched: ${err}`)
      })
      .finally(() => setIsLoading(false));
    } else {
      const sortedMovieSearch = localData.filter((item) => {
        const nameEN = item.nameEN.toLowerCase();
        const nameRU = item.nameRU.toLowerCase();
        return (nameEN && nameEN.toLowerCase().includes(value.toLowerCase()))
        || (nameRU && nameRU.toLowerCase().includes(value.toLowerCase()))
          ? item : null
      })
      localStorage.setItem('filteredMovies', JSON.stringify(sortedMovieSearch));
      setSearchInitialized(true);
      durationSwitch(checked)
    }
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
      const shorts = filterMovies.filter((item) => item.duration <= SHORT_MOVIES_DURATION);
      setFilteredMovies(shorts);
    } else {
      setFilteredMovies(filterMovies);
    }
  };

  const savedDurationSwitch = (checked) => {
    const savedFiltered = JSON.parse(localStorage.getItem('savedFilter'));
    if (checked === '1' && savedFiltered) {
      const shortDurationFilms = savedFiltered.filter((item) => item.duration <= SHORT_MOVIES_DURATION);
      setSavedMoviesFilter(shortDurationFilms);
    } else {
      setSavedMoviesFilter(savedFiltered);
    }
  }

  const width = useWindowWidth();
  useEffect(() => {
    if (width >= DESKTOP_WIDTH) {
      setCardCount(DESKTOP_CARD_COUNT);
      setAddMoviesCount(DESKTOP_ADD_MOVIES_COUNT);
    } else if (width >= TABLET_WIDTH && width <= DESKTOP_WIDTH-1) {
      setCardCount(TABLET_CARD_COUNT);
      setAddMoviesCount(TABLET_ADD_MOVIES_COUNT);
    } else if (width <= MOBILE_S_WIDTH && width <= MOBILE_L_WIDTH) {
      setCardCount(MOBILE_CARD_COUNT);
      setAddMoviesCount(MOBILE_ADD_MOVIES_COUNT);
    }
    setSearchInitialized(false);
  }, [width, searchInitialized])

  if (isLoading) {
    return (<div className="App">
              <Preloader isLoading={isLoading}/>;
            </div>)
  }
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
                  listLength={cardCount}
                  durationSwitch={durationSwitch}
                  handleSearch={handleSearch}
                  savedMovies={localSavedData}
                  movieCards={filteredMovies}
                  onSave={handleSaveMovie}
                  addMovies={addMovies}
                  onDelete={handleDeleteCard}
                  hasSearched={hasSearched}
                  setHasSearched={setHasSearched}
                  setChecked={setChecked}
                  checked={checked}
                  savedCheck={savedCheck}
                  setSavedCheck={setSavedCheck}
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
                  listLength={cardCount}
                  hasSearched={hasSearched}
                  setHasSearched={setHasSearched}
                  setChecked={setChecked}
                  checked={checked}
                  savedCheck={savedCheck}
                  setSavedCheck={setSavedCheck}
                />
            </ProtectedRoute>
              } />
          <Route path="/profile" element={<ProtectedRoute loggedIn={loggedIn}><Profile handleEditProfile={handleEditProfile} signOut={signOut} handleError={isSuccess}/> </ProtectedRoute>} />
          <Route path="/signup" element={<Register handleRegister={handleAuth} handleError={isSuccess}/>} />
          <Route path="/signin" element={<Login handleLogin={handleAuth} handleError={isSuccess}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
