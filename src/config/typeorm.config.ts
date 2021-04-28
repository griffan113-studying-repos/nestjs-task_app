import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "eliel2003",
  database: "taskmanagement",
  autoLoadEntities: true,
  synchronize: true,
};
