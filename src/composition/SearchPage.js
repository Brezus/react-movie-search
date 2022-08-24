import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { nanoid } from "nanoid"
import { Link, useLocation, useParams } from "react-router-dom"
import LoadMore from "../components/LoadMore"

const Div = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-inline: auto;
  gap: 3em;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
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
  padding: 0.2em;
  width: 70px;
  text-align: center;
  background: transparent;
  border: 1px solid whitesmoke;
  border-radius: 5px;
`

function SearchPage({
  dep = "",
  url = null,
  children,
  redirected = false,
  category = false,
  linkName,
}) {
  const [mData, setMData] = useState([])
  const location = useLocation()
  console.log(location)
  const params = useParams()

  console.log(params)
  console.log(params.pNum)
  const p = parseInt(params.pNum, 10)
  console.log(p)

  useEffect(() => {
    console.log(url)
    if (dep || url || redirected) {
      fetch(
        redirected
          ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${params.search}&include_adult=false&page=${p}`
          : url + `page=${p}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status)
          } else {
            return res.json()
          }
        })
        .then((data) => {
          setMData(data.results)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [location.pathname, dep, p, url, redirected, params.search])
  const movies = mData?.map((movie) => {
    const nameOrTitle = movie.title ? movie.title : movie.name
    const releaseOrAirDate = movie.release_date
      ? movie.release_date
      : movie.first_air_date

    return (
      <StyledLink key={nanoid()} to={`/details/${movie.title}`}>
        <Movie>
          <Poster
            style={{
              backgroundImage: `${
                movie.poster_path
                  ? `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`
                  : `url(../images/no-photo.png)`
              }`,
            }}
          />
          <Info>
            <h3>
              {nameOrTitle?.length >= 25
                ? nameOrTitle?.slice(0, 25) + "..."
                : nameOrTitle}
            </h3>
            <MetaInfo>
              <p>
                {releaseOrAirDate?.slice(0, 4)} • ({movie.vote_average} ⭐)
              </p>
              <TypeIndicator>
                {movie.first_air_date ? "tv" : "movie"}
              </TypeIndicator>
            </MetaInfo>
          </Info>
        </Movie>
      </StyledLink>
    )
  })
  return (
    <Div
      style={{
        minHeight: "100vh",
        padding: `${redirected || category ? "10rem 0 5rem" : "1rem 0 5rem"}`,
      }}
    >
      {children}
      <Section>{movies}</Section>
      {params.pNum && (
        <>
          <Link
            to={`${linkName ? linkName : `/${params.search}`}/page=${p - 1}`}
          >
            Previous
          </Link>
          <Link
            to={`${linkName ? linkName : `/${params.search}`}/page=${p + 1}`}
          >
            Next
          </Link>
        </>
      )}
    </Div>
  )
}
export { SearchPage }
