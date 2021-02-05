import axios, { AxiosResponse } from 'axios';

import { apiUrl } from '../env';
import { authHeaders } from './helpers';
import { IUserProfile, IUserProfileUpdate, ITokenResponse } from '../interfaces/core';

export default {
	async logInGetToken(username: string, password: string): Promise<AxiosResponse<ITokenResponse>> {
		const params = new URLSearchParams();
		params.append('username', username);
		params.append('password', password);

		return axios.post(`${apiUrl}/login/access-token`, params);
	},
	async getMe(token: string): Promise<AxiosResponse<IUserProfile>> {
		return axios.get<IUserProfile>(`${apiUrl}/users/me`, authHeaders(token));
	},
	async updateMe(token: string, data: IUserProfileUpdate): Promise<unknown> {
		return axios.put<IUserProfile>(`${apiUrl}/users/me`, data, authHeaders(token));
	},
	async getUsers(token: string): Promise<AxiosResponse<IUserProfile[]>> {
		return axios.get<IUserProfile[]>(`${apiUrl}/users/`, authHeaders(token));
	},
	async updateUser(token: string, userId: number, data: IUserProfileUpdate): Promise<AxiosResponse<unknown>> {
		return axios.put(`${apiUrl}/users/${userId}`, data, authHeaders(token));
	},
};