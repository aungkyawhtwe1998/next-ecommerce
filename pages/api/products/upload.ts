import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import AWS from "aws-sdk";
import { FormidableError, parseForm } from "../../../lib/parse-form";

const s3Client = new AWS.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: "sgp1",
  credentials: {
    // @ts-ignore
    accessKeyId: process.env.DO_SPACES_ID,
    // @ts-ignore
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      message: string | string[];
    } | null;
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }

  try {
    const { fields, files } = await parseForm(req);
    const file = files.media;
    const { name, price, location_id, image_url, menu_categories_id } = fields;
    console.log(name, price, location_id, image_url, menu_categories_id);
    let fileName = Array.isArray(file)
      ? file.map((f) => f.newFilename)
      : file.newFilename;
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: fileName,
      Body: fs.createReadStream(url),
      ACL: "public-read",
    };
    //@ts-ignore
    let s3Respnse = await s3Client.upload(params).promise();
    try {
      const createdMenuItem = await prisma.menu_items.create({
        data: {
          name,
          price: +price,
          image_url: s3Respnse.Location,
        },
      });

      if (createdMenuItem) {
        return res.status(200).json({
          data: {
            message: "menu has been created successfully!",
          },
          error: null,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
};

export default handler;
