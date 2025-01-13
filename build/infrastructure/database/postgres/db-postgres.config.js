"use strict";
/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDbConfig = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
const user_1 = require("../../../data/entities/user");
const role_1 = require("../../../data/entities/role");
const branch_1 = require("../../../data/entities/branch");
const user_role_1 = require("../../../data/entities/user-role");
const asset_1 = require("../../../data/entities/asset");
const attachment_1 = require("../../../data/entities/attachment");
const financial_record_1 = require("../../../data/entities/financial-record");
const meeting_minute_1 = require("../../../data/entities/meeting-minute");
const income_type_1 = require("../../../data/entities/income-type");
const expense_type_1 = require("../../../data/entities/expense-type");
const record_type_1 = require("../../../data/entities/record-type");
dotenv.config();
class PostgresDbConfig {
    _sequelize;
    /**
     *
     */
    constructor() {
        this._sequelize = new sequelize_typescript_1.Sequelize({
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB,
            port: parseInt(process.env.DB_PORT || "5432", 10),
            host: process.env.HOST,
            dialect: "postgres",
            models: [
                income_type_1.IncomeType,
                expense_type_1.ExpenseType,
                record_type_1.RecordType,
                user_1.User,
                role_1.Role,
                user_role_1.UserRole,
                branch_1.Branch,
                asset_1.Asset,
                attachment_1.Attachment,
                financial_record_1.FinancialRecord,
                meeting_minute_1.MeetingMinute,
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
    get sequelize() {
        return this._sequelize;
    }
    connection = async () => {
        try {
            await this.sequelize.sync();
            console.log("Postgres connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the postgres database:", error);
        }
    };
}
exports.PostgresDbConfig = PostgresDbConfig;
