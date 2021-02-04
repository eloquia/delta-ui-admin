import axios from "axios";

import { apiUrl } from '../env';
import { authHeaders } from './helpers';
import { ITaskData } from '../interfaces/tasks';

export default {
  async createTask(taskData: ITaskData, token: string) {
    return axios.post(`${apiUrl}/tasks/`, taskData, authHeaders(token));
  },
}
