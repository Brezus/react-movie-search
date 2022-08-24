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

export default function DesktopNav({ navRouterLinks }) {
  const icon = (
    <Icon src={"../images/tmdbIcon.svg"} alt={"the movie data base icon"} />
  )

  return (
    <>
      <Link to={"/"}>{icon}</Link>
      <Ul>{navRouterLinks}</Ul>
      <Search color={"black"} />
    </>
  )
}
