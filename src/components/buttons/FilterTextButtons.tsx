import type { TToDoFilter } from "@/models/to-do-item.model"
import { Button } from "../ui/button"
import useSelected from "@/hooks/useSelected"

type Props = {
  showOnMobile?: boolean
  onFilterChange?: (filter: TToDoFilter) => void
}
const FilterTextButtons = ({ showOnMobile, onFilterChange }: Props) => {
  const { selected, handleSelectedChange } = useSelected<TToDoFilter>("All")

  const handleSelectChange = (filter: TToDoFilter) => {
    handleSelectedChange(filter)
    onFilterChange?.(filter)
  }
  return (
    <div
      className={`items-center justify-between ${showOnMobile ? "flex md:hidden" : "hidden md:flex"}`}
    >
      {["All", "Active", "Completed"].map((label: string, i) => (
        <Button
          key={i}
          variant="link"
          className={`text-sm font-bold ${selected === label ? "text-[#494C6B] underline" : "text-[#9495A5]"}`}
          onClick={() => {
            handleSelectChange(label as TToDoFilter)
          }}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export default FilterTextButtons
