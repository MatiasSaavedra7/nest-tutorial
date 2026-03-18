import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Modulos
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
// Configuracion del ORM
import { configService } from './config/config.service';

@Module({
  imports: [
    BooksModule,
    UsersModule,
    TypeOrmModule.forRoot(
      configService.getTypeOrmConfig(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
