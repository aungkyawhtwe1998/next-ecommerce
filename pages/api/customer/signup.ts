import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { Customer } from "../../../type";
import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.body.values)
  const { name, email, password, passcode }: Customer = req.body.values;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  if (req.method === "POST") {
    try {
      const customerExist = await prisma.customer.findUnique({
        where: { email },
      });
      if (customerExist) {
        return res.status(404).json({ error: "User has already existed" });
      }
      const customer = await prisma.customer.create({
        data: {
          name,
          email,
          password: hashedPassword,
          passcode: Number(passcode),
        },
      });
      res.status(201).json(customer);
    } catch (err) {
      res.json(err);
    }
  } else {
    return res.status(400).json({ message: "Invalid Method" });
  }
}
