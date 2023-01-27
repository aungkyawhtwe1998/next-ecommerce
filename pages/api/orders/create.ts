import { prisma } from './../../../lib/prisma';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    const {orderId, productId,productName, productCount, productPrice, customerId} = req.body

    if(req.method === 'POST'){
        try {
            await prisma.order.create({
                data:{
                    orderId,
                    productId,
                    productCount,
                    productName,
                    productPrice,
                    customerId
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