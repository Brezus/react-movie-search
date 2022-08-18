// process.env.REACT_APP_API_KEY
import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { ThemeProvider } from "styled-components"
import { useEffect, useState, useMemo } from "react"
import { vars } from "./variables/Vars"
import { AppContext } from "./AppContext"
import { SearchPage } from "./pages/SearchPage"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import debounce from "lodash.debounce"

const DivApp = styled.div`
  position: relative;
  width: 100%;
  color: white;
  background-color: ${({ theme }) => theme.darkBg};
`
function App() {
  const [srchQ, setSrchQ] = useState("")
  const [searched, setSearched] = useState(false)
  const [redirected, setRedirected] = useState(false)

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
            }}
          >
            <Nav searched={searched} />
            <Switch>
              <Route exact path="/">
                <Homescreen />
                <Main />
              </Route>
              <Route path="/:search">
                <SearchPage
                  url={searchResultsUrl}
                  dep={srchQ}
                  redirected={redirected}
                >
                  <p>
                    Results for <span>{srchQ}</span>
                  </p>{" "}
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
