import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import MobileNav from "./MobileNav"
import DesktopNav from "./DesktopNav"
import useWindowSize from "../hooks/UseWindowSize"
import useScrollDirection from "../hooks/useScrollDirection"
import { AppContext } from "../AppContext"

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  transition: height 0.3s ease-in;
  overflow: hidden;
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
`

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false)
  const [navBg, setNavBg] = useState(false)
  const { width } = useWindowSize()
  const { fetchCategory } = useContext(AppContext)
  const scrollDirection = useScrollDirection()

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY < 200) {
        console.log("Not past 100px")
        setNavBg(false)
      } else {
        console.log("Past 100px!")
        setNavBg(true)
      }
    }
    function handleResize() {
      if (window.innerWidth > 700) {
        setOpenMenu(false)
      } else if (window.innerWidth < 700) {
        setOpenMenu(true)
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
  const navComponent =
    width < 700 ? (
      <MobileNav
        handleClick={fetchCategory}
        toggleMenu={toggleMenu}
        openMenu={openMenu}
      />
    ) : (
      <DesktopNav handleClick={fetchCategory} />
    )
  // const navVar = width < 700 ? <NavVariant mobile={true} toggleMenu={toggleMenu} openMenu={openMenu} /> : <NavVariant mobile={false} />
  return (
    <NavWrapper
      style={{
        background: `${navBg ? "black" : "none"}`,
        height: `${scrollDirection === "down" ? "0" : "60px"}`,
      }}
    >
      <Navigation
        style={{ height: `${scrollDirection === "down" ? "0" : "60px"}` }}
      >
        {navComponent}
      </Navigation>
    </NavWrapper>
  )
}
