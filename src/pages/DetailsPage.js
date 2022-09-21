import React, { useEffect, useState, lazy, Suspense } from "react"
import { useLocation } from "react-router-dom"
import YouTube from "react-youtube"
import styled from "styled-components"
import { nanoid } from "nanoid"
import Cast from "../components/Cast"
import LoadingAnimation from "../assets/giphy.gif"
import ProgressiveImage from "react-progressive-graceful-image"

const SearchPage = lazy(() =>
  import("../composition/SearchPage").then((module) => ({
    default: module.SearchPage,
  }))
)

const Main = styled.main`
  padding-top: 5rem;
  padding-bottom: 5rem;
  min-height: 100vh;
`

const DivBKDrop = styled.article`
  padding-top: 5em;
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(32, 32, 38);
  background-position: center;
  min-height: 100vh;
  position: relative;
  background-color: rgba(32, 32, 38, 1);
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 700px) {
    flex-direction: column;
    row-gap: 4em;
    padding-top: 0;
  }
`

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  mix-blend-mode: overlay;

  @media (max-width: 700px) {
    position: relative;
  }
`

const PosterCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  grid-area: poster;
`

const DivPoster = styled.div`
  height: 350px;
  border-radius: ${({ theme }) => theme.border};
  background: black;
  background-size: cover;
  background-position: center;
  width: 100%;

  @media (max-width: 700px) {
    height: 200px;
  }
`

const ContainerDiv = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  gap: 5em;

  @media (max-width: 700px) {
    display: grid;
    grid-row-gap: 1em;
    grid-column-gap: 0.8em;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "poster title"
      "desc    desc";
  }
`

const Button = styled.button`
  padding: 1em 3em;
  margin-bottom: 5em;
  background-color: ${({ theme }) => theme.darkYellow};
  color: white;
  border-radius: ${({ theme }) => theme.border};
  border: none;
  width: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`
const ButtonMob = styled(Button)`
  margin-bottom: 0;
  padding: 1em;
  max-width: 200px;
  @media (max-width: 700px) {
    display: inline;
  }
`
const InfoCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  justify-content: flex-start;
  align-items: baseline;
  flex: 2;
  position: relative;

  @media (max-width: 700px) {
    display: none;
  }
`

const StyledH1 = styled.h1`
  font-family: "Noto Sans Georgian", sans-serif;
  font-size: ${({ theme }) => theme.fontSize};
  font-weight: 900;

  @media (max-width: 700px) {
    display: none;
  }
`
const StyledH1Mob = styled.h1`
  font-family: "Noto Sans Georgian", sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  text-align: center;

  @media (min-width: 700px) {
    display: none;
  }
`

const StyledP = styled.p`
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  font-weight: 400;

  @media (max-width: 700px) {
    display: none;
  }
`

const StyledPMob = styled.p`
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  font-weight: 400;

  @media (min-width: 700px) {
    display: none;
  }
`

const StyledYear = styled(StyledH1)`
  font-size: 1rem;
`
const StyledParagraph = styled.p`
  font-family: "Noto Sans Georgian", sans-serif;
  margin-bottom: 5em;
  font-weight: 400;
  font-size: 1.2rem;
  text-transform: capitalise;

  @media (max-width: 700px) {
    display: none;
  }
`

const StyledParagraphMob = styled.p`
  font-family: "Noto Sans Georgian", sans-serif;
  margin-bottom: 5em;
  font-weight: 400;
  font-size: 1.2rem;
  text-transform: capitalise;
  grid-area: desc;

  @media (min-width: 700px) {
    display: none;
  }
`

const Ul = styled.ul`
  padding: 0;
  display: flex;
  gap: 1em;
  list-style: none;
  margin: 0;
`

const LoadingDiv = styled.div`
  background-image: url(../images/giphy.gif);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
`

const Title = styled.div`
  grid-area: title;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  @media (min-width: 700px) {
    display: none;
  }
`

export default function DetailsPage() {
  const [detailsData, setDetailsData] = useState(null)
  const trailer = detailsData?.videos?.results.find((video) =>
    video.name.toLowerCase().includes("trailer")
  )
  const location = useLocation()
  const loadingDiv = <div>loading</div>
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
  const opts = {
    height: "300",
    width: "400",
    playerVars: {
      autoplay: 1,
    },
  }
  const bgStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(32,32,38,0.75) 0%, rgba(1,11,19,1) 100%), url(${bkdrp})`,
    backgroundSize: `${detailsData?.backdrop_path ? "cover" : "contain"}`,
  }
  const posterBg = {
    backgroundImage: `url(${postr && postr})`,
  }
  const genreList = detailsData?.genres.map((genre) => (
    <li style={{ textTransform: "uppercase" }} key={nanoid()}>
      {genre.name}
    </li>
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
          height: "50px",
          width: "50px",
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
    window.scrollTo(0, 0)
    if (location?.state?.detailsUrl) {
      fetch(location?.state?.detailsUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status)
          } else {
            return res.json()
          }
        })
        .then((data) => {
          setDetailsData(data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [location.pathname, location.state])

  return (
    <Main>
      {!detailsData ? (
        <LoadingDiv />
      ) : (
        <>
          <DivBKDrop>
            <ProgressiveImage src={bkdrp} placeholder={LoadingAnimation}>
              {(src) => (
                <StyledImg
                  src={src}
                  height={"100%"}
                  width={"100%"}
                  alt={"backdrop"}
                />
              )}
            </ProgressiveImage>

            <ContainerDiv>
              <PosterCont>
                <DivPoster style={posterBg}></DivPoster>
                <Button>Watch Trailer</Button>
              </PosterCont>
              <InfoCont>
                <StyledH1>
                  {detailsData?.title ? detailsData?.title : detailsData?.name}
                </StyledH1>
                {detailsData?.tagline && (
                  <StyledP>{detailsData.tagline}</StyledP>
                )}
                {detailsData?.release_date && (
                  <StyledYear>
                    {detailsData.release_date.slice(0, 4)}
                  </StyledYear>
                )}
                {detailsData?.production_companies?.length >= 1 && (
                  <Ul>{productionCompanies}</Ul>
                )}
                {genreList && <Ul>{genreList}</Ul>}
                <StyledParagraph style={{ maxWidth: "700px" }}>
                  {detailsData?.overview}
                </StyledParagraph>
              </InfoCont>
              <Title>
                <StyledH1Mob>
                  {detailsData?.title ? detailsData?.title : detailsData?.name}
                </StyledH1Mob>
                <ButtonMob>Watch Trailer</ButtonMob>
              </Title>

              <StyledParagraphMob style={{ maxWidth: "700px" }}>
                {detailsData?.overview}
              </StyledParagraphMob>
              {/* {trailer?.key && <YouTube videoId={trailer?.key} opts={opts} />} */}
            </ContainerDiv>
          </DivBKDrop>
          {mediaType && movieId ? (
            <Cast movieId={movieId} mediaType={mediaType} />
          ) : null}
          <Suspense fallback={loadingDiv}>
            <SearchPage
              url={`https://api.themoviedb.org/3/${mediaType}/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
              redirected={false}
              category={true}
              deetsPage={true}
            >
              <h3>you may also like</h3>
            </SearchPage>
          </Suspense>
        </>
      )}
    </Main>
  )
}
