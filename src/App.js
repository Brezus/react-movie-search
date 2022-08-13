// process.env.REACT_APP_API_KEY
import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { ThemeProvider } from "styled-components"
import { useEffect, useState } from "react"
import { vars } from "./variables/Vars"
import { AppContext } from "./AppContext"
import SearchPage from "./pages/SearchPage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  matchPath,
} from "react-router-dom"

const DivApp = styled.div`
  position: relative;
  width: 100%;
  color: white;
  background-color: ${({ theme }) => theme.darkBg};
`
function App() {
  const [srchQ, setSrchQ] = useState("")
  const [searchedName, setSearchedName] = useState()
  const [searched, setSearched] = useState(false)
  function search(e, history) {
    if (e.keyCode === 13) {
      setSearched(true)
      setSrchQ(e.target.value)
      history.push("/search")
      setSearchedName(e.target.value)
    }
  }

  return (
    <ThemeProvider theme={vars}>
      <Router>
        <DivApp>
          <AppContext.Provider value={{ srchQ, search, setSrchQ }}>
            <Nav searched={searched} />
            <Switch>
              <Route exact path="/">
                <Homescreen />
                <Main />
              </Route>
              <Route path="/search">
                <SearchPage movieName={searchedName} />
              </Route>
            </Switch>
          </AppContext.Provider>
        </DivApp>
      </Router>
    </ThemeProvider>
  )
}

export default App
