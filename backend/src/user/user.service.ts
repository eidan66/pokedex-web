import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

interface User {
  id: string; // Change ID type to string for UUID
  fullName: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async registerUser(dto: RegisterUserDto) {
    // Generate a unique ID
    const id = uuidv4();

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Mocked user creation (Replace with your database logic)
    const user: User = {
      id,
      fullName: dto.fullName,
      email: dto.email,
      password: hashedPassword,
    };

    // Generate JWT payload and sign token
    const payload = { fullName: user.fullName, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    // Return the user data and token to the client
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
    // Mocked user data (Replace with your database logic)
    const user: User = {
      id: uuidv4(), // Use the same ID generation logic if mocking
      fullName: 'testuser',
      email: 'test@example.com',
      password: await bcrypt.hash('Password123', 10),
    };

    // Validate the user credentials
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT payload and sign token
    const payload = { fullName: user.fullName, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    // Return the user data and token to the client
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
