import React from "react"
import Search from "./Search"
import styled from "styled-components"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle } from "react-icons/ai"

export default function NavVariant({ mobile, toggleMenu, openMenu }) {
  const icon = (
    <IconLogo src={"../images/tmdbIcon.svg"} alt={"the movie data base icon"} />
  )
  return (
    <>
      <a href="/">{icon}</a>
      {mobile && (
        <Ul>
          <li>
            <a href="#">Movies</a>
          </li>
          <li>
            <a href="#">Tv Shows</a>
          </li>
        </Ul>
      )}
      <Search color={"black"} />

      {mobile && (
        <BurgerIcon onClick={toggleMenu}>
          {openMenu ? (
            <AiFillCloseCircle
              style={{
                color: "white",
              }}
            />
          ) : (
            <GiHamburgerMenu
              style={{
                color: "white",
              }}
            />
          )}
        </BurgerIcon>
      )}
      {/* {!openMenu && icon} */}
      {openMenu && <Search color={"white"} mobile={true} />}
      <Menu style={{ right: `${openMenu ? "0%" : "100%"}` }}></Menu>
    </>
  )
}

const IconLogo = styled.img`
  height: 30%;
  width: 30px;
`
const Ul = styled.ul`
  display: flex;
  gap: 1em;
  list-style: none;
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
`
const Icon = styled.img`
  height: ${({ theme }) => theme.inputHeight};
  width: ${({ theme }) => theme.inputHeight};
  z-index: 301;
`

const Menu = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  transition: right 0.5s ease;
  background-color: #1c1f29;
  padding: 0 1em;
  z-index: 300;
`
