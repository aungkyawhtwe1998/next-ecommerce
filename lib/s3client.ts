import AWS from "aws-sdk";

export const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "sgp1",
    credentials: {
      // @ts-ignore
      accessKeyId: process.env.DO_SPACES_ID,
      // @ts-ignore
      secretAccessKey: process.env.DO_SPACES_SECRET,
    },
  });
  