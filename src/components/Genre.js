import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { nanoid } from "nanoid"

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2em;
  border-radius: 10px;
  justify-content: center;
  overflow: hidden;
`
const Movie = styled.div`
  display: grid;
  grid-template-rows: 300px auto;
  grid-template-columns: minmax(150px, 1fr);
`
const Poster = styled.div`
  background-size: cover;
  background-position: center;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em 0;
`
const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TypeIndicator = styled.p`
  padding: 0.2em 0.8em;
  background: transparent;
  border: 1px solid whitesmoke;
  border-radius: 5px;
`

export default function Genre({ genreId, genreName }) {
  const [data, setData] = useState([])

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setData(data.results)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const movies = data?.map((movie) => {
    return (
      <Movie key={nanoid()}>
        <Poster
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`,
          }}
        />
        <Info>
          <h3>
            {movie.title.length >= 25
              ? movie.title.slice(0, 25) + "..."
              : movie.title}
          </h3>
          <MetaInfo>
            <p>
              {movie.release_date.slice(0, 4)} • ({movie.vote_average} ⭐)
            </p>
            <TypeIndicator>movie</TypeIndicator>
          </MetaInfo>
        </Info>
      </Movie>
    )
  })
  return (
    <>
      <h2>{genreName}</h2>
      <Section>{movies}</Section>
    </>
  )
}
