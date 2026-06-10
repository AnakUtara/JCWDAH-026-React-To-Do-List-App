import { ErrorMessage, useField } from "formik";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
	label?: string;
	disabled?: boolean;
};
const EmailField = ({ label = "email", disabled = false }: Props) => {
	const [{ value, onChange }, { error, touched }] = useField("email");
	return (
		<Field>
			<FieldLabel htmlFor="email">{label}</FieldLabel>
			<Input
				id="email"
				name="email"
				placeholder="m@example.com"
				value={value}
				onChange={onChange}
				className={
					error && touched
						? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
						: ""
				}
				disabled={disabled}
			/>
			<FieldDescription>
				We&apos;ll use this to contact you. We will not share your email with
				anyone else.
			</FieldDescription>
			<ErrorMessage className="text-destructive" component="div" name="email" />
		</Field>
	);
};
export default EmailField;
