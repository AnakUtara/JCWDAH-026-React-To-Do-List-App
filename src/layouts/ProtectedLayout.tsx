import { useAuth } from "@/context/AuthContext";
import LoadingPage from "@/pages/LoadingPage";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
	const { user, isAuthenticating } = useAuth();

	if (isAuthenticating) {
		return <LoadingPage />;
	}

	if (!user) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};
export default ProtectedLayout;
