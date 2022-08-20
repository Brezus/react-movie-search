// process.env.REACT_APP_API_KEY
import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { ThemeProvider } from "styled-components"
import { useEffect, useState, useMemo } from "react"
import { vars } from "./variables/Vars"
import { AppContext } from "./AppContext"
import { SearchPage } from "./composition/SearchPage"
import Category from "./pages/Category"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom"
import debounce from "lodash.debounce"

const DivApp = styled.div`
  position: relative;
  width: 100%;
  color: white;
  background-color: ${({ theme }) => theme.darkBg};
`

const Span = styled.span`
  display: block;
  font-size: 3rem;
`
function App() {
  const [srchQ, setSrchQ] = useState("")
  const [searched, setSearched] = useState(false)
  const [redirected, setRedirected] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [category, setCategory] = useState("")

  function fetchCategory(e) {
    const formatted = e.target.innerText.split(" ").join("_").toLowerCase()
    setCategory(e.target.innerText)
    console.log(formatted)
  }

  const updatePageNumber = () => {
    setPageNumber((prev) => prev + 1)
  }

  const handleChange = (e) => {
    setSrchQ(e.target.value)
    setRedirected(true)
    setSearched(true)
  }
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), [])

  const searchResultsUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${srchQ}&page=1&include_adult=false`

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [])

  return (
    <ThemeProvider theme={vars}>
      <Router>
        <DivApp>
          <AppContext.Provider
            value={{
              srchQ,
              debouncedChangeHandler,
              fetchCategory,
            }}
          >
            <Nav searched={searched} />
            <Switch>
              <Route exact path="/">
                <Homescreen />
                <Main />
              </Route>
              <Route exact path="/:search">
                <SearchPage
                  url={searchResultsUrl}
                  dep={srchQ}
                  redirected={redirected}
                  pageNumber={pageNumber}
                >
                  <p>
                    Results for <Span>{srchQ}</Span>
                  </p>{" "}
                </SearchPage>
                <button onClick={updatePageNumber}>click the i</button>
              </Route>
              <Route exact path={`/details/:movieName`}>
                <p>hello there</p>
              </Route>
              <Route path={"/categories/movies/popular"}>
                <SearchPage
                  url={`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
                  redirected={false}
                >
                  <p>categories : popular movie</p>
                </SearchPage>
              </Route>
              <Route path={"/categories/tv/popular"}>
                <SearchPage
                  url={`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
                  redirected={false}
                >
                  <p>categories : popular tv</p>
                </SearchPage>
              </Route>
              <Route path={"/categories/tv/on-the-air"}>
                <SearchPage
                  url={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
                  redirected={false}
                >
                  <p>categories : tv on the air</p>
                </SearchPage>
              </Route>
              <Route path={"/categories/coming-soon"}>
                <SearchPage
                  url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
                  redirected={false}
                >
                  <p>categories : coming soon</p>
                </SearchPage>
              </Route>
            </Switch>
          </AppContext.Provider>
        </DivApp>
      </Router>
    </ThemeProvider>
  )
}

export default App
