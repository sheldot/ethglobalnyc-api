import { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { addObjectToDb, getAllDbObjects, getDbObject } from "../services/storj";
import { CHAIN_NAME, DB_OBJECTS, RESPONSE_MESSAGES } from "../utils/interfaces";

const addAppRoutes = (app: Express) => {
  // Get the app for the user address
  app.get(
    "/v0/apps",
    async (req: Request, res: Response): Promise<Response> => {
      console.log("_+_+_ req.query");
      console.log(req.query);

      if (
        !("user_address" in req.query) ||
        typeof req.query["user_address"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add an user address",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        // get all the apps
        const dbLocation = DB_OBJECTS.app;
        const returnedAfterUpload = await getAllDbObjects(dbLocation);

        // filter out the ones that only have user in the first part
        const reducedList = returnedAfterUpload
          ? returnedAfterUpload.filter((appName: any) => {
              if (appName) {
                let appUserAddress = appName.split("/")[1];
                appUserAddress = appUserAddress.split("*")[0];

                return req.query["user_address"] === appUserAddress;
              }
              return false;
            })
          : [];

        return res.send(reducedList);
      }
    }
  );

  // Get a specific app
  app.get("/v0/app", async (req: Request, res: Response): Promise<Response> => {
    console.log("_+_+_ req.query");
    console.log(req.query);

    if (!("id" in req.query) || typeof req.query["id"] !== "string") {
      return res.status(404).send({
        data: "Add an app id",
        message: RESPONSE_MESSAGES.ERROR,
      });
    } else {
      // get all the apps
      const dbLocation = DB_OBJECTS.app;
      const returnedAfterUpload = await getDbObject(
        dbLocation,
        req.query["id"]
      );

      return res.send(returnedAfterUpload);
    }
  });

  // Create an app
  app.post(
    "/v0/apps",
    async (req: Request, res: Response): Promise<Response> => {
      console.log("_+_+_ req.body");
      console.log(Object.keys(req));
      console.log(req.body);
      console.log("user_address" in req.body);

      if (!req.body) {
        return res.status(404).send({
          data: "Invalid request body",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("user_address" in req.body) ||
        typeof req.body["user_address"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add a user address",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("app_name" in req.body) ||
        typeof req.body["app_name"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add an app name",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("app_description" in req.body) ||
        typeof req.body["app_description"] !== "string"
      ) {
        return res.status(404).send({
          data: "Add an app description",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else if (
        !("chain" in req.body) ||
        typeof req.body["chain"] !== "string" ||
        !(<any>Object).values(CHAIN_NAME).includes(req.body["chain"])
      ) {
        return res.status(404).send({
          data: "Add a valid chain",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        const { user_address, app_name, app_description, chain } = req.body;

        // Create an app
        const dbLocation = DB_OBJECTS.app;

        // id = userid*uuid
        const objectId = `${user_address}*${chain}*${uuidv4()}`;

        const returnedAfterUpload = await addObjectToDb(dbLocation, objectId, {
          name: app_name,
          description: app_description,
          author: user_address,
          chain,
        });

        // Create an app watcher -- SKIP FOR NOW
        // const dbLocation = DB_OBJECTS.wat;
        // const objectId = "test6";
        // const returnedAfterUpload = await addObjectToDb(dbLocation, objectId, {
        //   nameTest4Dif: "hello6-diff",
        //   descTest4Dif: "hello hello6-diff",
        // });

        return res.send(returnedAfterUpload);
      }
    }
  );
};

export default addAppRoutes;
