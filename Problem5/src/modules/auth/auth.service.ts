import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'database/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthPayloadResponse, LoginDto, RegisterDto } from './dto';
import { AuthPayload, IAccessToken } from 'src/common/interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto): Promise<AuthPayloadResponse> {
    const user = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(dto.password, salt);

      const userInput = await this.userRepository.create({
        ...dto,
        password: hashPassword,
      });

      const savedUser = this.userRepository.save(userInput);

      return plainToInstance(AuthPayloadResponse, savedUser);
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async login(loginDto: LoginDto): Promise<IAccessToken> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new BadRequestException('Email is not registered');
    }
    const authen = await bcrypt.compare(loginDto.password, user.password);

    if (!authen) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = await this.getPayloadByEmail(loginDto.email);

    return this.generateAccessToken(payload);
  }

  async getPayloadByEmail(email: string): Promise<AuthPayload> {
    const userData = await this.userRepository.findOneByOrFail({
      email,
    });

    return {
      email: userData.email,
      id: userData.id,
      role: userData.role,
    };
  }

  async me(id: string): Promise<AuthPayloadResponse> {
    const user = await this.userRepository.findOneByOrFail({ id });

    return plainToInstance(AuthPayloadResponse, user);
  }

  generateAccessToken(payload: AuthPayload): IAccessToken {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
