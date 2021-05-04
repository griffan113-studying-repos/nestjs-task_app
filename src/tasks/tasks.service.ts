/*
 *
 * Services:
 * Contains the business logic to realise the task;
 *
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
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

  public getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  public async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) throw new NotFoundException(`Task with id: ${id} not found`);

    return found;
  }

  public async createTask(
    createTaskDto: CreateTaskDTO,
    user: User
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  public async deleteTask(id: number, user: User): Promise<Task> {
    const findTask = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!findTask) throw new NotFoundException(`Task with id: ${id} not found`);

    findTask.remove();

    return findTask;
  }

  public async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();

    return task;
  }
}
