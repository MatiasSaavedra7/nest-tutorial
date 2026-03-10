import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.class';

@Injectable()
export class BooksService {

  books: Book[] = [
    {
      id: 1,
      title: 'Una historia de España',
      genre: 'Historia',
      description:
        'Un relato ameno, personal, a ratos irónico, pero siempre único, de nuestra accidentada historia a través de los siglos. Una obra concebida por el autor para, en palabras suyas, «divertirme, releer y disfrutar; un pretexto para mirar atrás desde los tiempos remotos hasta el presente, reflexionar un poco sobre ello y contarlo por escrito de una manera poco ortodoxa.',
      author: 'Arturo Pérez-Reverte',
      publisher: 'Alfaguara',
      pages: 256,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/41%2B-e981m1L._SX311_BO1,204,203,200_.jpg',
    },
    {
      id: 2,
      title: 'Historia de España contada para escépticos',
      genre: 'Historia',
      description:
        'Como escribe el autor, no pretende ser veraz, justa y desapasionada, porque ninguna historia lo es. No está hecha para halagar a reyes y gobernantes, ni pretende halagar a los banqueros, ni a la Conferencia Episcopal, ni al colectivo gay.',
      author: 'Juan Eslava Galán',
      publisher: 'Booket',
      pages: 592,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/51IyZ5Mq8YL._SX326_BO1,204,203,200_.jpg',
    }
  ]

  findAll(params: any): Book[] { 
    // let msg = `Method findAll() of BooksService working. Parameters: `;

    // if (params.order !== undefined) {
    //   msg += `order: ${params.order},`;
    // }

    // if (params.page !== undefined) {
    //   msg += `page: ${params.page},`;
    // }

    // if (params.limit !== undefined) {
    //   msg += `limit: ${params.limit},`;
    // }

    // if (params.search !== undefined) {
    //   msg += `search: ${params.search}`;
    // }

    // return msg;
    return this.books;
  }

  findOne(id: string): Book | string {
    let book = this.books.find(book => book.id === Number(id));
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  create(newBook: BookDto): Book {
    let book = new Book();

    book.id = this.books.length + 1;
    book.title = newBook.title;
    book.genre = newBook.genre;
    book.description = newBook.description;
    book.author = newBook.author;
    book.publisher = newBook.publisher;
    book.pages = newBook.pages;
    book.image_url = newBook.image_url;

    this.books.push(book);
    return book;
  }

  update(id: string, updatedBook: BookDto): Book | string {
    let book = this.books.find(book => book.id === Number(id));
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    if (book) {
      book.title = updatedBook.title;
      book.genre = updatedBook.genre;
      book.description = updatedBook.description;
      book.author = updatedBook.author;
      book.publisher = updatedBook.publisher;
      book.pages = updatedBook.pages;
      book.image_url = updatedBook.image_url;
    }
    return book;
  }

  delete(id: string): Book | string {
    let book = this.books.find(book => book.id === Number(id));
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books = this.books.filter(book => book.id !== Number(id));
    return book;
  }
}
