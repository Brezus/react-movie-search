import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { nanoid } from "nanoid"
import { ThemeProvider } from "styled-components"
import { useEffect, useState, useMemo } from "react"
import { vars } from "./css-context/Vars"
import { AppContext } from "./AppContext"
import { MemoSearchPage } from "./pages/SearchPage"
import DetailsPage from "./pages/DetailsPage"
import { Switch, Route, Link, useLocation, useParams } from "react-router-dom"
import throttle from "lodash.debounce"
import { LinksArray, navRoutesHtml } from "./navLinksArray"
import Footer from "./components/Footer"
import ErrorPage404 from "./pages/ErrorPage404"
import "./App.css"

const DivApp = styled.div`
  position: relative;
  width: 100%;
  color: white;
  background-color: ${({ theme }) => theme.darkBg};
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
`

const StyledInput = styled.input`
  width: 100%;
  display: block;
  padding: 0em 0em 0em 2.5em;
  color: white;
  background-color: transparent;
  border: none;
  &::placeholder {
    color: ${({ theme }) => theme.white};
  }
  &:focus {
    border: none;
    outline: none;
  }
  @media (max-width: 700px) {
    padding: 0em 0em 0em 1.5em;
    &::placeholder {
      opacity: 0;
    }
  }
`
function App() {
  const [srchQ, setSrchQ] = useState("")
  const [searched, setSearched] = useState(false)

  const [tvGenres, setTvGenres] = useState(null)
  const [movieGenres, setMovieGenres] = useState(null)

  const [openMenu, setOpenMenu] = useState(false)
  const [clickedInside, setClickedInside] = useState(false)
  const [debounced, setDebounced] = useState(false)

  const movieGenreElements = movieGenres?.map((genre) => {
    return (
      <Route exact path={`/movie/:genre/page=:pNum`} key={nanoid()}>
        <MemoSearchPage
          redirected={false}
          genre={true}
          linkUrl={true}
          mediaType="movie"
        />
      </Route>
    )
  })

  const tvGenreElements = tvGenres?.map((genre) => {
    return (
      <Route exact path={`/tv/:genre/page=:pNum`} key={nanoid()}>
        <MemoSearchPage
          redirected={false}
          genre={true}
          linkUrl={true}
          mediaType="tv"
        />
      </Route>
    )
  })

  function clearInput() {
    setDebounced(false)
  }

  const handleChange = (e) => {
    setSrchQ(e.target.value)
    setDebounced(true)
  }

  const handleChangeMobile = (e) => {
    if (e.key === "Enter") {
      setSearched(true)
      setSrchQ(e.target.value)
    }
  }

  const debouncedChangeHandler = useMemo(() => throttle(handleChange, 500), [])

  useEffect(() => {
    const tvUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    const movieUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    Promise.all([fetch(tvUrl), fetch(movieUrl)])
      .then((res) => {
        return Promise.all(res.map((response) => response.json()))
      })
      .then((data) => {
        setTvGenres(data[0].genres)
        setMovieGenres(data[1].genres)
      })
      .catch((error) => console.log(error))

    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler, srchQ])

  return (
    <ThemeProvider theme={vars}>
      <DivApp>
        <AppContext.Provider
          value={{
            srchQ,
            debouncedChangeHandler,
            LinksArray,
            debounced,
            clearInput,
            handleChange,
            handleChangeMobile,
            searched,
            setSearched,
          }}
        >
          <Nav
            navLinksArray={LinksArray}
            setOpenMenu={setOpenMenu}
            setClickedInside={setClickedInside}
            clickedInside={clickedInside}
            openMenu={openMenu}
            tvGenres={tvGenres}
            movieGenres={movieGenres}
          />
          <Switch>
            <Route exact path="/">
              <Homescreen />
              <Main />
            </Route>
            <Route path={`/categories/:genre/page=:pNum`}>
              <MemoSearchPage redirected={false} genre={true} />
            </Route>
            <Route path={`/details/:movieName`}>
              <DetailsPage />
            </Route>
            {tvGenreElements}
            {movieGenreElements}
            {navRoutesHtml}
            <Route exact path="/:search/page=:pNum">
              <MemoSearchPage url={true} dep={srchQ} />
            </Route>
            <Route>
              <ErrorPage404 />
            </Route>
          </Switch>
          <Footer />
        </AppContext.Provider>
      </DivApp>
    </ThemeProvider>
  )
}

export default App
