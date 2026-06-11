import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(
	url: string,
	axiosConfig: AxiosRequestConfig,
	axiosInstance: AxiosInstance = axios,
	onSuccess?: (data: T) => void,
	onError?: (error: Error) => void,
) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await axiosInstance.get<T>(url, axiosConfig);
			setData(res.data);
			if (onSuccess) {
				onSuccess(res.data);
			}
		} catch (error) {
			setError(error as Error);
			if (onError) {
				onError(error as Error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, isLoading, error, setError, refetch: fetchData };
};

export default useFetch;
