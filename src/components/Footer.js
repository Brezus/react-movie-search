import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  width: 100%;
  border-top: 1px solid orange;
  background: ${({ theme }) => theme.footerColor};
  font-family: ${({ theme }) => theme.ffm};
  font-weight: 900;
  padding: 6em;
  display: flex;
  justify-content: center;
  p {
    color: ;
  }
`

export default function Footer() {
  return (
    <StyledFooter>
      Created by Roshane Miller made possible with Themoviedb
    </StyledFooter>
  )
}
