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
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { Request } from 'express';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
// @UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<Book[]> {
    return await this.booksService.findAll(req.query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<Book | string> {
    return await this.booksService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() newBook: BookDto): Promise<Book> {
    return await this.booksService.create(newBook);
  }


  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updatedBook: BookDto): Promise<Book> {
    return await this.booksService.update(id, updatedBook);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string): Promise<Book> {
    return await this.booksService.delete(id);
  }
}
