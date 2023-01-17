import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const {id, name, price, quantity, categoryId} = req.body
    console.log(req.body)
    try{
        await prisma.product.update({
            where: {
                id: id,
              },
              data: {
                name,
                price,
                quantity,
                categoryId
              },
        }).then(()=>{
            res.status(200).json({message: 'product updated'})
        })
    }  catch(error){
        console.log(error);
    }  
}