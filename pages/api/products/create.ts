import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const {name, price, quantity, categoryId} = req.body
    console.log(req.body)
    try{
        await prisma.product.create({
            data:{
                name,
                price,
                quantity,
                categoryId
            }
        }).then(()=>{
            res.status(200).json({message: 'product created'})

        })
    }  catch(error){
        console.log('filure');
    }  
}