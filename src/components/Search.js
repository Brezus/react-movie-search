import React, { useRef, useEffect, useContext, useState } from "react"
import styled from "styled-components"
import { AppContext } from "../AppContext"
import { Redirect } from "react-router-dom"

const InputWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 303;
  width: 100px;
  height: ${({ theme }) => theme.inputHeight};
  transition: width 0.2s ease;
  border: 1px solid rgba(240, 241, 245, 0.16);
  padding: 0 0.5em;

  &:focus-within {
    width: 150px;
  }

  @media (min-width: 800px) {
    width: 200px;

    &:focus-within {
      width: 350px;
    }
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

export default function Search({
  color,
  mobile = false,
  setOpenMenu,
  setClickedInside,
  clickedInside,
}) {
  const {
    srchQ,
    debouncedChangeHandler,
    debounced,
    clearInput,
    searched,
    setSearched,
    handleChangeMobile,
    debouncedChangeHandlerMobile,
  } = useContext(AppContext)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!debounced) {
      inputRef.current.value = ""
    }
    if (srchQ) setOpenMenu(false)
  }, [debounced, srchQ])

  const searchIcon = (
    <svg
      onClick={() => {
        setClickedInside(true)
      }}
      style={{ fontSize: "24px", position: "relative", zIndex: "4" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      fill="white"
    >
      <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
    </svg>
  )

  return (
    <>
      {!mobile ? (
        <InputWrapper>
          {srchQ && <Redirect push to={`/${srchQ}/page=1`} />}
          {searchIcon}
          <InputSearch
            onClick={clearInput}
            ref={inputRef}
            color={color}
            type={"text"}
            placeholder={"search movies and tv shows"}
            onChange={debouncedChangeHandler}
          />
        </InputWrapper>
      ) : (
        <InputWrapper>
          {searched && <Redirect push to={`/${srchQ}/page=1`} />}
          {searchIcon}
          <InputSearch
            onChange={debouncedChangeHandlerMobile}
            ref={inputRef}
            type={"text"}
            placeholder={"search movies and tv shows"}
          />
        </InputWrapper>
      )}
    </>
  )
}
