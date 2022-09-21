import { useEffect, useState } from "react"

export default function useTextFlow(word) {
  const [width, setWidth] = useState(window.innerWidth)
  const [txt, setTxt] = useState(word)

  function handleResize() {
    setWidth(window.innerWidth)
    if (word.length >= 20) {
      if (window.innerWidth >= 700) {
        setTxt(word)
      } else if (window.innerWidth >= 500) {
        setTxt(word.slice(0, 16) + "...")
      } else if (window.innerWidth >= 375) {
        setTxt(word.slice(0, 12) + "...")
      }
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return [txt, width]
}
