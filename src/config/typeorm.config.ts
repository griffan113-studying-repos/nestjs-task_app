import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";

const dbConfig = config.get("db");

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host || process.env.HOST,
  port: dbConfig.port || process.env.PG_PORT,
  username: dbConfig.username || process.env.USERNAME,
  password: dbConfig.password || process.env.PASSWORD,
  database: dbConfig.username || process.env.USERNAME,
  autoLoadEntities: true,
  synchronize: dbConfig.synchronize || process.env.SYNC,
};
