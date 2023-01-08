import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
    message: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await prisma.wishlist.delete({
        where: { id: req.body.id},
    });
    res.status(200).json({ message: 'done' });
    return 'Note created';
    } catch (e) {
        res.status(400).json({ message: e });
    }
}