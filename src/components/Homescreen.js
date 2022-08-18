import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

const Display = styled.div`
  background-color: black;
  min-height: ${({ theme }) => theme.hScreenHeight};
  background-size: cover;
  background-position: center top;
  position: relative;
  z-index: 9;
  &:before {
    content: "";
    height: ${({ theme }) => theme.gradientHight};
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgb(252, 252, 252);
    background: linear-gradient(
      0deg,
      rgba(252, 252, 252, 0) 0%,
      rgba(38, 38, 45, 0.8) 100%
    );
  }
  &:after {
    content: "";
    height: ${({ theme }) => theme.gradientHight};
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gBackgroundGradient};
  }
`
const key = process.env.REACT_APP_API_KEY
const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`

function Homescreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fetchedData, setFetchedData] = useState([])
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 19)

    setIsLoading(true)
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setSuccess(true)
        setIsLoading(false)
        setFetchedData(data.results[randomNumber])
      })
      .catch((err) => {
        setSuccess(false)
        setIsLoading(false)
        console.error(err)
      })
  }, [])

  return (
    <>
      <Display
        style={{
          backgroundImage: fetchedData.backdrop_path
            ? `url(http://image.tmdb.org/t/p/original${fetchedData.backdrop_path})`
            : "",
        }}
      >
        <div>play</div>
      </Display>
    </>
  )
}
export default memo(Homescreen)
