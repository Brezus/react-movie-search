import React from "react"
import styled from "styled-components"

const H3 = styled.h3`
  width: 100px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 600px) {
    width: 150px;
  }
  @media (min-width: 1000px) {
    width: 170px;
    font-size: 1.1rem;
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
  font-size: 0.8rem;
  text-overflow: wrap;

  @media (min-width: 800px) {
    font-size: 1rem;
  }
`

const StyledSpan = styled.span`
  display: block;
  font-weight: bold;
  font-family: "Noto Sans Georgian", sans-serif;

  @media (min-width: 500px) {
    font-size: 1rem;
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
          <H3>{text}</H3>
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
