// process.env.REACT_APP_API_KEY
import Nav from "./components/Nav"
import styled from "styled-components"
import Homescreen from "./components/Homescreen"
import Main from "./components/Main"
import { ThemeProvider } from "styled-components"
import { useEffect, useState } from "react"
import { colors } from "./variables/Vars"

const key = process.env.REACT_APP_API_KEY
const baseBackdropImgUrl = "http://image.tmdb.org/t/p/original"
const basePosterImgUrl = "http://image.tmdb.org/t/p/w780"
const sliceVal = 20
const moviesAndTvUrl =
  "https://api.themoviedb.org/3/trending/all/day?api_key=key"
const tvUrl = "https://api.themoviedb.org/3/trending/tv/day?api_key=key"
const movieUrl = "https://api.themoviedb.org/3/trending/movie/day?api_key=key"

const DivApp = styled.div`
  position: relative;
  width: 100%;
`
function App() {
  return (
    <ThemeProvider theme={colors}>
      <DivApp>
        <Nav />
        <Homescreen />
        <Main />
      </DivApp>
    </ThemeProvider>
  )
}

export default App
