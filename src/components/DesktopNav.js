import React from "react"
import Search from "./Search"
import styled from "styled-components"

const Icon = styled.img`
  height: 30%;
  width: 30px;
`
const Ul = styled.ul`
  display: flex;
  gap: 1em;
  list-style: none;
`

export default function DesktopNav() {
  const icon = (
    <Icon src={"../images/tmdbIcon.svg"} alt={"the movie data base icon"} />
  )
  return (
    <>
      <a href="/">{icon}</a>
      <Ul>
        <li>
          <a href="#">Movies</a>
        </li>
        <li>
          <a href="#">Tv Shows</a>
        </li>
      </Ul>
      <Search color={"black"} />
    </>
  )
}
