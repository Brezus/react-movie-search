import React from "react"
import styled from "styled-components"

const H3 = styled.h3`
  @media (min-width: 680px) {
    display: none;
  }
  @media (max-width: 680px) {
    display: block;
  }
`

const H36 = styled.h3`
  @media (min-width: 680px) {
    display: initial;
  }
  @media (max-width: 680px) {
    display: none;
  }
`

const CastDiv = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
  @media (max-width: 680px) {
    display: block;
  }
`

const CastDiv6 = styled.div`
  @media (min-width: 680px) {
    display: initial;
  }
  @media (max-width: 680px) {
    display: none;
  }
`
const StyledP = styled.p`
  font-size: .8rem
  text-overflow: wrap;
`

const StyledSpan = styled.span`
  display: block;
  font-weight: bold;
  font-family: "Noto Sans Georgian", sans-serif;
  font-size: 0.9rem;

  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`

export default function TextFlow({
  text,
  horizontalScroll = false,
  cast = null,
}) {
  return (
    <>
      {!cast ? (
        <>
          <H3>
            {text?.length >= 11 && horizontalScroll
              ? text?.slice(0, 11) + "..."
              : text?.length >= 20 && !horizontalScroll
              ? text?.slice(0, 20) + "..."
              : text}
          </H3>
          <H36>
            {text?.length >= 11 && horizontalScroll
              ? text?.slice(0, 11) + "..."
              : text?.length >= 25 && !horizontalScroll
              ? text?.slice(0, 25) + "..."
              : text}
          </H36>
        </>
      ) : (
        <StyledP>
          {text?.name}{" "}
          {text?.character && (
            <>
              as: <StyledSpan>{text?.character}</StyledSpan>
            </>
          )}
        </StyledP>
      )}
    </>
  )
}
