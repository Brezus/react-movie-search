import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { ThemeProvider } from "styled-components"
import { useEffect, useState, useMemo } from "react"
import { vars } from "./variables/Vars"
import { AppContext } from "./AppContext"
import { SearchPage } from "./composition/SearchPage"
import DetailsPage from "./pages/DetailsPage"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import debounce from "lodash.debounce"
import { LinksArray, navRoutesHtml } from "./navLinksArray"
import "./App.css"

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
  const [openMenu, setOpenMenu] = useState(false)
  const [searched, setSearched] = useState(false)
  const [redirected, setRedirected] = useState(false)
  const [debounced, setDebounced] = useState(false)

  function clearInput() {
    setDebounced(false)
    console.log("clicked")
  }

  const handleChange = (e) => {
    setSrchQ(e.target.value)
    setRedirected(true)
    setSearched(true)
    setDebounced(true)
  }
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), [])

  const searchResultsUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.REACT_APP_API_KEY
  }&language=en-US&query=${srchQ || "sonic"}&include_adult=false&`

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler, srchQ])

  return (
    <ThemeProvider theme={vars}>
      <Router>
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
              openMenu={openMenu}
            />
            <Switch>
              <Route exact path="/">
                <Homescreen />
                <Main />
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

              <Route exact path={`/details/:movieName`}>
                <DetailsPage />
              </Route>
              <Route exact path={`/categories/:genre/page=:pNum`}>
                <SearchPage redirected={false} genre={true} />
              </Route>
              {navRoutesHtml}
              <Route path="*">
                <p>you folllowed zoros directions didnt</p>
              </Route>
            </Switch>
          </AppContext.Provider>
        </DivApp>
      </Router>
    </ThemeProvider>
  )
}

export default App
