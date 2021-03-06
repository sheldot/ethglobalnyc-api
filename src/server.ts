import "reflect-metadata";
import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import { createServer } from "http";

import env from "./utils/env";

import addAppRoutes from "./routes/app";
import addTransactionRoutes from "./routes/transaction";
import addAddressWatcherRoutes from "./routes/addressWatcher";

const app = express();
app.use(bodyparser.json());

app.get("/", (req: Request, res: Response): Response => {
  console.log("_+_+_ req");
  console.log(Object.keys(req));
  console.log(req.body);

  return res.send("ok");
});

addAppRoutes(app);
addTransactionRoutes(app);
addAddressWatcherRoutes(app);

const start = async (): Promise<void> => {
  try {
    createServer(app).listen(env.server.port, () =>
      console.info(`Server running on port ${env.server.port}`)
    );
  } catch (error) {
    console.error("_+_+_ Error");
    console.error(error);
    process.exit(1);
  }
};

void start();
