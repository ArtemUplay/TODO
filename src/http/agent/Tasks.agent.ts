import { BasicAgent } from './Basic.agent';
import {
  GetAllTasksResponse,
  GetAllTasksQuery,
  UpdateTaskResponse,
  UpdateTaskRequest,
  PostTaskRequest,
  PostTaskResponse,
  GetTaskResponse,
} from 'http/model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getTask(taskId: string): Promise<GetTaskResponse> {
    const { data } = await this.http.get<GetTaskResponse>(`/tasks/${taskId}`);

    return data;
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this.http.get<GetAllTasksResponse>(`/tasks`, {
      params,
    });

    return data;
  }

  async updateTask(taskId: string, newData: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this.http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newData);

    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.http.delete(`/tasks/${taskId}`);
  }

  async postTask(newData: PostTaskRequest): Promise<PostTaskResponse> {
    const { data } = await this.http.post<PostTaskResponse>('/tasks', newData);

    return data;
  }
}

export const TaskAgentInstance = new TasksAgent();
