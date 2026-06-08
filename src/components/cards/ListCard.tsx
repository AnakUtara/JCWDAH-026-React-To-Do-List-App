import { Card, CardContent, CardFooter } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import CheckboxListItem from "../items/CheckboxListItem"
import { Button } from "../ui/button"
import type { TToDoFilter, TTodoList } from "@/models/to-do-item.model"
import { memo, type MouseEvent } from "react"
import type IToDoItem from "@/models/to-do-item.model"
import FilterTextButtons from "../buttons/FilterTextButtons"
import EmptyList from "../empty/EmptyList"

type Props = {
  data: TTodoList
  taskCount?: number
  onFilterChange?: (filter: TToDoFilter) => void
  onClearCompleted?: (e: MouseEvent<HTMLButtonElement>) => void
  onUpdateItem?: (updatedItem: IToDoItem) => void
  onDeleteItem?: (id: number) => void
}

const ListCard = ({
  data,
  taskCount,
  onFilterChange,
  onClearCompleted,
  onUpdateItem,
  onDeleteItem,
}: Props) => {
  console.log("ListCard component re-rendered...")
  return (
    <Card className="gap-0 p-0">
      <CardContent className="p-0">
        <ScrollArea className="h-64 md:h-80">
          {data.length > 0 ? (
            data.map((item) => (
              <CheckboxListItem
                key={item.id}
                item={item}
                onUpdate={onUpdateItem}
                onDelete={onDeleteItem}
              />
            ))
          ) : (
            <EmptyList />
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center justify-between border border-x-0 border-b-0 border-t-gray-200 px-4 py-1 md:px-5 md:py-2 dark:border-t-neutral-700">
        <p className="text-xs text-[#9495A5] md:text-sm">
          {taskCount ?? data.length} items left
        </p>
        <FilterTextButtons onFilterChange={onFilterChange} />
        <Button
          variant="link"
          className="p-0 text-xs font-normal text-[#9495A5] md:text-sm"
          onClick={onClearCompleted}
        >
          Clear Completed
        </Button>
      </CardFooter>
    </Card>
  )
}
export default memo(ListCard)
