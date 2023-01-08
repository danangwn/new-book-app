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
    await prisma.wishlist.create({
        data: { book_id: req.body.id, added_date: 'hari ini'},
    });
    res.status(200).json({ message: 'Done' });
    } catch (e) {
        res.status(400).json({ message: e });
    }
}