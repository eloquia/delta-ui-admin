import axios, { AxiosResponse } from 'axios';

import { apiUrl } from '../env';
import { authHeaders } from './helpers';
import { ITaskData } from '../interfaces/tasks';

export default {
	async createTask(taskData: ITaskData, token: string): Promise<AxiosResponse<number>> {
		return axios.post(`${apiUrl}/tasks/`, taskData, authHeaders(token));
	},
	async getTasks(token: string): Promise<AxiosResponse<unknown>> {
		return axios.get(`${apiUrl}/tasks/`, authHeaders(token));
	},
};
