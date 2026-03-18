import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

require('dotenv').config();

@Module({
  imports: [
    // Registramos la entidad User para que TypeORM pueda usarla
    TypeOrmModule.forFeature([User]),

    // Configuramos el modulo JWT con la clave secreta y expiracion
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  // Exportamos JwtModule para que otros modulos puedan verificar tokens si lo necesitan
  exports: [JwtModule],
})
export class UsersModule {}
