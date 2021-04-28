/*
 *
 * Controllers:
 * Responsable for making the CRUD and the handling requests and responses;
 *
 */

/* 
 * - Pipes operate on the arguments to be processed by the route handler, just before the handler is called.
 - Pipes can perform data transformation or data validation.
 * - Pipes can return data - either original or modified - which will be passed on to the route handler.
 * - Pipes can throw exceptions. Exceptions thrown will be handled by NestJS and parsed into an error response.
 * - Pipes can be asynchronous.
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/getTasksFilter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-validation-pipe";
import { Task, TaskStatus } from "./task.module";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterDto).length >= 1) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id", ValidationPipe) id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }
}
