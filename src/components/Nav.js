import React, { useState } from "react"
import styled from "styled-components"
import MobileNav from "./MobileNav"
import DesktopNav from "./DesktopNav"
import useWindowSize from "../hooks/UseWindowSize"

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: 0 auto;
  padding: 1em 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`

export default function Nav() {
  const { width } = useWindowSize()
  const [openMenu, setOpenMenu] = useState(false)
  function closeMenu() {
    setOpenMenu(false)
  }
  function toggleMenu() {
    setOpenMenu((prev) => !prev)
  }
  const navComponent =
    width < 700 ? (
      <MobileNav toggleMenu={toggleMenu} openMenu={openMenu} />
    ) : (
      <DesktopNav />
    )
  return <Navigation>{navComponent}</Navigation>
}
