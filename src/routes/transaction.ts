import { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { addObjectToDb, getAllDbObjects, getDbObject } from "../services/storj";
import { getAddressWatchersForAppId, getAppForAppId } from "../utils/dto";
import { CHAIN_NAME, DB_OBJECTS, RESPONSE_MESSAGES } from "../utils/interfaces";

const addAddressWatcherRoutes = (app: Express) => {
  // Get the address watchers for the app id
  app.get(
    "/v0/transactions",
    async (req: Request, res: Response): Promise<Response> => {
      console.log("_+_+_ req.query");
      console.log(req.query);

      if (!("app_id" in req.query) || typeof req.query["app_id"] !== "string") {
        return res.status(404).send({
          data: "Add an app id",
          message: RESPONSE_MESSAGES.ERROR,
        });
      } else {
        const appList = await getAppForAppId(req.query["app_id"]);
        if (appList.length === 0) {
          return res.status(404).send({
            data: "App id not found",
            message: RESPONSE_MESSAGES.ERROR,
          });
        }

        const addressWatcherList = await getAddressWatchersForAppId(
          req.query["app_id"]
        );

        console.log("addressWatcherList");
        console.log(addressWatcherList);

        const referenceAddresses = addressWatcherList.map(
          (watcherObj: any) => watcherObj.parts.trackingAddress
        );
        console.log("referenceAddresses");
        console.log(referenceAddresses);

        // get all the address watchers
        const allTransactionsListing = await getAllDbObjects(
          DB_OBJECTS.transaction
        );

        // const [transactionHash, trackingAddress] = currentAppId.split("*");

        // filter out the ones that only have user in the first part
        const reducedList = allTransactionsListing
          ? allTransactionsListing.filter((transactionId: any) => {
              if (transactionId) {
                let currentTransactionId = transactionId.split("/")[1];
                const [transactionHash, trackingAddress] =
                  currentTransactionId.split("*");

                return referenceAddresses.includes(trackingAddress);
              }
              return false;
            })
          : [];

        const populateList = reducedList.map((transactionId: any) => {
          let coreId = transactionId.split("/")[1];
          const [transactionHash, trackingAddress] = coreId.split("*");

          return {
            parts: {
              transactionHash,
              trackingAddress,
            },
            fullId: coreId,
          };
        });
        return res.send(populateList);
      }
    }
  );

  // // Get a specific address watcher
  // app.get(
  //   "/v0/address-watcher",
  //   async (req: Request, res: Response): Promise<Response> => {
  //     console.log("_+_+_ req.query");
  //     console.log(req.query);

  //     if (!("id" in req.query) || typeof req.query["id"] !== "string") {
  //       return res.status(404).send({
  //         data: "Add an address watcher id",
  //         message: RESPONSE_MESSAGES.ERROR,
  //       });
  //     } else {
  //       // get a specific address watcher
  //       const dbLocation = DB_OBJECTS.addressWatcher;
  //       const returnedAfterUpload = await getDbObject(
  //         dbLocation,
  //         req.query["id"]
  //       );

  //       return res.send(returnedAfterUpload);
  //     }
  //   }
  // );
};

export default addAddressWatcherRoutes;
