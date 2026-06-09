import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
	const { user } = useAuth();

	if (!user || !user.authenticated) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};
export default ProtectedLayout;
