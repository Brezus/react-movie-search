import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Div = styled.div`
  min-height: 100vh;
  padding-top: 10rem;
  width: 95%;
  margin-inline: auto;
`

const Span = styled.span`
  display: block;
  font-size: 3rem;
`

export default function SearchPage({ movieName }) {
  const [data, setData] = useState([])
  const [newSearch, setNewSearch] = useState()
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${movieName}&page=1&include_adult=false`

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setData(data)
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [movieName])
  return (
    <Div style={{ minHeight: "100vh" }}>
      Search Results for <Span>{movieName}</Span>
    </Div>
  )
}
