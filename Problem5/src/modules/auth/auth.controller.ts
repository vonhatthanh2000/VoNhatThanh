import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthPayloadResponse, LoginDto, RegisterDto } from './dto';
import { IAccessToken } from 'src/common/interfaces/jwt.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'database/entities/user.entity';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<AuthPayloadResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<IAccessToken> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async me(@CurrentUser() user: User): Promise<AuthPayloadResponse> {
    return this.authService.me(user.id);
  }
}
