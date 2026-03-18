import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>
  ) {}

  async findAll(params: any): Promise<Book[]> { 
    return this.booksRepository.find();
  }

  async findOne(id: string): Promise<Book | string> {
    let book = await this.booksRepository.findOne({ where: { id: Number(id) }});

    if (book === null) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    
    return book;
  }

  async create(newBook: BookDto): Promise<Book> {
    return await this.booksRepository.save(newBook);
  }

  async update(id: string, newBook: BookDto): Promise<Book> {
    let toUpdate = await this.booksRepository.findOne({ where: { id: Number(id) }});

    if (toUpdate === null) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    let updated = Object.assign(toUpdate, newBook);
    
    return this.booksRepository.save(updated);
  }

  async delete(id: string): Promise<any> {
    return await this.booksRepository.delete({ id: Number(id) });
  }
}
