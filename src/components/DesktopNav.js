import React, { useContext } from "react"
import { AppContext } from "../AppContext"
import Search from "./Search"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Icon = styled.img`
  height: 30%;
  width: 30px;
`
const Ul = styled.ul`
  display: flex;
  gap: 1em;
  list-style: none;
  margin-right: auto;
`

export default function DesktopNav({ handleClick }) {
  const icon = (
    <Icon src={"../images/tmdbIcon.svg"} alt={"the movie data base icon"} />
  )

  return (
    <>
      <Link to={"/"}>{icon}</Link>
      <Ul>
        <li>
          <Link onClick={handleClick} to={"/categories/movies/popular"}>
            Popular Movies
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} to={"/categories/tv/popular"}>
            Popular Tv Shows
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} to={"/categories/tv/on-the-air"}>
            TV on Air
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} to={"/categories/coming-soon"}>
            Coming Soon
          </Link>
        </li>
      </Ul>
      <Search color={"black"} />
    </>
  )
}
