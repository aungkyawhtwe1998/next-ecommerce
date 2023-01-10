import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../lib/prisma";
export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try{
        await prisma.category.findMany().then((response)=>{
            res.status(200).json(response)
        })
    }  catch(error){
        console.log('filure');
    }  
}