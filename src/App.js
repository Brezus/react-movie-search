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
import DetailsPage from "./pages/DetailsPage"

const DivApp = styled.div`
  position: relative;
  width: 100%;
  color: white;
  background-color: ${({ theme }) => theme.darkBg};
  min-height: 100vh;
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
            <Nav navLinksArray={LinksArray} searched={searched} />
            <Switch>
              <Route exact path="/">
                <Homescreen />
                <Main pageNumber={pageNumber} />
              </Route>
              <Route exact path="/:search/page=:pNum">
                <SearchPage
                  url={searchResultsUrl}
                  dep={srchQ}
                  redirected={redirected}
                >
                  <p>
                    Results for <Span>{srchQ}</Span>
                  </p>{" "}
                </SearchPage>
              </Route>
              <Route exact path={`/categories/:genre/page=:pNum`}>
                <SearchPage redirected={false} genre={true} />
              </Route>
              <Route exact path={`/details/:movieName`}>
                <DetailsPage />
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
