import { useState } from "react"

const useSelected = <T>(initialValue: T) => {
  const [selected, setSelected] = useState<T>(initialValue)

  const handleSelectedChange = (value: T) => {
    setSelected(value)
  }

  return { selected, handleSelectedChange }
}

export default useSelected
