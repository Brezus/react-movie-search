import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Genre from "./Genre"

const MainDiv = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-inline: auto;
  gap: 3em;
  padding: 5em 0;
`
const key = process.env.REACT_APP_API_KEY
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`

export default function Main() {
  const [genres, setGenres] = useState([])
  console.log(genres)
  useEffect(() => {
    fetch(genreUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setGenres(data.genres)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <MainDiv>
      <Genre genreId={genres[2]?.id.toString()} genreName={genres[2]?.name} />
      <hr style={{ justifySelf: "center", width: "100%" }} />
      <Genre genreId={genres[10]?.id.toString()} genreName={genres[10]?.name} />
      <hr style={{ justifySelf: "center", width: "100%" }} />
      <Genre genreId={genres[6]?.id.toString()} genreName={genres[6]?.name} />
    </MainDiv>
  )
}
