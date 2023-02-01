import { prisma } from './../../../lib/prisma';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
interface reqBodyType {
    orderId: string;
    customerId: number;
    orderItems: OrderItem[];
  }

interface OrderItem{
    name: string;
    orderId:string,
    price:number,
    count:number,
    id:number,
                
}
export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    const {orderId,customerId,orderItems}:reqBodyType = req.body
    if(req.method === 'POST'){
        try {
            const createdOrder = await prisma.order.create({
                data:{
                    orderId,
                    customerId,
                    status:'pending'
                }
            });
            if(createdOrder){
                const orderItemArray = orderItems.map((i)=>({
                    orderId:createdOrder.id,
                    productName:i.name,
                    productPrice:i.price,
                    productCount:i.count,
                    productId:i.id,
                }));
                console.log('order item',orderItemArray)
                const createdOrderItems = await prisma.orderItem.createMany({
                    data:orderItemArray,
                })
                if(createdOrderItems){
                    res.status(200).json({message:'order success'})
                }
            }
    
        } catch (error) {
            return res.status(400).json({ message: error });
        }  
    }else{
        return res.status(400).json({ message: 'Invalid Method!' });

    }
      
}