// process.env.REACT_APP_API_KEY
import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { ThemeProvider } from "styled-components"
import { useEffect, useState, useCallback, useMemo } from "react"
import { vars } from "./variables/Vars"
import { AppContext } from "./AppContext"
import { SearchPage } from "./pages/SearchPage"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import debounce from "lodash.debounce"
import Genre from "./components/Genre"

const DivApp = styled.div`
  position: relative;
  width: 100%;
  color: white;
  background-color: ${({ theme }) => theme.darkBg};
`
function App() {
  const [srchQ, setSrchQ] = useState("")
  const [searchedName, setSearchedName] = useState("")
  const [searched, setSearched] = useState(false)

  const handleChange = (e) => {
    setSrchQ(e.target.value)
    setSearched(true)
    console.log("i ran")
  }
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), [])

  function search(e) {
    if (e.keyCode === 13) {
      setSearched(true)
      setSrchQ(e.target.value)
      setSearchedName(e.target.value)
    }
  }
  const searchResultsUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${srchQ}&page=1&include_adult=false`

  return (
    <ThemeProvider theme={vars}>
      <Router>
        <DivApp>
          <AppContext.Provider
            value={{
              srchQ,
              search,
              setSrchQ,
              handleChange,
              debouncedChangeHandler,
            }}
          >
            <Nav searched={searched} />
            <Switch>
              <Route exact path="/">
                {!srchQ && <Homescreen />}
                {!srchQ && <Main />}
                {srchQ && (
                  <SearchPage url={searchResultsUrl} dep={srchQ}>
                    <p>
                      Results for <span>{srchQ}</span>
                    </p>{" "}
                  </SearchPage>
                )}
              </Route>
              <Route path="/search">
                <SearchPage movieName={searchedName} />
                {/* pass searchedName so search page re renders when user clicks addEventListener
                pass srchQ so search page re renders on input change */}
              </Route>
            </Switch>
          </AppContext.Provider>
        </DivApp>
      </Router>
    </ThemeProvider>
  )
}

export default App
