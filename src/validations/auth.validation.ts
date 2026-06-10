import Yup from "@/lib/yup";

const commonSchema = {
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
};

const signInSchema = Yup.object().shape(commonSchema);

const signUpSchema = Yup.object().shape({
	...commonSchema,
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Confirm Password is required"),
});

export { signInSchema, signUpSchema };
