import React, { useEffect, useState, memo } from "react"
import styled from "styled-components"
import { SearchPage as Genre } from "../composition/SearchPage"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

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
  console.log("ran")
  const [genres, setGenres] = useState([])
  const desiredGenreId = [2, 6, 10]
  const genreHtml = genres.map((genre, i) => {
    return (
      <Genre
        key={nanoid()}
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genres[
          i
        ]?.id?.toString()}&with_watch_monetization_types=flatrate&page=1`}
        dep={genres[i]?.id.toString()}
        redirected={false}
      >
        <p>{genres[i]?.name}</p>
        <Link
          to={{
            pathname: `/categories/${genres[i]?.name.toLowerCase()}/page=1`,
            state: {
              id: `${genres[i]?.id}`,
              genreName: `${genres[i]?.name.toLowerCase()}`,
              linkName: `/categories/${genres[i]?.name.toLowerCase()}`,
            },
          }}
        >
          {" "}
          see more
        </Link>
      </Genre>
    )
  })

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
        setGenres(data.genres.slice(0, 6))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return <MainDiv>{genreHtml}</MainDiv>
}
export default memo(Main)
