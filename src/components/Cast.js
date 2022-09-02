import React, { useEffect, useState, lazy, Suspense } from "react"
import styled from "styled-components"
import { nanoid } from "nanoid"

const SearchPage = React.lazy(() =>
  import("../composition/SearchPage").then((module) => ({
    default: module.SearchPage,
  }))
)

const Aside = styled.aside`
  border: 5px solid black;
  padding: 3rem 0;
  background-image: url(../images/fancy-pants.jpg);
  //   flex: 1;
  //   height: 550px;
`

const Profiles = styled.div`
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-row-gap: 2em;
  grid-column-gap: 4em;
`
const ActorCont = styled.div`
  height: 250px;
  display: grid;
  max-width: 300px;
  grid-template-rows: 2fr 1fr;
  border-radius: ${({ theme }) => theme.border};
  overflow: hidden;
  border: 3px solid white;
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
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [castData, setCastData] = useState([])
  useEffect(() => {
    const fetchCastUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    setIsLoading(true)
    fetch(fetchCastUrl)
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
        setCastData(data.cast.slice(0, 12))
      })
      .catch((err) => {
        setSuccess(false)
        setIsLoading(false)
        console.error(err)
      })
  }, [movieId, mediaType])
  const profiles =
    castData &&
    castData.map((castMember) => {
      return (
        <ActorCont key={nanoid()}>
          <StyledImage
            height={"170px"}
            width={"100%"}
            loading={"lazy"}
            src={`${
              castMember?.profile_path
                ? `https://image.tmdb.org/t/p/h632/${castMember?.profile_path}`
                : "../images/no-photo.png"
            }`}
          />
          <ProfileRole>
            <p>
              {castMember?.name} <span>{castMember?.character}</span>
            </p>
          </ProfileRole>
        </ActorCont>
      )
    })
  return (
    <>
      <Aside>
        <h2>Cast</h2>
        <Profiles>{profiles}</Profiles>
      </Aside>
      <SearchPage
        url={`https://api.themoviedb.org/3/${mediaType}/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
        redirected={false}
        category={true}
      >
        <h3>you may also like</h3>
      </SearchPage>
    </>
  )
}
