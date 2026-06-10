import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { useAuth } from "@/context/AuthContext";
import type { IUser } from "@/models/user.model";
import { Form, Formik, type FormikHelpers } from "formik";
import { signInSchema } from "@/validations/auth.validation";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";
import { Link } from "react-router";
import FormSubmitButton from "../buttons/FormSubmitButton";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { signIn } = useAuth();

	const handleSubmit = (
		values: Omit<IUser, "confirmPassword">,
		helpers: FormikHelpers<Omit<IUser, "confirmPassword">>,
	) => {
		signIn(
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
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						validationSchema={signInSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form>
								<FieldGroup>
									<EmailField disabled={isSubmitting} />
									<PasswordField disabled={isSubmitting} />
									<Field>
										<FormSubmitButton
											isSubmitting={isSubmitting}
											label="Login"
											submitLabel="Logging in..."
										/>
										<FieldDescription className="text-center">
											Don&apos;t have an account?{" "}
											<Link to="/sign-up">Sign up</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
}
