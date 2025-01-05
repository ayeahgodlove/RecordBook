/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */

import { Sequelize } from "sequelize-typescript";

import * as dotenv from "dotenv";
import { User } from "../../../data/entities/user";
import { Role } from "../../../data/entities/role";
import { Branch } from "../../../data/entities/branch";
import { UserRole } from "../../../data/entities/user-role";
import { Asset } from "../../../data/entities/asset";
import { Attachment } from "../../../data/entities/attachment";
import { FinancialRecord } from "../../../data/entities/financial-record";
import { MeetingMinute } from "../../../data/entities/meeting-minute";
import { Category } from "../../../data/entities/category";

dotenv.config();

export class PostgresDbConfig {
  private readonly _sequelize!: Sequelize;
  /**
   *
   */
  constructor() {
    this._sequelize = new Sequelize({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      port: parseInt(process.env.DB_PORT || "5432", 10),
      host: process.env.HOST,
      dialect: "postgres",
      models: [
        Category,
        User,
        Role,
        UserRole,
        Branch,
        Asset,
        Attachment,
        FinancialRecord,
        MeetingMinute,
      ],
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000,
      },
      ssl: true,
    });
  }

  public get sequelize() {
    return this._sequelize;
  }

  connection = async () => {
    try {
      await this.sequelize.sync();
      console.log("Postgres connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the postgres database:", error);
    }
  };
}
