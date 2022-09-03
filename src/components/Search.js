import React, { useState, useRef, useEffect, useContext } from "react"
import styled from "styled-components"
import { AppContext } from "../AppContext"
import { Redirect } from "react-router-dom"
import { useParams } from "react-router-dom"

const InputWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 303;
  width: 300px;
  height: ${({ theme }) => theme.inputHeight};
  transition: width 0.2s ease;
  border: 1px solid rgba(240, 241, 245, 0.16);
  padding: 0 0.5em;

  @media (max-width: 700px) {
    width: 40px;
  }

  &:focus-within {
    width: ${(p) => (p.mobile ? "300px" : "400px")};
  }
`
const InputSearch = styled.input`
  width: 100%;
  display: block;
  padding: 0em 0em 0em 2.5em;
  color: white;
  background-color: transparent;
  border: none;
  &::placeholder {
    color: ${({ theme }) => theme.white};
  }
  &:focus {
    border: none;
    outline: none;
  }
  @media (max-width: 700px) {
    padding: 0em 0em 0em 1.5em;
    &::placeholder {
      opacity: 0;
    }
  }
`

export default function Search({ color, mobile }) {
  const [clickedInside, setClickedInside] = useState(false)
  const { srchQ, debouncedChangeHandler } = useContext(AppContext)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClickedInside(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)
  const searchIcon = (
    <svg
      style={{ fontSize: "24px" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      fill="white"
    >
      <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
    </svg>
  )

  function getInputType(mobileProp) {
    let inputType = ""
    if (mobileProp) {
      inputType = clickedInside && (
        <InputSearch
          autoFocus={true}
          color={color}
          type={"text"}
          placeholder={"search movies and tv shows"}
          onChange={debouncedChangeHandler}
        />
      )
    } else {
      inputType = (
        <InputSearch
          color={color}
          type={"text"}
          placeholder={"search movies and tv shows"}
          onChange={debouncedChangeHandler}
        />
      )
    }
    return inputType
  }

  return (
    <>
      <InputWrapper
        mobile={mobile}
        ref={wrapperRef}
        onClick={() => {
          setClickedInside(true)
        }}
      >
        {srchQ ? (
          <Redirect push to={`/${srchQ}/page=1`} />
        ) : (
          <Redirect push to={"/"} />
        )}
        {searchIcon}
        {getInputType(mobile)}
      </InputWrapper>
    </>
  )
}
