import Backendless from "backendless";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface IAuthContext {
	user: Backendless.User | null;
	signUp: (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => void;
	signIn: (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => void;
	signOut: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

type Props = {
	children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<Backendless.User | null>(null);

	const nav = useNavigate();

	const signUp = async (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => {
		try {
			await Backendless.UserService.register({
				email,
				password,
			});
			onSuccess?.();
			toast.success("User registered successfully! Please login to continue.");
			nav("/sign-in");
		} catch (error) {
			onError?.();
			toast.error("Failed to register user!");
			console.error(error);
		}
	};

	const signIn = async (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: () => void,
	) => {
		try {
			const authUser = await Backendless.UserService.login(
				email,
				password,
				true,
			);
			setUser(authUser);
			onSuccess?.();
			toast.success("Logged in successfully!");
			nav("/");
		} catch (error) {
			onError?.();
			toast.error("Failed to login! Please check your email and password.");
			console.error(error);
			setUser(null);
		}
	};

	const signOut = async () => {
		try {
			await Backendless.UserService.logout();
			setUser(null);
			toast.success("Logged out successfully!");
			nav("/sign-in");
		} catch (error) {
			toast.error("Failed to logout!");
			console.error(error);
		}
	};

	const refreshUser = async () => {
		try {
			const currentUser = await Backendless.UserService.getCurrentUser();
			setUser(currentUser);
		} catch (error) {
			console.error("Failed to refresh user:", error);
		}
	};

	const checkAuth = async () => {
		try {
			const isValid = await Backendless.UserService.isValidLogin();
			if (isValid) {
				refreshUser();
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("Failed to check auth:", error);
			toast.error("Failed to check authentication status!");
			setUser(null);
		}
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		checkAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				signUp,
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
