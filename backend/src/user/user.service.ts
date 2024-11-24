import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async registerUser(dto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    // Save user to DB (adjust for your ORM)
    return { ...dto, password: hashedPassword };
  }

  async loginUser(dto: LoginUserDto) {
    const user: User = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10), // Mocked hashed password
    };

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return { accessToken: this.jwtService.sign(payload) }; // Use JwtService to generate token
  }
}
