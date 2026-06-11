import type IToDoItem from "@/models/to-do-item.model";
import GradientCheckbox from "../fields/GradientCheckbox";
import { Item, ItemActions, ItemTitle } from "../ui/item";
import { useState, type KeyboardEvent } from "react";
import { Input } from "../ui/input";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import { Form, Formik, type FormikHelpers, type FormikState } from "formik";
import toDoSchema from "@/validations/todo.validation";

type Props = {
	item: IToDoItem;
	onUpdate?: (updatedItem: IToDoItem) => Promise<void>;
	onDelete?: (objectId: string) => void;
};
const CheckboxListItem = ({ item, onUpdate, onDelete }: Props) => {
	console.log("CheckboxListItem component re-rendered...");

	const [isDoubleClicked, setIsDoubleClicked] = useState(false);

	const handleDoubleClick = () => {
		setIsDoubleClicked(true);
	};

	return (
		<Formik
			initialValues={{
				objectId: item.objectId,
				title: item.title,
				isDone: item.isDone,
			}}
			enableReinitialize
			validationSchema={toDoSchema}
			onSubmit={async (values, formikHelpers: FormikHelpers<IToDoItem>) => {
				try {
					// 1. Await the server PUT network request and list re-fetch from App.tsx
					await onUpdate?.({
						objectId: item.objectId,
						title: values.title,
						isDone: values.isDone,
					});

					// 2. Close edit mode only after a successful server round-trip
					setIsDoubleClicked(false);
				} catch (err) {
					console.error("Failed to update todo:", err);
				} finally {
					formikHelpers.setSubmitting(false);
				}
			}}
		>
			{({
				values,
				handleChange,
				handleBlur,
				setFieldValue,
				submitForm,
				resetForm,
				initialValues,
			}) => (
				<Form>
					<Item className="group rounded-none border-b-gray-200 py-3 last:border-0 md:py-5 dark:border-b-neutral-700">
						<ItemActions>
							<GradientCheckbox
								checked={values.isDone}
								onCheckedChange={(checked) => {
									// Update formik state and trigger submission instantly on click
									setFieldValue("isDone", checked);
									submitForm();
								}}
							/>
						</ItemActions>
						{isDoubleClicked ? (
							<ItemActions className="flex-1 pr-4">
								<Input
									autoFocus
									readOnly={values.isDone}
									id="title"
									name="title"
									className="text-xs font-normal md:text-lg"
									value={values.title}
									onChange={handleChange}
									onBlur={async (e) => {
										handleBlur(e);
										resetForm(initialValues as Partial<FormikState<IToDoItem>>);
										setIsDoubleClicked(false);
									}}
									onKeyDown={async (e: KeyboardEvent<HTMLInputElement>) => {
										if (isDoubleClicked) {
											if (e.key === "Escape") {
												setIsDoubleClicked(false);
											}

											if (e.key === "Enter") {
												e.preventDefault();
												await submitForm();
											}
										}
									}}
								/>
							</ItemActions>
						) : (
							<ItemTitle
								className={`flex-1 pt-1 text-xs font-normal md:text-lg ${values.isDone ? "text-gray-500 line-through" : ""}`}
								onDoubleClick={handleDoubleClick}
							>
								{values.title}
							</ItemTitle>
						)}
						<ItemActions className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<ConfirmationDialog onConfirm={() => onDelete?.(item.objectId)} />
						</ItemActions>
					</Item>
				</Form>
			)}
		</Formik>
	);
};
export default CheckboxListItem;
