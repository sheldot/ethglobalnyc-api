import "reflect-metadata";
import express, { Request, Response } from "express";
import { createServer } from "http";

import env from "./env";
import { CHAIN_ID } from "./interfaces";
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

    // Shouuld be an address = 0x
    // 0xd3CdA913deB6f67967B99D67aCDFa1712C293601

    // Shouuld be a contract = 0x606060405236....
    // 0x6C8f2A135f6ed072DE4503Bd7C4999a1a17F824B

    return res.send(
      await processAddressType(
        CHAIN_ID.MAINNET,
        "0x6C8f2A135f6ed072DE4503Bd7C4999a1a17F824B"
      )
    );
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
