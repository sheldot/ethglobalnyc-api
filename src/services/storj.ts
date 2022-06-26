import AWS from "aws-sdk";

import env from "../utils/env";
const BUCKET_NAME = "ethglobal-nyc-hackathon";

// Construct the s3 representation of the the bucket
const _getS3 = () => {
  return new AWS.S3({
    accessKeyId: env.db.username,
    secretAccessKey: env.db.password,
    endpoint: env.db.accessUrl,
  });
};

// Add an element to the location
export const addObjectToDb = async (
  dbLocation: string,
  objectId: string,
  dataObject: any
) => {
  const s3 = _getS3();

  let destparams = {
    Bucket: `${BUCKET_NAME}/${dbLocation}`,
    Key: `${objectId}.json`,
    Body: JSON.stringify(dataObject),
    ContentType: "application/json",
    ContentDisposition: "attachment",
    CacheControl: "public, max-age=86400",
  };

  // Uploading files to the bucket
  const uploadedPayload = await s3.upload(destparams).promise();

  console.log("--- uploadedPayload");
  console.log(uploadedPayload);

  return uploadedPayload;
};

// Get a specific entry
export const getDbObject = async (dbLocation: string, objectId: string) => {
  const s3 = _getS3();
  let parsedObject = {};

  try {
    const fileBlob = await s3
      .getObject({
        Bucket: BUCKET_NAME,
        Key: `${dbLocation}/${objectId}.json`,
      })
      .promise();

    console.log("-=-=-=- fileBlob");
    console.log(fileBlob);

    parsedObject = fileBlob.Body ? JSON.parse(fileBlob.Body.toString()) : {};
  } catch (e) {
    console.log(e);
  }

  return parsedObject;
};

// Get all the objects in a particular location
export const getAllDbObjects = async (dbLocation: string) => {
  const s3 = _getS3();
  const folderContents = await s3
    .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: dbLocation + "/" })
    .promise();
  const fileNames = folderContents.Contents?.map((file) => file.Key);

  console.log("-=-=-=- fileNames");
  console.log(fileNames);

  return fileNames;
};
