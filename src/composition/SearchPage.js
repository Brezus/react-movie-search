import React, { useState, useEffect, useContext } from "react"
import { AppContext } from "../AppContext"
import styled from "styled-components"
import { nanoid } from "nanoid"
import { Link, useLocation, useParams } from "react-router-dom"
import LoadingBar from "react-top-loading-bar"
import NoImage from "../assets/no-photo.png"
import { FiPlayCircle } from "react-icons/fi"
import LoadingAnimation from "../assets/take1animation.webp"
import ProgressiveImage from "react-progressive-graceful-image"
import Span from "../components/Span"
import useWindowSize from "../hooks/UseWindowSize"
import TextFlow from "../utils/TextFlow"

const Button = styled(Link)`
  padding: 1em 0;
  width: 150px;
  color: white;
  background-color: ${({ theme }) => theme.darkerYellow};
  display: inline-block;
  border: none;
  transform: skew(${(props) => props.skewdeg}) !important;
  position: relative;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  z-index: 1;
  align-self: center;
  font-family: "Noto Sans Georgian", sans-serif;
  font-weight: 900;
  transition: transform 0.2s ease;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 110%;
    height: 10%;
    width: 100%;
    background-color: ${({ theme }) => theme.darkBlue};
    transform: skew(${(props) => props.skewDeg});
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: skew(${(props) => props.skewDeg}) scale(1.1);

    &:after {
      opacity: 1;
    }
  }
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-inline: auto;
  gap: 3em;
  border-bottom: 1px solid ${({ theme }) => theme.darkYellow};
  font-size: 0.8rem;

  @media (min-width: 700px) {
    grid-row-gap: 6rem;
  }
  &:last-child {
    border-bottom: 0;
  }
`

const Poster = styled.div`
  background-size: 100%;
  background-position: center;
  transition: background-size 0.5s ease;
  border-radius: 10px;
  -webkit-filter: brightness(100%);
`

const DarkDiv = styled.div`
  height: 300px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background: black;
  transition: opacity 0.3s ease-in;
  opacity: 0;
`
const StyledPlay = styled(FiPlayCircle)`
  font-size: 4rem;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -70%);
  transition: all 0.3s ease-in;
  opacity: 0;
`

const StyledImg = styled.img`
  height: 300px;
  width: 100%;
  transition: opacity 0.2s ease;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  scroll-snap-align: start;
  position: relative;
  width: 100%;
  border-radius: 10px;

  &:hover ${StyledPlay} {
    opacity: 1;
    top: 40%;
    transform: translate(-50%, -40%);
  }
  &:hover ${StyledImg} {
    opacity: 0.4;
    border: 2px solid orange;
  }
`

const StyledButton = styled(Link)`
  padding: 1em 3em;
  background: white;
`

const Section = styled.section`
  display: grid;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  gap: 3em;

  @media (min-width: 800px) {
    grid-template-columns: ${(props) =>
      props.horizontal === "false"
        ? "repeat(auto-fill, minmax(244px, 1fr))"
        : "43%"} !important;
  }
`

const Movie = styled.div`
  display: grid;
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
const ButtonCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3em;
  margin-inline: auto;
`

const PageIndicator = styled.p`
  color: white;
`

function SearchPage({
  dep = "",
  url = null,
  children,
  redirected = false,
  category = false,
  linkUrl = null,
  genre = null,
  horizontalScroll = false,
  deetsPage = false,
  mediaType = null,
}) {
  const [mData, setMData] = useState([])
  const [maxString, setMaxString] = useState(25)

  const [remainingPages, setRemainingPages] = useState(null)
  const [progress, setProgress] = useState(0)
  const { clearInput } = useContext(AppContext)
  const location = useLocation()
  const params = useParams()
  const p = parseInt(params.pNum, 10)
  let toLink
  if (linkUrl) {
    toLink = `/${location?.state?.mediaType}/${location?.state?.genreName}`
  } else if (genre) {
    toLink = `/categories/${location?.state?.genreName}`
  } else {
    toLink = `/${params.search}`
  }

  useEffect(() => {
    console.log("re ran")

    window.scrollTo(0, 0)

    if (dep || url || redirected || genre) {
      const redirectedUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${params.search}&page=${p}&include_adult=false`
      const genreUrl = `https://api.themoviedb.org/3/discover/${
        mediaType || "movie"
      }?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${
        location?.state?.id
      }&with_watch_monetization_types=flatrate&`

      fetch(
        redirected
          ? redirectedUrl
          : genre
          ? genreUrl + `page=${p}`
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
          setMData(
            params.pNum
              ? data.results
              : data.results.slice(0, `${deetsPage ? 4 : 8}`)
          )
          setRemainingPages(data)
        })
        .catch((err) => {
          setMData(null)
          setRemainingPages(null)
          console.error(err)
        })
    }
  }, [location, dep, p, url, redirected, params])
  const movies = mData?.map((movie) => {
    const nameOrTitle = movie.title ? movie.title : movie.name
    const releaseOrAirDate = movie.release_date
      ? movie.release_date
      : movie.first_air_date

    return (
      <StyledLink
        title={`${nameOrTitle}`}
        style={{
          maxWidth: `${horizontalScroll ? "initial" : "300px"}`,
          overflow: `${horizontalScroll && "hidden"}`,
        }}
        onClick={clearInput}
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
              movie.poster_path && horizontalScroll ? "200px" : "300px 90px"
            }`,
            backgroundColor: `${
              horizontalScroll ? "rgba(32, 32, 38, 1)" : "transparent"
            }`,
          }}
        >
          <DarkDiv
            style={{
              opacity: `${movie.hoverd && !horizontalScroll ? "0.8" : "0"}`,
            }}
          />
          <StyledPlay />
          <ProgressiveImage
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                : `${NoImage}`
            }
            placeholder={LoadingAnimation}
          >
            {(src) => (
              <StyledImg
                src={src}
                height={"300px"}
                width={"100%"}
                style={{
                  objectFit: "cover",
                  borderRadius: "10px",
                  mixBlendMode: `${horizontalScroll ? "overlay" : "normal"}`,
                  gridRow: "1",
                  gridColumn: "1",
                }}
                alt={"movie poster"}
              />
            )}
          </ProgressiveImage>

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
            <TextFlow
              horizontalScroll={horizontalScroll}
              text={nameOrTitle}
              cast={false}
            />
            {/* <tctflow horizontalScroll/> */}
            <MetaInfo
              style={{
                gap: `${horizontalScroll && "1em"}`,
                justifyContent: `${
                  horizontalScroll ? "flex-start" : "space-between"
                }`,
              }}
            >
              <p>
                {releaseOrAirDate?.slice(0, 4)} • (
                {Math.floor(movie.vote_average)} ⭐)
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
        padding: `${
          redirected || category || genre ? "10rem 0 5rem" : "1rem 0 5rem"
        }`,
      }}
    >
      {!mData ? (
        <p>nothing</p>
      ) : mData.length >= 1 ? (
        <>
          <LoadingBar
            color="#f11946"
            progress={!mData ? 20 : 100}
            onLoaderFinished={() => setProgress(0)}
          />
          {children}
          {location?.pathname.length > 1 && !deetsPage && (
            <h1>
              {genre ? "Genre" : "Results for"}:{" "}
              <Span>{genre ? params?.genre : params?.search}</Span>
            </h1>
          )}

          <Section
            horizontal={`${horizontalScroll ? "true" : "false"}`}
            style={
              horizontalScroll
                ? {
                    gridAutoColumns: "43%",
                    gridAutoFlow: "column",
                    scrollSnapType: "inline mandatory",
                  }
                : {
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    justifyContent: "center",
                    placeItems: "center",
                  }
            }
          >
            {movies}
          </Section>
          {params.pNum && (
            <ButtonCont>
              <Button
                skewdeg={"15deg"}
                style={{ display: `${p === 1 ? "none" : "initial"}` }}
                to={{
                  pathname: `${toLink}/page=${p === 1 ? 1 : p - 1}`,
                  state: {
                    id: `${location?.state?.id}`,
                    genreName: `${location?.state?.genreName}`,
                    mediaType: `${location?.state?.mediaType}`,
                  },
                }}
              >
                Previous
              </Button>
              <PageIndicator>
                Page {remainingPages?.page} of {remainingPages?.total_pages}
              </PageIndicator>
              <Button
                style={{
                  display: `${
                    p === remainingPages?.total_pages ? "none" : "initial"
                  }`,
                }}
                skewdeg={"-15deg"}
                to={{
                  pathname: `${toLink}/page=${p + 1}`,
                  state: {
                    id: `${location?.state?.id}`,
                    genreName: `${location?.state?.genreName}`,
                    mediaType: `${location?.state?.mediaType}`,
                  },
                }}
              >
                Next
              </Button>
            </ButtonCont>
          )}
        </>
      ) : (
        <p>no such result</p>
      )}
    </Div>
  )
}
export { SearchPage }
