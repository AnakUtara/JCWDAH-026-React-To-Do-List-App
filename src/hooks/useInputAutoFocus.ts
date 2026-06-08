import { useEffect, useRef } from "react"

const useInputAutoFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return inputRef
}

export default useInputAutoFocus
