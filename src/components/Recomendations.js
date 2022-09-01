import React, { useEffect, useState } from "react"
import styled from "styled-components"

export default function Recomendations({ mediaType, movieId }) {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [recom, setRecom] = useState(null)
  console.log(recom)
  useEffect(() => {
    const fetchRecomendations = `
    https://api.themoviedb.org/3/${mediaType}/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    setIsLoading(true)
    fetch(fetchRecomendations)
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
        setRecom(data.results)
      })
      .catch((err) => {
        setSuccess(false)
        setIsLoading(false)
        console.error(err)
      })
  }, [movieId, mediaType])
  return <div>Recomendations</div>
}
