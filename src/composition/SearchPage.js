import React, { useState, useEffect } from "react"
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
  scroll-snap-align: start;
`

const Section = styled.section`
  display: grid;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  gap: 2em;
`

const Movie = styled.div`
  display: grid;
`
const Poster = styled.div`
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
`
const MetaInfo = styled.div`
  display: flex;
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
  horizontalScroll = false,
}) {
  const [mData, setMData] = useState([])
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
    window.scrollTo(0, 0)

    setIsLoading(true)
    if (dep || url || redirected || genre) {
      const redirectedUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${params.search}&page=${p}&include_adult=false`
      const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${p}&with_genres=${location?.state?.id}&with_watch_monetization_types=flatrate`
      fetch(redirected ? redirectedUrl : genre ? genreUrl : url + `page=${p}`)
        .then((res) => {
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
          pathname: `/details/${movie.title ? movie.title : movie.name}`,
          state: {
            detailsUrl: `https://api.themoviedb.org/3/${
              movie.first_air_date ? "tv" : "movie"
            }/${movie.id}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&append_to_response=videos`,
          },
        }}
      >
        <Movie
          style={{
            gridTemplateRows: `${
              movie.poster_path && horizontalScroll ? "200px" : "300px auto"
            }`,
            gridTemplateColumns: `${"minmax(150px, 1fr)"}`,
          }}
        >
          <Poster
            style={{
              backgroundImage: `${
                movie.poster_path && horizontalScroll
                  ? `linear-gradient(90deg, rgba(32,32,38,0.8) 0%, rgba(1,11,19,0.7) 100%), url(https://image.tmdb.org/t/p/w780${movie.poster_path})`
                  : movie.poster_path
                  ? `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`
                  : `url(../images/no-photo.png)`
              }`,
              backgroundBlendMode: `${
                horizontalScroll ? "multiply" : "normal"
              }`,
              maxWidth: `${!horizontalScroll && "300px"}`,
              gridRow: "1",
              gridColumn: "1",
            }}
          />
          <Info
            style={{
              gridRow: `${horizontalScroll ? "1" : "initial"}`,
              gridColumn: `${horizontalScroll ? "1" : "initial"}`,
              gap: `${!horizontalScroll && "1em"}`,
              padding: `${!horizontalScroll ? "1em 0 0" : "0 0 1em"}`,
              alignSelf: "end",
              margin: `${horizontalScroll && "0 auto"}`,
              width: `${horizontalScroll && "95%"}`,
            }}
          >
            <h3>
              {nameOrTitle?.length >= 25
                ? nameOrTitle?.slice(0, 25) + "..."
                : nameOrTitle}
            </h3>
            <MetaInfo
              style={{
                gap: `${horizontalScroll && "1em"}`,
                justifyContent: `${
                  horizontalScroll ? "flex-start" : "space-between"
                }`,
              }}
            >
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

      <Section
        style={
          horizontalScroll
            ? {
                gridAutoColumns: "33%",
                gridAutoFlow: "column",
                scrollSnapType: "inline mandatory",
              }
            : {
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                justifyContent: "center",
              }
        }
      >
        {movies}
      </Section>
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
