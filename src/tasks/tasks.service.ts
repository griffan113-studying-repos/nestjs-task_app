/*
 *
 * Services:
 * Contains the business logic to realise the task;
 *
 */

import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.module";
import { v1 as uuid } from "uuid";
import { CreateTaskDTO } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    console.log("GET on tasks path!");
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string) {
    const findTaskIndex = this.tasks.findIndex((task) => task.id === id);

    return findTaskIndex !== -1
      ? this.tasks.splice(findTaskIndex, 1)
      : console.log("Not found");
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
