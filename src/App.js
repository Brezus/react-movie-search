import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { nanoid } from "nanoid"
import { ThemeProvider } from "styled-components"
import { useEffect, useState, useMemo } from "react"
import { vars } from "./variables/Vars"
import { AppContext } from "./AppContext"
import { SearchPage } from "./composition/SearchPage"
import DetailsPage from "./pages/DetailsPage"
import { Switch, Route, Link } from "react-router-dom"
import debounce from "lodash.debounce"
import { LinksArray, navRoutesHtml } from "./navLinksArray"
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
  const [tvGenres, setTvGenres] = useState(null)
  const [movieGenres, setMovieGenres] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [clickedInside, setClickedInside] = useState(false)
  const [searched, setSearched] = useState(false)
  const [redirected, setRedirected] = useState(false)
  const [debounced, setDebounced] = useState(false)

  const movieGenreElements = movieGenres?.map((genre) => {
    return (
      <Route exact path={`/movie/:genre/page=:pNum`} key={nanoid()}>
        <SearchPage
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
        <SearchPage
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
    console.log("clicked")
  }

  const handleChange = (e) => {
    setSrchQ(e.target.value)
    localStorage.setItem("query", JSON.stringify(srchQ))
    setRedirected(true)
    setSearched(true)
    setDebounced(true)
  }
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), [])

  const searchResultsUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.REACT_APP_API_KEY
  }&language=en-US&query=${srchQ || "sonic"}&include_adult=false&`

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
          }}
        >
          <Nav
            navLinksArray={LinksArray}
            searched={searched}
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
              <SearchPage redirected={false} genre={true} />
            </Route>
            <Route path={`/details/:movieName`}>
              <DetailsPage />
            </Route>
            {tvGenreElements}
            {movieGenreElements}
            {navRoutesHtml}
            <Route exact path="/:search/page=:pNum">
              <SearchPage
                url={searchResultsUrl}
                dep={srchQ}
                redirected={redirected}
              />
            </Route>
            <Route>
              <p>you folllowed zoros directions didnt</p>
            </Route>
          </Switch>
        </AppContext.Provider>
      </DivApp>
    </ThemeProvider>
  )
}

export default App
