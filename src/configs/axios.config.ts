import axios from "axios";
import { BACKENDLESS_API_URL } from "./backendless.config";

const backendlessApi = axios.create({
	baseURL: `${BACKENDLESS_API_URL}/data`,
});

export default backendlessApi;
