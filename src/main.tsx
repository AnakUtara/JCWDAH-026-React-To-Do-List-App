initBackendless();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import { Toaster } from "sonner";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import { initBackendless } from "./configs/backendless.config.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<AuthProvider>
					{
						// AuthProvider di bawah BrowserRouter supaya bisa pakai useNavigate di dalam AuthProvider
						// Berarti memang bisa juga route guard dilakukan di dalam AuthProvider,
						// Tapi untuk mengikuti best practice separation of concerns, kita buat ProtectedLayout dan PublicLayout sebagai route guard,
						// dan AuthProvider hanya fokus untuk menyediakan state user dan fungsi signIn/signUp/signOut saja
					}
					<Toaster richColors />
					<Routes>
						<Route path="/" element={<ProtectedLayout />}>
							<Route index element={<App />} />
						</Route>
						<Route element={<PublicLayout />}>
							<Route path="sign-up" element={<SignUpPage />} />
							<Route path="sign-in" element={<SignInPage />} />
						</Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
);
