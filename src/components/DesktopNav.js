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
  width: max-content;
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
  margin-bottom: ${(props) => (props.mobile === "true" ? "1em" : "initial")};
  text-align: ${(props) => (props.mobile === "true" ? "initial" : "center")};
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
  cursor: pointer;

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

const MobileUL = styled.ul`
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    transition: right 0.5s ease;
    right: ${(props) => props.right};
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 100vh;
    background-color: #1c1f29;
    padding: 6em 4em 3em;
    margin: 0;
    gap: 3em;
    z-index: 300;
    @media (min-width: 800px) {
      display: none;
    }
  }
`
const MobileLinkCont = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  width: max-content;
  color: ${(props) => props.color};
  margin-bottom: 0.5em;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    font-weight: bold;
  }
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
  const [movHover, setMovHover] = useState(false)
  const [tvHover, setTvHover] = useState(false)
  const [tvLinkClicked, setTvLinkClicked] = useState(false)
  const [movLinkClicked, setMovLinkClicked] = useState(false)
  const icon = <Icon src={ApiLogo} alt={"tv data base icon"} />
  const { clearInput } = useContext(AppContext)

  const onMouseEnter = (setFunc, setFuncClick) => {
    setFunc(true)
    setFuncClick(false)
  }
  const onMouseLeave = (setFunc, setFuncClick) => {
    setFunc(false)
    setFuncClick(false)
  }
  const closeDesktopMenu = (setFunc, setFuncClick) => {
    setFunc(false)
    setFuncClick(true)
  }

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

  const tvGenreLinks = tvGenres?.map((genre, i) => {
    return (
      <StyledLink
        onClick={() => {
          closeDesktopMenu(setTvHover, setTvLinkClicked)
          setOpenMenu(false)
        }}
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
        onClick={() => {
          closeDesktopMenu(setMovHover, setMovLinkClicked)
          setOpenMenu(false)
        }}
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

  return (
    <>
      <BurgerIcon onClick={toggleMenu}>{bgIcon}</BurgerIcon>
      <Link to={"/"} onClick={clearInput}>
        {icon}
      </Link>
      <MobileUL right={openMenu ? "0%" : "100%"}>
        <MobileLinkCont>
          <StyledP mobile={"true"}>movie</StyledP> {movieGenreLinks}
        </MobileLinkCont>
        <MobileLinkCont>
          <StyledP mobile={"true"}>tv</StyledP>
          {tvGenreLinks}
        </MobileLinkCont>
      </MobileUL>
      <Ul>
        <Div
          onMouseEnter={() => onMouseEnter(setMovHover, setMovLinkClicked)}
          onMouseLeave={() => onMouseLeave(setMovHover, setMovLinkClicked)}
        >
          <span>Movies</span>
          <LinksContainer
            style={{ display: `${movLinkClicked ? "none" : "block"}` }}
          >
            <LinksCont color={"black"}>
              <StyledP>movie</StyledP>
              {movieGenreLinks}
            </LinksCont>
          </LinksContainer>
        </Div>
        <Div
          onMouseEnter={() => onMouseEnter(setTvHover, setTvLinkClicked)}
          onMouseLeave={() => onMouseLeave(setTvHover, setTvLinkClicked)}
        >
          <span>Tv</span>
          <LinksContainer
            style={{ display: `${tvLinkClicked ? "none" : "block"}` }}
          >
            <LinksCont color={"black"}>
              <StyledP>tv</StyledP>
              {tvGenreLinks}
            </LinksCont>
          </LinksContainer>
        </Div>
        <DarkCover
          style={{
            opacity: `${movHover || tvHover ? "1" : "0"}`,
            display: `${movHover || tvHover ? "block" : "none"}`,
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
