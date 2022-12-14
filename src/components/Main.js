import React, { useEffect, useState, memo } from "react"
import styled from "styled-components"
import { SearchPage as Genre } from "../pages/SearchPage"
import { FaRegHandPointRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

const MainDiv = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-inline: auto;
  gap: 3em;
  padding: 2em 0 5em;
`

const Styledh2 = styled.h2`
  @media (min-width: 800px) {
    font-size: 2rem;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: 0.8rem;
  position: relative;
  isolation: isolate;
  letter-spacing: 2px;
  transition: letter-spacing 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 55%;
    width: 110%;
    height: 10px;
    right: 0;
    opacity: 0.5;
    background-color: ${({ theme }) => theme.darkerYellow};
    transform: skew(-25deg);
  }

  &:hover {
    letter-spacing: 5px;
  }
  &:hover:before {
    opacity: 1;
  }

  @media (min-width: 500px) {
    font-size: 1.2rem;
  }
`
const SeeMoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

function Main() {
  const [genres, setGenres] = useState([])

  const genreHtml = genres.map((genre, i) => {
    return (
      <Genre
        key={nanoid()}
        main={true}
        mainUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genres[
          i
        ]?.id?.toString()}&with_watch_monetization_types=flatrate&page=1`}
        genre={true}
        dep={genres[i]?.id.toString()}
        redirected={false}
        horizontalScroll={i % 3 === 0 && true}
        mediaType={"movie"}
      >
        <SeeMoreContainer>
          {" "}
          <Styledh2>{genres[i]?.name}</Styledh2>
          <StyledLink
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
            see more <FaRegHandPointRight />
          </StyledLink>
        </SeeMoreContainer>
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
        setGenres(data.genres.slice(0, 5))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return <MainDiv>{genreHtml}</MainDiv>
}
export default memo(Main)
