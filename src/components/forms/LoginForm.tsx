import { cn } from "@/lib/utils";
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
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useState, type SubmitEvent } from "react";
import type { IUser } from "@/models/user.model";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { signIn } = useAuth();

	const [newUser, setNewUser] = useState<IUser | null>(null);

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Ini hanya akan di-trigger dari submit button, jadi newUser pasti sudah terisi
		// sebelum signIn dipanggil
		// untuk bypass kesulitan FormData, kita menggunakan local state untuk menyimpan email dan password yang diinput user
		signIn(newUser?.email as string, newUser?.password as string);
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
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									value={newUser?.email || ""}
									placeholder="m@example.com"
									onChange={(e) =>
										setNewUser(
											(prev) => ({ ...prev, email: e.target.value }) as IUser,
										)
									}
									required
								/>
							</Field>
							<Field>
								<Input
									id="password"
									type="password"
									value={newUser?.password || ""}
									onChange={(e) =>
										setNewUser(
											(prev) =>
												({ ...prev, password: e.target.value }) as IUser,
										)
									}
									required
								/>
							</Field>
							<Field>
								<Button type="submit">Login</Button>
								<FieldDescription className="text-center">
									Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
