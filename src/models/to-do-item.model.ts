export default interface IToDoItem {
	objectId: string;
	title: string;
	isDone: boolean;
	ownerId?: string;
}

export type TTodoList = IToDoItem[];

export type TToDoFilter = "All" | "Active" | "Completed";
