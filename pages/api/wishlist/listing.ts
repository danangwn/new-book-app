import { PrismaClient } from "@prisma/client";
import Axios from 'axios';

const prisma = new PrismaClient();

export async function listing() {
  try {
    const resArr = [];
    let HttpClient = Axios.create();
    const wishlist = await prisma.wishlist.findMany();
    if (wishlist.length > 0) {
        for (const wish of wishlist) {
          try {
            const result = await HttpClient.get(`https://www.googleapis.com/books/v1/volumes/${wish.book_id}`, {});
            const book = result.data ? result.data : null;

            if (book) {
              const pushData = {
                id: wish.id,
                bookId: book.id, 
                title: book.volumeInfo ? book.volumeInfo.title : '',
                photo: book.volumeInfo && book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
                author: book.volumeInfo && book.volumeInfo.authors ? book.volumeInfo.authors.toString() : '',
                reting: 10,
                addedDate: wish.added_date,
              };
    
              resArr.push(pushData);
            }
          } catch (e) {}
        }
      }
    return resArr;
  } catch (err) {
    console.log(err);
  }
};
