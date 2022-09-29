import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import ErrorImg from "../assets/batmanrobin1.jpg"

const StyledH1 = styled.h1`
  font-size: 15rem;
  color: whitesmoke;
`

const StyledP = styled.p`
  font-size: 6rem;
`

const StyledDivCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  padding: 2em 0;
  font-family: ${({ theme }) => theme.ffs};
`

const StyledLink = styled(Link)`
  color: whitesmoke;
  text-decoration: none;
`

const StyledDiv = styled.div`
  height: 500px;
  width: 90vw;
  max-width: 600px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  background-image: url(${({ bg }) => bg});
  margin-top: 6em;
  position: relative;
  color: black;
`

const P1 = styled.p`
  position: absolute;
  left: 16%;
  top: 7%;
  text-align: center;
`

const P2 = styled(P1)`
  left: 55%;
`

export default function ErrorPage404() {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <StyledDivCont>
      <StyledDiv bg={ErrorImg}>
        <P1>But can i ..</P1>
        <P2>
          The path
          <span style={{ display: "block", fontWeight: "bold" }}>
            {pathname}
          </span>{" "}
          doesnt exist
        </P2>
      </StyledDiv>
      <StyledLink to={"/"}>Back to Home</StyledLink>
    </StyledDivCont>
  )
}
