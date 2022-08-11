import React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle } from "react-icons/ai"
import styled from "styled-components"
import Search from "./Search"

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

export default function MobileNav({ toggleMenu, openMenu }) {
  const icon = (
    <Icon src={"../images/tmdbIcon.svg"} alt={"the movie data base icon"} />
  )
  return (
    <>
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
      {!openMenu && icon}
      {openMenu && <Search color={"white"} mobile={true} />}
      <Menu style={{ right: `${openMenu ? "0%" : "100%"}` }}></Menu>
    </>
  )
}
