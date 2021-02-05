import { AxiosRequestConfig } from 'axios';

export function authHeaders(token: string): AxiosRequestConfig {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}
