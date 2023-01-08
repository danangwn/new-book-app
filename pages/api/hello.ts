import type { NextApiRequest, NextApiResponse } from 'next'
import Axios from 'axios';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

export async function listing(key?: string){
  try {
    let HttpClient = Axios.create();
    let result = await HttpClient.get(`https://www.googleapis.com/books/v1/volumes?q=${key}`, {});
    const books = result.data ? result.data.items : null;
    const resArr = [];

    if (books && books.length > 0) {
      for (const book of books) {
        
        const pushData = {
          bookId: book.id, 
          title: book.volumeInfo ? book.volumeInfo.title : '',
          photo: book.volumeInfo && book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
          author: book.volumeInfo && book.volumeInfo.authors ? book.volumeInfo.authors.toString() : '',
          reting: 10,
        };

        resArr.push(pushData);
      }
    }
    return resArr;
  } catch (e) {
    throw e;
  }
}
