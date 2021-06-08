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
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/getTasksFilter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-validation.pipe";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./taskStatuses.enum";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TasksController");
  constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDTO,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(
      `User: "${user.username}" retrieving all tasks. Filter: ${JSON.stringify(
        filterDto
      )}`
    );
    return this.tasksService.getTasks(filterDto, user);
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("/:id")
  public getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete("/:id")
  public deleteTask(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(
    @GetUser() user: User,
    @Body() createTaskDTO: CreateTaskDTO
  ): Promise<Task> {
    this.logger.verbose(
      `User: "${user.username}" creating a task. Data: ${JSON.stringify(
        createTaskDTO
      )}`
    );
    return this.tasksService.createTask(createTaskDTO, user);
  }
}
