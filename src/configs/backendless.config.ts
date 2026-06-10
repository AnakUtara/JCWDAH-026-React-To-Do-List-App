import Backendless from "backendless";

const BACKENDLESS_API_URL = import.meta.env.VITE_BACKENDLESS_API_URL;
const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
const BACKENDLESS_API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY;

const initBackendless = () =>
	Backendless.initApp(BACKENDLESS_APP_ID, BACKENDLESS_API_KEY);

export {
	BACKENDLESS_API_URL,
	BACKENDLESS_APP_ID,
	BACKENDLESS_API_KEY,
	initBackendless,
};
