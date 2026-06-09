import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { IUser } from "@/models/user.model";
import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const { signUp } = useAuth();

	const [newUser, setNewUser] = useState<IUser>({
		email: "",
		password: "",
	});

	const [visibility, setVisibility] = useState(false);

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		signUp(newUser.email, newUser.password);
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
				<form onSubmit={handleSubmit}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
								value={newUser.email}
								onChange={(e) => {
									setNewUser({ ...newUser, email: e.target.value });
								}}
							/>
							<FieldDescription>
								We&apos;ll use this to contact you. We will not share your email
								with anyone else.
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<InputGroup>
								<InputGroupInput
									id="password"
									name="password"
									type={visibility ? "text" : "password"}
									value={newUser.password}
									onChange={(e) => {
										setNewUser({ ...newUser, password: e.target.value });
									}}
									required
								/>
								<InputGroupAddon align="inline-end">
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => setVisibility(!visibility)}
									>
										{visibility ? <Eye /> : <EyeOff />}
									</Button>
								</InputGroupAddon>
							</InputGroup>
							<FieldDescription>
								Must be at least 8 characters long.
							</FieldDescription>
						</Field>
						{/* <Field>
							<FieldLabel htmlFor="confirm-password">
								Confirm Password
							</FieldLabel>
							<Input id="confirm-password" type="password" required />
							<FieldDescription>Please confirm your password.</FieldDescription>
						</Field> */}
						<FieldGroup>
							<Field>
								<Button type="submit">Create Account</Button>
								<FieldDescription className="px-6 text-center">
									Already have an account? <Link to="/sign-in">Sign in</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
