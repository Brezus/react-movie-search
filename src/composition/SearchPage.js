import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { nanoid } from "nanoid"
import { Link, useLocation, useParams } from "react-router-dom"
import LoadingBar from "react-top-loading-bar"

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
  linkName = null,
  genre = null,
}) {
  const [mData, setMData] = useState([])
  console.log(mData)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const params = useParams()
  const p = parseInt(params.pNum, 10)
  let toLink
  if (linkName) {
    toLink = linkName
  } else if (genre) {
    toLink = `/categories/${location?.state?.genreName}`
  } else {
    toLink = `/${params.search}`
  }

  useEffect(() => {
    if (dep || url || redirected || genre) {
      const redirectedUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${params.search}&page=${p}&include_adult=false`
      const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${p}&with_genres=${location?.state?.id}&with_watch_monetization_types=flatrate`
      fetch(redirected ? redirectedUrl : genre ? genreUrl : url + `page=${p}`)
        .then((res) => {
          setIsLoading(true)
          if (!res.ok) {
            throw new Error(res.status)
          } else {
            return res.json()
          }
        })
        .then((data) => {
          setMData(params.pNum ? data.results : data.results.slice(0, 8))
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          console.error(err)
        })
    }
  }, [
    location.pathname,
    dep,
    p,
    url,
    redirected,
    params.search,
    location.state?.id,
  ])
  const movies = mData?.map((movie) => {
    const nameOrTitle = movie.title ? movie.title : movie.name
    const releaseOrAirDate = movie.release_date
      ? movie.release_date
      : movie.first_air_date

    return (
      <StyledLink
        key={nanoid()}
        to={{
          pathname: `/details/${movie.title}`,
          state: {
            detailsUrl: `https://api.themoviedb.org/3/${
              movie.first_air_date ? "tv" : "movie"
            }/${movie.id}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&append_to_response=videos`,
          },
        }}
      >
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
        padding: `${
          redirected || category || genre ? "10rem 0 5rem" : "1rem 0 5rem"
        }`,
      }}
    >
      <LoadingBar
        color="#f11946"
        progress={isLoading ? 20 : 100}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
      {genre && <p>Genre: {location?.state?.genreName}</p>}
      <Section>{movies}</Section>
      {params.pNum && (
        <>
          <Link
            to={{
              pathname: `${toLink}/page=${p === 1 ? 1 : p - 1}`,
              state: {
                id: `${location?.state?.id}`,
                genreName: `${location?.state?.genreName}`,
              },
            }}
          >
            Previous
          </Link>
          <Link
            to={{
              pathname: `${toLink}/page=${p + 1}`,
              state: {
                id: `${location?.state?.id}`,
                genreName: `${location?.state?.genreName}`,
              },
            }}
          >
            Next
          </Link>
        </>
      )}
    </Div>
  )
}
export { SearchPage }
