import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../../lib/prisma";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const productId =  req.query.id;
    if(req.method === 'PUT'){
        const {name,quantity,price,categoryId} = JSON.parse(req.body);
        const result = await prisma.product.update({
            where: {id: Number(productId)},
            data: {name, quantity, price, categoryId},
        })
        res.json(result);
    }

    if(req.method === 'DELETE'){
        const result = await prisma.product.delete({
            where:{id:Number(productId)}
        })
        res.json(result)
    }
    
}

