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
import { Book } from './book.class';
import { BookDto } from './book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  findAll(@Req() req: Request): Book[] {
    return this.booksService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book | string {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() newBook: BookDto): Book {
    return this.booksService.create(newBook);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedBook: BookDto): Book | string {
    return this.booksService.update(id, updatedBook);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Book | string {
    return this.booksService.delete(id);
  }
}
