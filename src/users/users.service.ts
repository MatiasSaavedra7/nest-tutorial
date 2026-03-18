import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { RegisterDto, LoginDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    // Inyectamos el repositorio de User para acceder a la base de datos
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // Inyectamos JwtService para poder firmar tokens
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ message: string }> {
    // Verificamos que el username no este ya en uso
    const existing = await this.usersRepository.findOne({
      where: { username: dto.username },
    });

    if (existing) {
      throw new HttpException(
        'El nombre de usuario ya está en uso',
        HttpStatus.CONFLICT,
      );
    }

    // Encriptamos la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Creamos y guardamos el nuevo usuario
    const user = this.usersRepository.create({
      username: dto.username,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    return { message: 'Usuario registrado correctamente' };
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    // Buscamos el usuario por username
    const user = await this.usersRepository.findOne({
      where: { username: dto.username },
    });

    if (!user) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Comparamos la contraseña ingresada con el hash almacenado
    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Generamos el JWT con el payload que quedará dentro del token
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
