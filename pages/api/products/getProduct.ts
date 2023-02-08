import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productId = req.query.id;
  try {
    if(req.method === "GET"){
      const { product_id } = req.query;
      console.log(product_id)
      const result = await prisma.product.findUnique({
        where: { id: Number(product_id) },
        include:{
          category:true,
          order_item:true
        }
      });
      res.status(201).json(result);
    }else{
        res.status(500).json({ message:"Invalid Method" });

    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}
