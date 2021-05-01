/*
 *
 * Services:
 * Contains the business logic to realise the task;
 *
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/getTasksFilter.dto";
import { Task } from "./task.entity";
import { TaskRepository } from "./tasks.repository";
import { TaskStatus } from "./taskStatuses.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  public getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  public async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) throw new NotFoundException(`Task with id: ${id} not found`);

    return found;
  }

  public async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  public async deleteTask(id: number): Promise<Task> {
    const findTask = await this.taskRepository.findOne(id);

    if (!findTask) throw new NotFoundException(`Task with id: ${id} not found`);

    findTask.remove();

    return findTask;
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();

    return task;
  }
}
