import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Display = styled.div`
  background-color: black;
  min-height: ${({ theme }) => theme.hScreenHeight};
  background-size: cover;
  height: 80vh;
  position: relative;
  z-index: 9;
  border-bottom: 1px solid orange;
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
    height: 600px;
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 900;
  font-family: ${({ theme }) => theme.ffm};
  font-size: 1.4rem;
  display: inline-block;

  @media (min-width: 500px) {
    font-size: 2rem;
  }
`

const StyledDiv = styled.div`
  position: absolute;
  left: 10%;
  top: 75%;
  transform: translate(-10%, -75%);
  width: 88%;
  z-index: 15;
  max-width: 700px;
`

const StyledP = styled.p`
  font-family: ${({ theme }) => theme.ffs};
  font-size: 0.7rem;

  @media (min-width: 500px) {
    font-size: 1.2rem;
  }
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
          height={"100%"}
          width={"100%"}
          src={
            fetchedData.backdrop_path
              ? `https://image.tmdb.org/t/p/original${fetchedData.backdrop_path}`
              : ""
          }
        />
        <StyledDiv>
          <StyledLink
            to={{
              pathname: `/details/${
                fetchedData.title || fetchedData.original_title
              }`,
              state: {
                detailsUrl: `https://api.themoviedb.org/3/${"movie"}/${
                  fetchedData.id
                }?api_key=${
                  process.env.REACT_APP_API_KEY
                }&language=en-US&append_to_response=videos`,
                mediaType: "movie",
              },
            }}
          >
            <h1>{fetchedData.title || fetchedData.original_title}</h1>
          </StyledLink>
          <StyledP>{fetchedData.overview}</StyledP>
        </StyledDiv>
      </Display>
    </>
  )
}
export default memo(Homescreen)
