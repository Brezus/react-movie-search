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
import { nanoid } from "nanoid"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import debounce from "lodash.debounce"
import { LinksArray, navRoutesHtml } from "./navLinksArray"

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

  const updatePageNumber = () => {
    setPageNumber((prev) => prev + 1)
  }
  const reducePageNumber = () => {
    setPageNumber((prev) => (prev === 1 ? 1 : prev - 1))
    console.log("reduced page number " + pageNumber)
  }
  function resetPageNumber() {
    setPageNumber(1)
  }

  const handleChange = (e) => {
    setSrchQ(e.target.value)
    setRedirected(true)
    setSearched(true)
  }
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), [])

  const searchResultsUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${srchQ}&include_adult=false&page=1`

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler])

  return (
    <ThemeProvider theme={vars}>
      <Router>
        <DivApp>
          <AppContext.Provider
            value={{
              srchQ,
              debouncedChangeHandler,
              LinksArray,
            }}
          >
            <Nav
              resetPageNumber={resetPageNumber}
              navLinksArray={LinksArray}
              searched={searched}
            />
            <Switch>
              <Route key={nanoid()} exact path="/">
                <Homescreen />
                <Main pageNumber={pageNumber} />
              </Route>
              <Route key={nanoid()} exact path="/:search/page=:pNum">
                <SearchPage
                  url={searchResultsUrl}
                  dep={srchQ}
                  redirected={redirected}
                  pageNumber={pageNumber}
                  nextPage={updatePageNumber}
                  resetNumber={resetPageNumber}
                  prevPage={reducePageNumber}
                >
                  <p>
                    Results for <Span>{srchQ}</Span>
                  </p>{" "}
                </SearchPage>
              </Route>
              <Route key={nanoid()} exact path={`/details/:movieName`}>
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
