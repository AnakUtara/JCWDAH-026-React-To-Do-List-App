import { useCallback, useEffect, useMemo, useState } from "react";
import ListCard from "./components/cards/ListCard";
import Header from "./components/header/Header";
import type { TToDoFilter, TTodoList } from "./models/to-do-item.model";
import type IToDoItem from "./models/to-do-item.model";
import HCenteredContainer from "./components/container/HCenteredContainer";
import FilterTextButtons from "./components/buttons/FilterTextButtons";
import { Card } from "./components/ui/card";
import backendlessApi from "./configs/axios.config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "./context/AuthContext";
import useFetch from "./hooks/useFetch";

export function App() {
	const { user } = useAuth();

	const {
		data: todoList,
		isLoading,
		error,
		setError,
		refetch: getToDoListData,
	} = useFetch<TTodoList>(
		"/ToDos",
		{
			params: {
				where: `ownerId='${user?.objectId}'`,
				sortBy: "created desc",
			},
		},
		backendlessApi,
	);

	const [currentFilter, setCurrentFilter] = useState<TToDoFilter>("All");

	const filteredTodoList = useMemo(() => {
		console.log("Memo Filtering todoList...");
		return todoList?.filter((item) => {
			console.log("Filtering todoList...");
			if (currentFilter === "Active") {
				return !item.isDone;
			} else if (currentFilter === "Completed") {
				return item.isDone;
			}
			return true;
		});
	}, [todoList, currentFilter]);

	const incompleteTasksCount = useMemo(() => {
		console.log("Calculating incomplete tasks...");
		return todoList?.filter((item) => !item.isDone).length ?? 0;
	}, [todoList]);

	const handleAddItem = useCallback(
		async (title: string, isDone: boolean) => {
			try {
				await backendlessApi.post("/ToDos", {
					title,
					isDone,
					ownerId: user?.objectId,
				});

				toast.success("Todo item added successfully!");

				await getToDoListData();
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error);
				}
				setError(error as Error);
				toast.error("Failed to add todo item. Please try again.");
			}
		},
		[user, getToDoListData, setError],
	);

	const handleFilterChange = useCallback((filter: TToDoFilter) => {
		setCurrentFilter(filter);
	}, []);

	const handleUpdateItem = useCallback(
		async (updatedItem: IToDoItem) => {
			console.log("Updating item:", updatedItem);
			try {
				await backendlessApi.put(`/ToDos/${updatedItem.objectId}`, {
					title: updatedItem.title,
					isDone: updatedItem.isDone,
				});
				await getToDoListData();
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error);
				}
				setError(error as Error);
				toast.error("Failed to update todo item. Please try again.");
			}
		},
		[getToDoListData, setError],
	);

	const handleDeleteItem = useCallback(
		async (objectId: string) => {
			try {
				await backendlessApi.delete(`/ToDos/${objectId}`);
				toast.success("Todo item deleted successfully!");
				await getToDoListData();
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error);
				}
				setError(error as Error);
				toast.error("Failed to delete todo item. Please try again.");
			}
		},
		[getToDoListData, setError],
	);

	useEffect(() => {
		document.title = `T O D O L I S T | ${incompleteTasksCount} items left to be done.`;
	}, [incompleteTasksCount]);

	return (
		<main>
			<Header onCreate={handleAddItem} />
			<HCenteredContainer zIndex={50} className="-top-8 md:-top-12">
				<ListCard
					data={filteredTodoList || []}
					taskCount={incompleteTasksCount}
					isLoading={isLoading}
					error={error}
					onFilterChange={handleFilterChange}
					onUpdateItem={handleUpdateItem}
					onDeleteItem={handleDeleteItem}
				/>
				<Card className="mt-4 flex items-center justify-center py-1 md:hidden">
					<FilterTextButtons showOnMobile onFilterChange={handleFilterChange} />
				</Card>
			</HCenteredContainer>
		</main>
	);
}

export default App;
