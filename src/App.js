// process.env.REACT_APP_API_KEY
import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"

const DivApp = styled.div`
  position: relative;
`
function App() {
  return (
    <DivApp>
      <Nav />
      <Homescreen />
      <Main />
    </DivApp>
  )
}

export default App
