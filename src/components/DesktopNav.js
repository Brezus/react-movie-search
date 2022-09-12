import React, { useContext, useState } from "react"
import { AppContext } from "../AppContext"
import Search from "./Search"
import styled from "styled-components"
import { Link } from "react-router-dom"
import ApiLogo from "../assets/tmdbIcon.svg"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle } from "react-icons/ai"
import Genres from "./Genres"
import { MdMonitor } from "react-icons/md"
import { BiCameraMovie } from "react-icons/bi"
import { nanoid } from "nanoid"

const LinksContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 200%;
  width: 100%;
  flex-wrap: wrap;
  border: 2px solid white;
  gap: 2em;
  align-items: center;
  background-color: ${({ theme }) => theme.darkBg};
  padding: 4em;
`

const BurgerIcon = styled.a`
  height: ${({ theme }) => theme.inputHeight};
  width: ${({ theme }) => theme.inputHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(238, 238, 228, 0.5);
  border-radius: 50px;
  z-index: 301;
  font-size: 1.5rem;

  @media (min-width: 800px) {
    display: none;
  }
`

const Icon = styled.img`
  height: 30%;
  width: 30px;
`

const Ul = styled.ul`
  display: flex;
  gap: 1em;
  list-style: none;
  margin-right: auto;
  position: absolute;
  left: 6%;
  width: 44%;

  @media (max-width: 800px) {
    display: none;
  }
`

const OpenUL = styled(Ul)`
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    transition: right 0.5s ease;
    background-color: #1c1f29;
    padding: 0 1em;
    margin: 0;
    z-index: 300;
    @media (min-width: 800px) {
      display: none;
      
    }
    @media (max-width: 799px) {
      display: flex;
    }

  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

export default function DesktopNav({
  navRouterLinks,
  openMenu,
  setOpenMenu,
  toggleMenu,
  setClickedInside,
  clickedInside,
  tvGenres,
  movieGenres,
}) {
  const [openTvLinks, setOpenTvLinks] = useState(false)
  const [openMovieLinks, setOpenMovieLinks] = useState(false)

  const icon = <Icon src={ApiLogo} alt={"the movie data base icon"} />
  const { clearInput } = useContext(AppContext)

  const tvGenreLinks = tvGenres?.map((genre) => {
    return (
      <StyledLink
        key={nanoid()}
        onClick={() => closeLinks(setOpenTvLinks)}
        to={{
          pathname: `/tv/${genre?.name.toLowerCase()}/page=1`,
          state: {
            id: `${genre?.id}`,
            genreName: `${genre?.name.toLowerCase()}`,
            linkName: `/tv/${genre?.name.toLowerCase()}`,
            mediaType: "tv",
          },
        }}
      >
        {genre?.name}
      </StyledLink>
    )
  })

  const movieGenreLinks = movieGenres?.map((genre) => {
    return (
      <StyledLink
        key={nanoid()}
        onClick={() => closeLinks(setOpenMovieLinks)}
        to={{
          pathname: `/movie/${genre?.name.toLowerCase()}/page=1`,
          state: {
            id: `${genre?.id}`,
            genreName: `${genre?.name.toLowerCase()}`,
            linkName: `/movie/${genre?.name.toLowerCase()}`,
            mediaType: "movie",
          },
        }}
      >
        {genre?.name}
      </StyledLink>
    )
  })

  function closeLinks(setLinkType) {
    setLinkType(false)
  }
  function openLinks(setLinkType) {
    setLinkType(false)
  }
  function toggleLinks(setLinkType) {
    setLinkType((prev) => !prev)
  }

  return (
    <>
      <BurgerIcon onClick={toggleMenu}>
        {!openMenu ? (
          <GiHamburgerMenu
            style={{
              color: "white",
            }}
          />
        ) : (
          <AiFillCloseCircle
            style={{
              color: "white",
            }}
          />
        )}
      </BurgerIcon>
      <OpenUL style={{ right: `${openMenu ? "0%" : "100%"}` }}>
        {navRouterLinks}
      </OpenUL>
      <Link to={"/"} onClick={clearInput}>
        {icon}
      </Link>

      <Ul>
        <li>
          <BiCameraMovie
            style={{ cursor: "pointer" }}
            onClick={() => {
              toggleLinks(setOpenMovieLinks)
              closeLinks(setOpenTvLinks)
            }}
          />
        </li>
        <li>
          <MdMonitor
            style={{ cursor: "pointer" }}
            onClick={() => {
              toggleLinks(setOpenTvLinks)
              closeLinks(setOpenMovieLinks)
            }}
          />
        </li>
        {navRouterLinks.slice(2, 4)}
        <LinksContainer style={{ display: `${openTvLinks ? "flex" : "none"}` }}>
          <p style={{ width: "100%", textAlign: "center" }}>TV Shows</p>
          {tvGenreLinks}
        </LinksContainer>
        <LinksContainer
          style={{ display: `${openMovieLinks ? "flex" : "none"}` }}
        >
          <p style={{ width: "100%", textAlign: "center" }}>Movies</p>
          {movieGenreLinks}
        </LinksContainer>
      </Ul>
      <Search
        setOpenMenu={setOpenMenu}
        color={"black"}
        setClickedInside={setClickedInside}
        clickedInside={clickedInside}
      />
    </>
  )
}
