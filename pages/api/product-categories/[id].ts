import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../../lib/prisma";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const categoryId =  req.query.id;
    if(req.method === 'PUT'){
        const {name} = JSON.parse(req.body);
        const result = await prisma.category.update({
            where: {id: Number(categoryId)},
            data: {name},
        })
        res.json(result);
    }

    if(req.method === 'DELETE'){
        const result = await prisma.category.delete({
            where:{id:Number(categoryId)}
        })
        res.json(result)
    }
    
}

