import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeORMConfig } from "./config/typeorm.config";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), TasksModule, AuthModule],
})
export class AppModule {}
