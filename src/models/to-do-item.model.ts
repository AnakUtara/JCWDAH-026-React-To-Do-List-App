export default interface IToDoItem {
  id: number
  title: string
  isDone: boolean
}

export type TTodoList = IToDoItem[]

export type TToDoFilter = "All" | "Active" | "Completed"
