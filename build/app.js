"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authz_middleware_1 = __importDefault(require("./shared/middlewares/authz.middleware"));
const db_postgres_config_1 = require("./infrastructure/database/postgres/db-postgres.config");
const error_middleware_1 = require("./shared/middlewares/error.middleware");
const not_found_middleware_1 = require("./shared/middlewares/not-found.middleware");
const role_route_1 = __importDefault(require("./presentation/routes/role.route"));
const auth_route_1 = require("./presentation/routes/auth/auth.route");
const user_route_1 = __importDefault(require("./presentation/routes/user.route"));
const path_1 = __importDefault(require("path"));
const branch_route_1 = __importDefault(require("./presentation/routes/branch.route"));
const process_payments_route_1 = __importDefault(require("./presentation/routes/payment/process-payments.route"));
const user_role_route_1 = __importDefault(require("./presentation/routes/user-role.route"));
const upload_route_1 = __importDefault(require("./presentation/routes/upload.route"));
const attachment_route_1 = __importDefault(require("./presentation/routes/attachment.route"));
const meeting_minute_route_1 = __importDefault(require("./presentation/routes/meeting-minute.route"));
const financial_record_route_1 = __importDefault(require("./presentation/routes/financial-record.route"));
const asset_route_1 = __importDefault(require("./presentation/routes/asset.route"));
const income_type_route_1 = __importDefault(require("./presentation/routes/income-type.route"));
const expense_type_route_1 = __importDefault(require("./presentation/routes/expense-type.route"));
const record_type_route_1 = __importDefault(require("./presentation/routes/record-type.route"));
dotenv.config();
const db = new db_postgres_config_1.PostgresDbConfig();
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
db.connection()
    .then(() => {
    const app = (0, express_1.default)();
    /**
     *  App Configuration
     */
    // Serve static files from the public folder
    app.use(express_1.default.static("public"));
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    const corsOptions = {
        origin: "*",
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
    app
        .use(express_1.default.urlencoded({
        extended: true,
    }))
        .use(express_1.default.json({ limit: "50kb" }))
        .use((0, cookie_parser_1.default)())
        .use((0, helmet_1.default)())
        .use((0, express_session_1.default)({
        // store: store,
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    }))
        .use(authz_middleware_1.default.initialize())
        .use(authz_middleware_1.default.authenticate("session"))
        .use(authz_middleware_1.default.session());
    app.use(error_middleware_1.errorHandler);
    // authentication
    app.use("/auth", auth_route_1.authRoutes);
    app.get("/api", (req, res) => {
        res.send("Express + TypeScript Server");
    });
    app.use("/api/incomeTypes", income_type_route_1.default);
    app.use("/api/expenseTypes", expense_type_route_1.default);
    app.use("/api/recordTypes", record_type_route_1.default);
    app.use("/api/roles", role_route_1.default);
    app.use("/api/users", user_route_1.default);
    app.use("/api/branches", branch_route_1.default);
    app.use("/api/attachments", attachment_route_1.default);
    app.use("/api/meetingMinutes", meeting_minute_route_1.default);
    app.use("/api/financialRecords", financial_record_route_1.default);
    app.use("/api/assets", asset_route_1.default);
    //only for test purposes
    app.use("/api/process-payments", process_payments_route_1.default);
    app.use("/api/user-roles", user_role_route_1.default);
    app.use("/api/uploads", upload_route_1.default);
    // middleware interceptions
    app.use(not_found_middleware_1.notFoundHandler);
    /**
     * Server Activation
     */
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Listening on port ${PORT}`);
    });
})
    .catch((erro) => {
    console.log("error: ", erro);
});
