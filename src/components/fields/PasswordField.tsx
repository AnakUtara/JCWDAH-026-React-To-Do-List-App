import { useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessage, useField } from "formik";

type Props = {
	id?: string;
	label?: string;
	disabled?: boolean;
};

const PasswordField = ({
	id = "password",
	label = "Password",
	disabled = false,
}: Props) => {
	const [visibility, setVisibility] = useState(false);
	const [{ value, onChange }, { error, touched }] = useField(id);
	return (
		<Field>
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			<InputGroup
				className={
					error && touched
						? "border-destructive has-[[data-slot=input-group-control]:focus-visible]:border-destructive has-[[data-slot=input-group-control]:focus-visible]:ring-destructive"
						: ""
				}
			>
				<InputGroupInput
					id={id}
					name={id}
					type={visibility ? "text" : "password"}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
				<InputGroupAddon align="inline-end">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => setVisibility(!visibility)}
						disabled={disabled}
					>
						{visibility ? <Eye /> : <EyeOff />}
					</Button>
				</InputGroupAddon>
			</InputGroup>
			<FieldDescription>Must be at least 8 characters long.</FieldDescription>
			<ErrorMessage className="text-destructive" component="div" name={id} />
		</Field>
	);
};

export default PasswordField;
