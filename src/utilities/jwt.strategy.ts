import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extraemos el token del header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'my_secret_key',
    });
  }

  // Se ejecuta automaticamente despues de verificar la firma del token
  async validate(payload: any): Promise<any> {
    if (!payload) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }

    // Lo que retornemos aqui queda disponible en req.user
    return payload;
  }
}

