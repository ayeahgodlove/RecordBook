import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";

import Passport from "./shared/middlewares/authz.middleware";

import { PostgresDbConfig } from "./infrastructure/database/postgres/db-postgres.config";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { notFoundHandler } from "./shared/middlewares/not-found.middleware";
import roleRouter from "./presentation/routes/role.route";
import { authRoutes } from "./presentation/routes/auth/auth.route";
import userRouter from "./presentation/routes/user.route";

import path from "path";
import branchRouter from "./presentation/routes/branch.route";

import processPaymentRouter from "./presentation/routes/payment/process-payments.route";
import userRoleRouter from "./presentation/routes/user-role.route";
import uploadRouter from "./presentation/routes/upload.route";
import attachmentRouter from "./presentation/routes/attachment.route";
import meetingMinuteRouter from "./presentation/routes/meeting-minute.route";
import financialRecordRouter from "./presentation/routes/financial-record.route";
import assetRouter from "./presentation/routes/asset.route";
import incomeTypeRouter from "./presentation/routes/income-type.route";
import expenseTypeRouter from "./presentation/routes/expense-type.route";
import recordTypeRouter from "./presentation/routes/record-type.route";

dotenv.config();
const db = new PostgresDbConfig();
/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

db.connection()
  .then(() => {
    const app: Express = express();

    /**
     *  App Configuration
     */

    // Serve static files from the public folder
    app.use(express.static("public"));
    app.use(express.static(path.join(__dirname, "public")));

    const corsOptions = {
      origin: "*", // Allow requests from all origins (for development only)
      credentials: true,
    };

    app.use(cors(corsOptions));
    app
      .use(
        express.urlencoded({
          extended: true,
        })
      )
      .use(express.json({ limit: "50kb" }))
      .use(cookieParser())
      .use(helmet())
      .use(
        session({
          // store: store,
          secret: `${process.env.SESSION_SECRET}`,
          resave: false,
          saveUninitialized: false,
          cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
        })
      )
      .use(Passport.initialize())
      .use(Passport.authenticate("session"))
      .use(Passport.session());

    app.use(errorHandler);

    // authentication
    app.use("/auth", authRoutes);

    app.get("/api", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });

    app.use("/api/incomeTypes", incomeTypeRouter);
    app.use("/api/expenseTypes", expenseTypeRouter);
    app.use("/api/recordTypes", recordTypeRouter);

    app.use("/api/roles", roleRouter);
    app.use("/api/users", userRouter);
    app.use("/api/branches", branchRouter);
    app.use("/api/attachments", attachmentRouter);
    app.use("/api/meetingMinutes", meetingMinuteRouter);
    app.use("/api/financialRecords", financialRecordRouter);
    app.use("/api/assets", assetRouter);
    //only for test purposes
    app.use("/api/process-payments", processPaymentRouter);

    app.use("/api/user-roles", userRoleRouter);
    app.use("/api/uploads", uploadRouter);
    // middleware interceptions
    app.use(notFoundHandler);

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
