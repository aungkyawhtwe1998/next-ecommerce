import { prisma } from './../../../lib/prisma';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    const {orderId, productId,productName, productCount, productPrice} = req.body

    if(req.method === 'POST'){
        try {
            await prisma.orderItem.create({
                data:{
                    orderId,
                    productName,
                    productPrice,
                    productCount,
                    productId
                }
            });
            res.status(200).json({message:'order success'})
    
        } catch (error) {
            return res.status(400).json({ message: error });
        }  
    }else{
        return res.status(400).json({ message: 'Invalid Method!' });

    }
      
}