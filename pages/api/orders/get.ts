import { prisma } from "../../../lib/prisma";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { customerId }: any = req.query;
  
  if (req.method === "GET") {
    try {
        if(customerId){
            const orders = await prisma.order.findMany({
                where:{
                    customerId: +customerId,
                },
                include: {
                  customer: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                  order_item:{
                    
                    select:{
                        productName:true,
                        productPrice:true,
                        productCount:true
                    },
                    
                  }
                },
              });
              if (orders) {
                res.status(200).json(orders);
              }
        }else{
            const orders = await prisma.order.findMany({
                include: {
                  customer: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              });
              if (orders) {
                res.status(200).json(orders);
              }
        }
      
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};
