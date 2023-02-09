import { prisma } from "./../../../lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

type Data = {
  email: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email }: Data = req.body;
  if (req.method === "POST") {
    try {
      const customer = await prisma.customer.findUnique({
        where: {
          email,
        },
      });
      if (!customer)
        return res.status(404).json({ error: "user doesn't exist" });
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(400).json({ error: "Invalid Method" });
  }
}
