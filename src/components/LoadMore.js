import React from "react"
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"

const LinkButton = styled(Link)`
  padding: 1em 2em;
  background: transparent;
  border: 2px solid white;
  margin-inline: auto;
`

export default function LoadMore({
  handleClick,
  pageNumber,
  children,
  forward,
}) {
  const location = useLocation()
  let sliceVal
  if (pageNumber < 10) {
    sliceVal = -6
  } else if (pageNumber > 10) {
    sliceVal = -7
  } else if (pageNumber > 100) {
    sliceVal = -8
  } else if (pageNumber > 1000) {
    sliceVal = -9
  } else if (pageNumber > 10000) {
    sliceVal = -10
  } else if (pageNumber > 100000) {
    sliceVal = -11
  }
  return (
    <>
      <button onClick={handleClick}>{children}</button>
    </>
  )
}
