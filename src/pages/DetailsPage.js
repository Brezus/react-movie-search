import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import YouTube from "react-youtube"
import styled from "styled-components"

const Main = styled.main`
  padding-top: 7rem;
`

export default function DetailsPage() {
  const [detailsData, setDetailsData] = useState(null)
  console.log(detailsData)
  const trailer = detailsData?.videos?.results.find((video) =>
    video.name.toLowerCase().includes("trailer")
  )
  //   const trailer = videos.find((video) => video.contai)
  //   console.log(vidId)
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const opts = {
    height: "300",
    width: "400",
    playerVars: {
      autoplay: 1,
    },
  }
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
  }, [])

  return (
    <Main>
      {trailer?.key && <YouTube videoId={trailer?.key} opts={opts} />}
      <p>testing</p>
    </Main>
  )
}
