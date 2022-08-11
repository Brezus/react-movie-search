import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Display = styled.div`
  background: green;
  min-height: ${({ theme }) => theme.hScreenHeight};
  background-image: ${(props) => props.bgImg};
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

export default function Homescreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fetchedData, setFetchedData] = useState([])
  const randomNumber = Math.floor(Math.random() * 19)
  console.log(fetchedData)
  useEffect(() => {
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
        setFetchedData(data.results)
      })
      .catch((err) => {
        setSuccess(false)
        setIsLoading(false)
        console.error(err)
      })
  }, [])
  const baseBackdropImgUrl = "http://image.tmdb.org/t/p/original"
  const backgroundImg = `url(${
    baseBackdropImgUrl + fetchedData[randomNumber]?.poster_path
  })`

  return (
    <Display bgImg={backgroundImg}>
      <div>play</div>
    </Display>
  )
}
