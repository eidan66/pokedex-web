import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.userService.loginUser(dto);
  }
}
