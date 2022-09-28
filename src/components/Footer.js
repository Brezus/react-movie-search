import React from "react"
import styled from "styled-components"
import Attrib from "../assets/poweredBy_light_logo_square.png"

const StyledFooter = styled.footer`
  width: 100%;
  border-top: 1px solid orange;
  background: ${({ theme }) => theme.footerColor};
  font-family: ${({ theme }) => theme.ffm};
  font-weight: 900;
  padding: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;

  @media (min-width: 700px) {
    flex-direction: column;
  }
`

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
`

const StyledHtmlLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.darkYellow};
`

export default function Footer() {
  return (
    <StyledFooter>
      <p>
        Created by{" "}
        <StyledHtmlLink
          href={"https://github.com/Brezus"}
          target="_blank"
          rel="noreferrer"
        >
          Roshane Miller
        </StyledHtmlLink>{" "}
      </p>
      <a
        href={
          "https://developers.themoviedb.org/3/getting-started/introduction"
        }
        target="_blank"
        rel="noreferrer"
      >
        <StyledImg src={Attrib} alt={"Tmdb api logo"} />
      </a>
    </StyledFooter>
  )
}
