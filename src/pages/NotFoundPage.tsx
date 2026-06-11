import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-4xl font-bold">404</h1>
				<p className="text-lg text-gray-600">Page Not Found</p>
				<Button className="w-full" variant="destructive" asChild>
					<Link to="/">
						<ArrowLeft className="size-4" />
						Go Back
					</Link>
				</Button>
			</div>
		</div>
	);
};
export default NotFoundPage;
