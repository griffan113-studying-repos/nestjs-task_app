/*
 *
 *  Custom Pipes must implement PipeTransform to inherit properties;
 *
 */
import { TaskStatus } from "../task.module";
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status!`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);

    return index !== -1;
  }
}
