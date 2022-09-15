import React, { useContext, useRef, useState } from "react"
import { AppContext } from "../AppContext"
import Search from "./Search"
import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"
import ApiLogo from "../assets/tmdbIcon.svg"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle } from "react-icons/ai"
import { MdMonitor } from "react-icons/md"
import { BiCameraMovie } from "react-icons/bi"
import { nanoid } from "nanoid"
import useClickOutside from "../hooks/useHover"
import useHover from "../hooks/useHover"

const opaictyAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const LinksContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 100%;
  align-items: start;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: ${({ theme }) => theme.darkBg};
  z-index: 2;
`

const LinksCont = styled.div`
  background-color: ${(props) => props.color};
  width: 400px;
  gap: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 2em;
`
const StyledP = styled.p`
  font-size: 1.2rem;
  font-family: "Noto Sans Georgian", sans-serif;
  font-weight: 900;
  grid-column: 1/-1;
`

const DarkCover = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(22, 23, 22, 0.7);
  z-index: 4;
  overflow: hidden;
  animation: ${opaictyAnimation} 0.6s linear forwards;
`

const Div = styled.div`
  position: relative;
  cursor: pointer;
  z-index: 5;

  &:hover ${LinksContainer} {
    max-height: 400px;
    border: 2px solid white;
  }
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
  color: ${(props) => props.color};
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
  const [movHoverRef, isMovHoverd] = useHover()
  const [tvHoverRef, isTvHoverd, handleClick] = useHover()

  const icon = <Icon src={ApiLogo} alt={"tv data base icon"} />
  const { clearInput } = useContext(AppContext)

  const tvGenreLinks = tvGenres?.map((genre) => {
    return (
      <StyledLink
        onClick={handleClick}
        color={"white"}
        key={nanoid()}
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
        color={"white"}
        key={nanoid()}
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
  const bgIcon = !openMenu ? (
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
  )

  return (
    <>
      <BurgerIcon onClick={toggleMenu}>{bgIcon}</BurgerIcon>
      <Link to={"/"} onClick={clearInput}>
        {icon}
      </Link>
      <Ul>
        <Div ref={movHoverRef}>
          <span>Movies</span>
          <LinksContainer>
            <LinksCont color={"black"}>
              <StyledP>movie</StyledP>
              {movieGenreLinks}
            </LinksCont>
          </LinksContainer>
        </Div>
        <Div ref={tvHoverRef}>
          <span>Tv</span>
          <LinksContainer>
            <LinksCont color={"black"}>
              <StyledP>tv</StyledP>
              {tvGenreLinks}
            </LinksCont>
          </LinksContainer>
        </Div>
        <DarkCover
          style={{
            opacity: `${isTvHoverd || isMovHoverd ? "1" : "0"}`,
            display: `${isTvHoverd || isMovHoverd ? "block" : "none"}`,
          }}
        />
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
