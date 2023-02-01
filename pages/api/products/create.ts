import { prisma } from "../../../lib/prisma";
import fs from "fs";
import AWS from "aws-sdk";
import { FormidableError, parseForm } from "../../../lib/parse-form";
import { NextApiRequest, NextApiResponse } from "next";

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
    const { name, price,  quantity, categoryId} = fields;
    console.log(name, price,quantity, categoryId);
    let fileName = Array.isArray(file)
      ? file.map((f) => f.newFilename)
      : file.newFilename;
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
    console.log('url:', url)
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: fileName,
      Body: fs.createReadStream(url),
      ACL: "public-read",
    };
    //@ts-ignore
    try {
        let s3Respnse = await s3Client.upload(params).promise();
        if(s3Respnse.Location){
            const createdMenuItem= await prisma.product.create({
                data:{
                    name:name.toString(),
                    price:Number(price),
                    imageUrl:s3Respnse.Location,
                    quantity:Number(quantity),
                    categoryId:Number(categoryId)
                }
            })
    
          if (createdMenuItem) {
            return res.status(200).json({
              data: {
                message: "product has been created successfully!",
              },
              error: null,
            });
          }
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

// export default async function handler(req:NextApiRequest, res: NextApiResponse) {
//     const {name, price, quantity, categoryId} = req.body
    
// }