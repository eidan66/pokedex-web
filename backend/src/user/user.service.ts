import {
  ConflictException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User as EUser } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(EUser)
    private userRepository: Repository<EUser>,
  ) {}

  async registerUser(dto: RegisterUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('A user with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = this.userRepository.create({
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(user);

      const payload = { fullName: savedUser.fullName, sub: savedUser.id };
      const accessToken = this.jwtService.sign(payload);

      return {
        user: {
          id: savedUser.id,
          fullName: savedUser.fullName,
          email: savedUser.email,
        },
        accessToken,
      };
    } catch (error) {
      const { message, statusCode } = error.response || {};
      if ((error.code || statusCode) === '23505') {
        throw new ConflictException('A user with this email already exists');
      }

      throw new HttpException(
        message || 'Internal Server Error',
        statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
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
