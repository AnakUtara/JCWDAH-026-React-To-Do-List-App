import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"

type Props = {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const GradientCheckbox = ({ checked, onCheckedChange }: Props) => {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "size-5 rounded-full md:size-7",
        "data-[state=checked]:border-0 data-[state=checked]:bg-linear-to-br data-[state=checked]:from-[#5596FF] data-[state=checked]:to-[#C058F3]",
        "[&_svg]:size-1.5 [&_svg]:stroke-[4.5px] md:[&_svg]:size-4"
      )}
    />
  )
}

export default GradientCheckbox
