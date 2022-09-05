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
`

// const DivBKDrop = styled.article`
//   padding-top: 5em;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   background: rgb(32, 32, 38);
//   background-position: center;
//   min-height: 100vh;
// `

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
`

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  mix-blend-mode: overlay;
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
  position: absolute;
  z-index: 2;
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

const LoadingDiv = styled.div`
  background-image: url(../images/giphy.gif);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
`

export default function DetailsPage() {
  const [detailsData, setDetailsData] = useState(null)
  console.log(detailsData)
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
          backgroundSize: "100%",
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

// <DivBKDrop style={bgStyle}>
//             <ContainerDiv>
//               <PosterCont>
//                 <DivPoster style={posterBg}></DivPoster>
//                 <Button>Watch Trailer</Button>
//               </PosterCont>
//               <InfoCont>
//                 <h1>
//                   {detailsData?.title ? detailsData?.title : detailsData?.name}
//                 </h1>
//                 {detailsData?.tagline && <p>{detailsData.tagline}</p>}
//                 {detailsData?.release_date && (
//                   <p>{detailsData.release_date.slice(0, 4)}</p>
//                 )}
//                 {detailsData?.production_companies?.length >= 1 && (
//                   <Ul>{productionCompanies}</Ul>
//                 )}
//                 {genreList && <Ul>{genreList}</Ul>}
//                 <p style={{ maxWidth: "600px" }}>{detailsData?.overview}</p>
//               </InfoCont>
//               {/* {trailer?.key && <YouTube videoId={trailer?.key} opts={opts} />} */}
//             </ContainerDiv>
//           </DivBKDrop>
//           {mediaType && movieId ? (
//             <Cast movieId={movieId} mediaType={mediaType} />
//           ) : null}
//           <Suspense fallback={loadingDiv}>
//             <SearchPage
//               url={`https://api.themoviedb.org/3/${mediaType}/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
//               redirected={false}
//               category={true}
//               deetsPage={true}
//             >
//               <h3>you may also like</h3>
//             </SearchPage>
//           </Suspense>
