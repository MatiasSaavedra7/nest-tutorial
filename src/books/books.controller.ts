import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { Request } from 'express';
import { BookDto } from './book.dto';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Book[]> {
    return await this.booksService.findAll(req.query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | string> {
    return await this.booksService.findOne(id);
  }

  @Post()
  async create(@Body() newBook: BookDto): Promise<Book> {
    return await this.booksService.create(newBook);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedBook: BookDto): Promise<Book> {
    return await this.booksService.update(id, updatedBook);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Book> {
    return await this.booksService.delete(id);
  }
}
