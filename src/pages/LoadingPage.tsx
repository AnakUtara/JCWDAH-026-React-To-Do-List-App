import { Spinner } from "@/components/ui/spinner";

const LoadingPage = () => {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<Spinner className="size-12" />
		</div>
	);
};
export default LoadingPage;
