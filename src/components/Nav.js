import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import NavChild from "./NavChild"
import useWindowSize from "../hooks/UseWindowSize"
import useScrollDirection from "../hooks/useScrollDirection"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"
import { AppContext } from "../AppContext"

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  transition: height 0.3s ease-in;
  position: relative;
  overflow: hidden;
  height: ${({ dir }) => (dir ? "0" : "60px")};

  &:hover {
    overflow: initial;
  }
`
const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transition: background 0.3s ease;
  // overflow: hidden;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

export default function Nav({
  navLinksArray,
  setOpenMenu,
  openMenu,
  setClickedInside,
  clickedInside,
  tvGenres,
  movieGenres,
}) {
  const [navBg, setNavBg] = useState(false)
  const { width } = useWindowSize()
  const scrollDirection = useScrollDirection()
  const { clearInput } = useContext(AppContext)

  const navRouterLinks = navLinksArray.map((link) => {
    return (
      <li key={nanoid()}>
        <StyledLink
          onClick={() => {
            clearInput()
            setOpenMenu(false)
          }}
          to={`${link.linkName}/page=1`}
        >
          {link.linkNameHtml}
        </StyledLink>
      </li>
    )
  })

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY < 230) {
        setNavBg(false)
      } else {
        setNavBg(true)
      }
    }
    function handleResize() {
      if (window.innerWidth > 700) {
        setClickedInside(true)
      }
      if (window.innerWidth > 800) {
        setOpenMenu(false)
        setClickedInside(true)
      } else if (window.innerWidth < 800) {
        setClickedInside(false)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  function toggleMenu() {
    setOpenMenu((prev) => !prev)
  }
  const navComponent = (
    <NavChild
      navRouterLinks={navRouterLinks}
      tvGenres={tvGenres}
      movieGenres={movieGenres}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
      toggleMenu={toggleMenu}
      setClickedInside={setClickedInside}
      clickedInside={clickedInside}
    />
  )
  return (
    <NavWrapper
      style={{
        background: `${navBg ? "rgb(8 12 20)" : "none"}`,
        height: `${scrollDirection === "down" ? "0" : "60px"}`,
      }}
    >
      <Navigation dir={scrollDirection === "down" ? true : false}>
        {navComponent}
      </Navigation>
    </NavWrapper>
  )
}
