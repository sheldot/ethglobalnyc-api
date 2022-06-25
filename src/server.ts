import "reflect-metadata";
import express, { Request, Response } from "express";
import { createServer } from "http";

import env from "./env";
import setUpRpc from "./rpc-setup";

const app = express();

app.get("/", (req: Request, res: Response): Response => {
  console.log("_+_+_ req");
  console.log(Object.keys(req));
  console.log(req.body);

  return res.send("ok");
});

app.get(
  "/v0/transaction",
  async (req: Request, res: Response): Promise<Response> => {
    console.log("_+_+_ req");
    console.log(Object.keys(req));
    console.log(req.body);

    return res.send(await setUpRpc());
  }
);

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
