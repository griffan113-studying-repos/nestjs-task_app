import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/getTasksFilter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./taskStatuses.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");

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

    const tasks = await query.getMany();

    return tasks;
  }

  public async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
