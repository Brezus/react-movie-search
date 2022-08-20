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
import { nanoid } from "nanoid"
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
  const navLinksArray = [
    {
      linkName: "/categories/movies/popular",
      linkNameHtml: "Popular Movies",
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
    },
    {
      linkName: "/categories/tv/popular",
      linkNameHtml: "Popular Tv Shows",
      url: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
    },
    {
      linkName: "/categories/tv/on-the-air",
      linkNameHtml: "TV on Air",
      url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
    },
    {
      linkName: "/categories/coming-soon",
      linkNameHtml: "Coming Soon",
      url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
    },
  ]
  const [navLinks] = useState(navLinksArray.map((link) => link.linkNameHtml))
  const navRoutesHtml = navLinksArray.map((link) => {
    return (
      <Route path={link.linkName} key={nanoid()}>
        <SearchPage url={link.url} redirected={false} category={true}>
          <p>categories : {link.linkNameHtml}</p>
        </SearchPage>
      </Route>
    )
  })

  function fetchCategory(e) {
    const formatted = e.target.innerText.split(" ").join("_").toLowerCase()
    setCategory(e.target.innerText)
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
              {navRoutesHtml}
            </Switch>
          </AppContext.Provider>
        </DivApp>
      </Router>
    </ThemeProvider>
  )
}

export default App
