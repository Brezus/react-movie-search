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
  width: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledSpan = styled.span`
  display: block;
  font-weight: bold;
  font-family: "Noto Sans Georgian", sans-serif;
  font-size: 1.2rem;
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
        <StyledP title={`${text?.name} as ${text?.character}`}>
          {text?.name.length >= 10 ? text?.name.slice(0, 10) : text?.name}{" "}
          {text?.character && (
            <>
              as:{" "}
              <StyledSpan>
                {text?.character.length >= 9
                  ? text?.character.slice(0, 9) + "."
                  : text?.character}
              </StyledSpan>
            </>
          )}
        </StyledP>
      )}
    </>
  )
}
