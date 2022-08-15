import React, { useEffect, useState, memo } from "react"
import styled from "styled-components"
import { SearchPage as Genre } from "../pages/SearchPage"

const MainDiv = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-inline: auto;
  gap: 3em;
  padding: 5em 0;
`

const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

function Main() {
  const [genres, setGenres] = useState([])

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
      <Genre
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genres[2]?.id.toString()}&with_watch_monetization_types=flatrate`}
        dep={genres[2]?.id.toString()}
      >
        <p>{genres[2]?.name}</p>
      </Genre>
      <hr style={{ justifySelf: "center", width: "100%" }} />
      <Genre
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genres[2]?.id.toString()}&with_watch_monetization_types=flatrate`}
        dep={genres[10]?.id.toString()}
      >
        <p>{genres[10]?.name}</p>
      </Genre>
      <hr style={{ justifySelf: "center", width: "100%" }} />
      <Genre
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genres[2]?.id.toString()}&with_watch_monetization_types=flatrate`}
        dep={genres[6]?.id.toString()}
      >
        <p>{genres[6]?.name}</p>
      </Genre>
    </MainDiv>
  )
}
export default memo(Main)
