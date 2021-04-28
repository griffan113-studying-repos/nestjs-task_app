/*
 *
 * Services:
 * Contains the business logic to realise the task;
 *
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.module";
import { v1 as uuid } from "uuid";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/getTasksFilter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    console.log("GET on tasks path!");
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search)
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return found;
  }

  deleteTask(id: string) {
    const findTaskIndex = this.tasks.findIndex((task) => task.id === id);

    if (findTaskIndex === -1) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return this.tasks.splice(findTaskIndex, 1);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const findTask = this.getTaskById(id);
    findTask.status = status;

    return findTask;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
