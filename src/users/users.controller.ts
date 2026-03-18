import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto, LoginDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }
}
