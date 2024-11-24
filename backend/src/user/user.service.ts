import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async registerUser(dto: RegisterUserDto) {
    const id = uuidv4();

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user: User = {
      id,
      fullName: dto.fullName,
      email: dto.email,
      password: hashedPassword,
    };

    const payload = { fullName: user.fullName, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    };
  }

  async loginUser(dto: LoginUserDto) {
    const user: User = {
      id: uuidv4(),
      fullName: 'testuser',
      email: 'test@example.com',
      password: await bcrypt.hash('Password123', 10),
    };

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { fullName: user.fullName, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    };
  }
}
