import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { nanoid } from "nanoid"

const Div = styled.div`
  min-height: 100vh;
  padding: 5em 0;
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-inline: auto;
  gap: 3em;
`
const Span = styled.span`
  display: block;
  font-size: 3rem;
`
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

function SearchPage({ dep, url, children }) {
  const [data, setData] = useState([])
  useEffect(() => {
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
  }, [dep])
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
              ? movie.title?.slice(0, 25) + "..."
              : movie.title}
          </h3>
          <MetaInfo>
            <p>
              {movie.release_date?.slice(0, 4)} • ({movie.vote_average} ⭐)
            </p>
            <TypeIndicator>movie</TypeIndicator>
          </MetaInfo>
        </Info>
      </Movie>
    )
  })
  return (
    <Div style={{ minHeight: "100vh" }}>
      {/* <p>
        Search Results for <Span>{dep}</Span>
      </p> */}
      {children}
      <Section>{movies}</Section>
    </Div>
  )
}
export { SearchPage }
