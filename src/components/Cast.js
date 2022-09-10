import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { nanoid } from "nanoid"
import NoImage from "../assets/no-photo.png"
import CastBg from "../assets/fancy-pants.jpg"
import ProgressiveImage from "react-progressive-graceful-image"
import LoadingAnimation from "../assets/take1animation.webp"

const Aside = styled.aside`
  border: 5px solid black;
  padding: 5rem 0;
`
const StyledH2 = styled.h2`
  width: 95%;
  margin: 0 auto 3rem;
`
const StyledSpan = styled.span`
  display: block;
`

const Profiles = styled.div`
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-row-gap: 2em;
  grid-column-gap: 4em;
  place-items: center;
`
const ActorCont = styled.div`
  height: 300px;
  display: grid;
  grid-template-columns: 200px;
  grid-template-rows: 1fr 1fr;
  border-radius: ${({ theme }) => theme.border};
  overflow: hidden;
  outline: 5px solid white;
`
const StyledImage = styled.img`
  object-fit: cover;
  max-width: 100%;
  display: block;
`
const ProfileRole = styled.div`
  background: white;
  color: ${({ theme }) => theme.darkBg};
  padding: 0 1em;
  text-align: center;
`

export default function Cast({ movieId, mediaType }) {
  const [castData, setCastData] = useState([])
  console.log(castData)
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
        <ActorCont key={nanoid()}>
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
                height={"170px"}
                width={"100%"}
                src={src}
                alt={`portrait of ${castMember?.name}`}
              />
            )}
          </ProgressiveImage>
          <ProfileRole>
            <p>
              {castMember?.name}{" "}
              {castMember?.character && (
                <StyledSpan>as: {castMember?.character}</StyledSpan>
              )}
            </p>
          </ProfileRole>
        </ActorCont>
      )
    })
  return (
    <>
      {castData && (
        <Aside style={{ backgroundImage: `url(${CastBg})` }}>
          <StyledH2>Starring</StyledH2>
          <Profiles>{profiles}</Profiles>
        </Aside>
      )}
    </>
  )
}
