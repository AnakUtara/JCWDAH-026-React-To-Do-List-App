import { useAuth } from "@/context/AuthContext";
import LoadingPage from "@/pages/LoadingPage";
import { Navigate, Outlet } from "react-router";

const PublicLayout = () => {
	const { user, isAuthenticating } = useAuth();

	if (isAuthenticating) {
		return <LoadingPage />;
	}

	if (user) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
export default PublicLayout;
