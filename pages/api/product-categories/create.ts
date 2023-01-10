import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const {name} = req.body
    console.log(req.body)
    try{
        await prisma.category.create({
            data:{
                name,
            }
        }).then(()=>{
            res.status(200).json({message: 'product category created'})
        })
    }  catch(error){
        console.log('filure');
    }  
}