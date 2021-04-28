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
  // getAllTasks(): Task[] {
  //   console.log("GET on tasks path!");
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search)
  //     );
  //   }
  //   return tasks;
  // }

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

  // deleteTask(id: string) {
  //   const findTaskIndex = this.tasks.findIndex((task) => task.id === id);
  //   if (findTaskIndex === -1) {
  //     throw new NotFoundException(`Task with id: ${id} not found`);
  //   }
  //   return this.tasks.splice(findTaskIndex, 1);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const findTask = this.getTaskById(id);
  //   findTask.status = status;
  //   return findTask;
  // }
  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
