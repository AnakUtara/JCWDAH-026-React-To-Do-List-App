import { Wind } from "lucide-react"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"

const EmptyList = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Wind />
        </EmptyMedia>
        <EmptyTitle>No Tasks Made Yet...</EmptyTitle>
        <EmptyDescription>
          Add tasks to your to-do list to get started.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
export default EmptyList
