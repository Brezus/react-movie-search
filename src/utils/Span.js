import React from "react"
import styled from "styled-components"

const StyledSpan = styled.span`
  display: block;
  color: ${({ theme }) => theme.darkYellow};
  font-size: ${({ theme }) => theme.fontSize};
`

export default function Span({ children }) {
  return <StyledSpan>{children}</StyledSpan>
}
