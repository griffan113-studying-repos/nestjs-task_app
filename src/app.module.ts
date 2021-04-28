import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeORMConfig } from "./config/typeorm.config";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(TypeORMConfig)],
})
export class AppModule {}
