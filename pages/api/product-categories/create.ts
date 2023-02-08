import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const {name} = req.body
    console.log(req.body)
    try{
        const cateCreated = await prisma.category.create({
            data:{
                name,
            }
        });
        if(cateCreated){
            res.status(200).json({message: 'product category created'})
        }
    }  catch(error){
        res.status(500).json({message:'Internal server error'})
    }  
}