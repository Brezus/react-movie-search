import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { nanoid } from "nanoid"
import NoImage from "../assets/no-photo.png"
import CastBg from "../assets/fancy-pants.jpg"
import ProgressiveImage from "react-progressive-graceful-image"
import LoadingAnimation from "../assets/take1animation.webp"
import TextFlow from "../utils/TextFlow"

const Aside = styled.aside`
  border: 5px solid black;
  padding: 5rem 0;
`
const StyledH2 = styled.h2`
  width: 95%;
  margin: 0 auto 3rem;
`
const StyledP = styled.p`
  font-size: .8rem
  width: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const StyledSpan = styled.span`
  display: block;
  font-weight: bold;
  font-family: "Noto Sans Georgian", sans-serif;
  font-size: 1.2rem;
`

const Profiles = styled.div`
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-row-gap: 2em;
  grid-column-gap: 2em;
  grid-template-columns: 1fr 1fr;

  @media (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, 1fr);
  }
  // @media (min-width: 800px) {
  //   grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  // }
`

const ActorCont = styled.div`
  border-radius: ${({ theme }) => theme.border};
  overflow: hidden;
  outline: 5px solid white;
  width: 100%;
  background-color: white;
`
const StyledImage = styled.img`
  object-fit: cover;
  max-width: 100%;
  display: block;
`
const ProfileRole = styled.div`
  background: white;
  color: ${({ theme }) => theme.darkBg};
  padding: 0.5em;
  text-align: center;
  width: 100%;

  @media (min-width: 800px) {
    padding: 1em;
  }
`

export default function Cast({ movieId, mediaType }) {
  const [castData, setCastData] = useState([])
  useEffect(() => {
    const fetchCastUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    fetch(fetchCastUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setCastData(data.cast.slice(0, 5))
      })
      .catch((err) => {
        console.error(err)
        setCastData(null)
      })
  }, [movieId, mediaType])
  const profiles =
    castData &&
    castData.map((castMember) => {
      return (
        <ActorCont
          key={nanoid()}
          title={`${castMember?.name} as ${castMember?.character}`}
        >
          <ProgressiveImage
            src={`${
              castMember?.profile_path
                ? `https://image.tmdb.org/t/p/h632/${castMember?.profile_path}`
                : NoImage
            }`}
            placeholder={LoadingAnimation}
          >
            {(src) => (
              <StyledImage
                height={"auto"}
                width={"100%"}
                src={src}
                alt={`photo of ${castMember?.name}`}
              />
            )}
          </ProgressiveImage>
          <ProfileRole>
            <TextFlow text={castMember} horizontalScroll={false} cast={true} />
          </ProfileRole>
        </ActorCont>
      )
    })
  return (
    <>
      {castData.length >= 1 && (
        <Aside style={{ backgroundImage: `url(${CastBg})` }}>
          <StyledH2>Starring</StyledH2>
          <Profiles>{profiles}</Profiles>
        </Aside>
      )}
    </>
  )
}
