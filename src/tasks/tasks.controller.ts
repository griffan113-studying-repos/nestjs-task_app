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
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/getTasksFilter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-validation.pipe";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./taskStatuses.enum";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDTO
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get(":id")
  public getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete(":id")
  public deleteTask(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }
}
