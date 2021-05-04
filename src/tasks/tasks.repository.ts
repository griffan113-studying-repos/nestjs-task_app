import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/getTasksFilter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./taskStatuses.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger("TaskRepository");
  public async getTasks(
    filterDto: GetTasksFilterDTO,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");

    query.where("task.userId = :userId", { userId: user.id });

    if (status) {
      query.andWhere("task.status = :status", { status });
      // When using just "WHERE" operation, the method will overwrite any other condition, because this we use here "andWhere";
    }

    if (search) {
      query.andWhere(
        "(task.title LIKE :search OR task.description LIKE :search)", // "()" for using as one single condition;
        { search: `%${search}%` } // "%" for searching for substring, an not only the exact value;
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}", DTO: ${filterDto}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  public async createTask(
    createTaskDto: CreateTaskDTO,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a task for user: "${user.username}", Data ${createTaskDto}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }

    delete task.user;

    return task;
  }
}
