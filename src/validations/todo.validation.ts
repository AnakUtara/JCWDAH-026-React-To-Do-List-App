import Yup from "@/lib/yup";

const toDoSchema = Yup.object().shape({
	title: Yup.string()
		.trim()
		.min(1, "Title must be at least 1 character")
		.max(255, "Title must be at most 255 characters")
		.required("Title is required"),
	isDone: Yup.boolean().required("Status is required"),
});

export default toDoSchema;
