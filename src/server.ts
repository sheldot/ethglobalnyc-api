import "reflect-metadata";
import express, { Request, Response } from "express";
import { createServer } from "http";

import env from "./env";
import { CHAIN_ID, RESPONSE_MESSAGES } from "./interfaces";
import { processAddressType } from "./rpc-setup";

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
    console.log(Object.keys(req));
    console.log(req.query);
    console.log((<any>Object).values(CHAIN_ID));

    if (!("address" in req.query) || typeof req.query["address"] !== "string") {
      return res.status(404).send({
        data: "Add an address",
        message: RESPONSE_MESSAGES.ERROR,
      });
    } else if (
      !("chain" in req.query) ||
      typeof req.query["chain"] !== "string" ||
      !(<any>Object).values(CHAIN_ID).includes(req.query["chain"])
    ) {
      return res.status(404).send({
        data: "Add a valid chain",
        message: RESPONSE_MESSAGES.ERROR,
      });
    } else {
      return res.send(
        await processAddressType(CHAIN_ID.MAINNET, req.query["address"])
      );
    }
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
