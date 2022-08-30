import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import YouTube from "react-youtube"
import styled from "styled-components"
import { nanoid } from "nanoid"
import Cast from "../components/Cast"

const Main = styled.main`
  padding-top: 5rem;
`

const DivBKDrop = styled.article`
  min-height: 100vh;
  padding-top: 5em;
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(32, 32, 38);
  background-size: cover;
  background-position: center;
`

const PosterCont = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 2em;
`

const DivPoster = styled.div`
  height: 350px;
  border-radius: ${({ theme }) => theme.border};
  background: black;
  background-size: cover;
  background-position: center;
  width: 100%;
`

const ContainerDiv = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  gap: 5em;
`
const Button = styled.button`
  padding: 1em 3em;
  background-color: orange;
  color: white;
  border-radius: ${({ theme }) => theme.border};
  border: none;
  width: 100%;
`
const InfoCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  justify-content: flex-start;
  align-items: baseline;
  flex: 2;
`

const Ul = styled.ul`
  padding: 0;
  display: flex;
  gap: 1em;
  list-style: none;
  margin: 0;
`

export default function DetailsPage() {
  const [detailsData, setDetailsData] = useState(null)
  const trailer = detailsData?.videos?.results.find((video) =>
    video.name.toLowerCase().includes("trailer")
  )
  const location = useLocation()
  const bkdrp = `${
    detailsData?.backdrop_path
      ? `https://image.tmdb.org/t/p/original/${detailsData.backdrop_path}`
      : null
  }`
  const postr = `${
    detailsData?.poster_path
      ? `https://image.tmdb.org/t/p/w500/${detailsData.poster_path}`
      : null
  }`
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const opts = {
    height: "300",
    width: "400",
    playerVars: {
      autoplay: 1,
    },
  }
  const bgStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(32,32,38,0.75) 0%, rgba(1,11,19,1) 100%), url(${bkdrp})`,
  }
  const posterBg = {
    backgroundImage: `url(${postr})`,
  }
  const genreList = detailsData?.genres.map((genre) => (
    <li key={nanoid()}>{genre.name}</li>
  ))
  const productionCompanies =
    detailsData?.production_companies &&
    detailsData.production_companies.map((company) => (
      <li
        key={nanoid()}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w45/${company?.logo_path})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "30px",
          width: "30px",
          display: `${company?.logo_path ? "initial" : "none"}`,
        }}
      ></li>
    ))
  const movieId = detailsData?.id
  const mediaType = detailsData?.release_date ? "movie" : "tv"
  function _onReady(e) {
    e.target.pauseVideo()
  }
  useEffect(() => {
    setIsLoading(true)
    fetch(location?.state?.detailsUrl)
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
        setDetailsData(data)
      })
      .catch((err) => {
        setSuccess(false)
        setIsLoading(false)
        console.error(err)
      })
  }, [location.pathname])

  return (
    <Main>
      <DivBKDrop style={bgStyle}>
        <ContainerDiv>
          <PosterCont>
            <DivPoster style={posterBg}></DivPoster>
            <Button>Watch Trailer</Button>
          </PosterCont>
          <InfoCont>
            <h1>
              {detailsData?.title ? detailsData?.title : detailsData?.name}
            </h1>
            {detailsData?.tagline && <p>{detailsData.tagline}</p>}
            {detailsData?.release_date && (
              <p>{detailsData.release_date.slice(0, 4)}</p>
            )}
            {detailsData?.production_companies?.length >= 1 && (
              <Ul>{productionCompanies}</Ul>
            )}
            {genreList && <Ul>{genreList}</Ul>}
            <p style={{ maxWidth: "600px" }}>{detailsData?.overview}</p>
          </InfoCont>
          {/* {trailer?.key && <YouTube videoId={trailer?.key} opts={opts} />} */}
        </ContainerDiv>
      </DivBKDrop>
      {mediaType && movieId ? (
        <Cast movieId={movieId} mediaType={mediaType} />
      ) : null}
    </Main>
  )
}
