import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

const PublicLayout = () => {
	const { user } = useAuth();

	if (user && user.authenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
export default PublicLayout;
