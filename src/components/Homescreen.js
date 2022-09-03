import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

const Display = styled.div`
  background-color: black;
  min-height: ${({ theme }) => theme.hScreenHeight};
  background-size: cover;
  height: 100vh;
  position: relative;
  z-index: 9;
  &:before {
    content: "";
    height: ${({ theme }) => theme.gradientHight};
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 11;
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
    z-index: 11;
    background: ${({ theme }) => theme.gBackgroundGradient};
  }
`

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  z-index: 10;
`
const key = process.env.REACT_APP_API_KEY
const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`

function Homescreen() {
  const [fetchedData, setFetchedData] = useState([])
  console.log(fetchedData)
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 19)
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setFetchedData(data.results[randomNumber])
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <Display>
        <StyledImage
          loading="lazy"
          height={"100%"}
          width={"100%"}
          src={
            fetchedData.backdrop_path
              ? `http://image.tmdb.org/t/p/original${fetchedData.backdrop_path}`
              : ""
          }
        />
      </Display>
    </>
  )
}
export default memo(Homescreen)
