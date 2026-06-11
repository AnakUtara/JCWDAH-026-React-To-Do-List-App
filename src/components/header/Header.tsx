import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import GradientCheckbox from "../fields/GradientCheckbox";
import HCenteredContainer from "../container/HCenteredContainer";
import useInputAutoFocus from "@/hooks/useInputAutoFocus";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Form, Formik } from "formik";
import toDoSchema from "@/validations/todo.validation";
import { cn } from "@/lib/utils";

type Props = {
	onCreate: (title: string, done: boolean) => Promise<void>;
};

const Header = ({ onCreate }: Props) => {
	const { user, signOut } = useAuth();

	const inputRef = useInputAutoFocus();

	return (
		<div className="relative h-50 bg-[url('/src/assets/header-background.png')] bg-cover bg-center md:h-75">
			<div className="absolute z-10 size-full bg-linear-to-bl from-[#5596FF]/80 to-[#AC2DEB]/80">
				<HCenteredContainer zIndex={20} className="h-full">
					<div className="flex size-full flex-col justify-center gap-6 md:gap-8">
						<div>
							{user ? (
								<div className="flex items-center gap-4">
									<p className="text-white">Welcome, {user?.email}</p>
									<Button variant="destructive" onClick={signOut}>
										Sign Out
									</Button>
								</div>
							) : null}
							<h1 className="text-2xl font-bold tracking-[15px] text-white md:text-[40px]">
								TODO
							</h1>
						</div>
						<Formik
							initialValues={{ title: "", isDone: false }}
							validationSchema={toDoSchema}
							onSubmit={async (values, { resetForm, setSubmitting }) => {
								console.log(values);
								try {
									await onCreate(values.title, values.isDone);
									resetForm();
								} catch (error) {
									console.error("Error creating todo:", error);
								} finally {
									setSubmitting(false);
								}
							}}
						>
							{({
								values,
								handleChange,
								setFieldValue,
								submitForm,
								errors,
							}) => (
								<Form>
									<InputGroup
										className={cn(
											"h-12 items-center rounded-lg bg-white md:h-16 dark:bg-neutral-900",
											errors.title ? "border border-red-500" : "",
										)}
									>
										<InputGroupAddon className="px-4">
											<GradientCheckbox
												checked={values.isDone}
												onCheckedChange={(checked: boolean) =>
													setFieldValue("isDone", checked)
												}
											/>
										</InputGroupAddon>
										<InputGroupInput
											ref={inputRef}
											id="title"
											name="title"
											className="p-0 pt-1 text-xs placeholder:text-xs placeholder:text-[#9495A5] md:text-lg md:placeholder:text-lg"
											placeholder="Create a new todo..."
											value={values.title}
											onChange={handleChange}
											onKeyDown={async (e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													await submitForm();
												}
											}}
										/>
									</InputGroup>
								</Form>
							)}
						</Formik>
					</div>
				</HCenteredContainer>
			</div>
		</div>
	);
};

export default Header;
