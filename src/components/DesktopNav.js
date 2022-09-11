import React, { useContext } from "react"
import { AppContext } from "../AppContext"
import Search from "./Search"
import styled from "styled-components"
import { Link } from "react-router-dom"
import ApiLogo from "../assets/tmdbIcon.svg"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle } from "react-icons/ai"
import Genres from "./Genres"

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

export default function DesktopNav({
  navRouterLinks,
  openMenu,
  setOpenMenu,
  toggleMenu,
  setClickedInside,
  clickedInside,
}) {
  const icon = <Icon src={ApiLogo} alt={"the movie data base icon"} />
  const { clearInput } = useContext(AppContext)

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
      {/* <Ul>{navRouterLinks}</Ul> */}
      <Ul>
        <li>Browse</li>
        {navRouterLinks.slice(2, 4)}
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
