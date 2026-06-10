import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { Form, Formik, type FormikHelpers } from "formik";
import type { IUser } from "@/models/user.model";
import PasswordField from "../fields/PasswordField";
import { signUpSchema } from "@/validations/auth.validation";
import EmailField from "../fields/EmailField";
import FormSubmitButton from "../buttons/FormSubmitButton";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const { signUp } = useAuth();

	const handleSubmit = (values: IUser, helpers: FormikHelpers<IUser>) => {
		signUp(
			values.email,
			values.password,
			() => helpers.resetForm(),
			() => {
				helpers.setSubmitting(false);
				helpers.resetForm();
			},
		);
	};

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Formik
					initialValues={{
						email: "",
						password: "",
						confirmPassword: "",
					}}
					validationSchema={signUpSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<FieldGroup>
								<EmailField disabled={isSubmitting} />
								<PasswordField disabled={isSubmitting} />
								<PasswordField
									id="confirmPassword"
									label="Confirm Password"
									disabled={isSubmitting}
								/>
								<FieldGroup>
									<Field>
										<FormSubmitButton
											isSubmitting={isSubmitting}
											label="Create Account"
											submitLabel="Creating..."
										/>
										<FieldDescription className="px-6 text-center">
											Already have an account?{" "}
											<Link to="/sign-in">Sign in</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</FieldGroup>
						</Form>
					)}
				</Formik>
			</CardContent>
		</Card>
	);
}
