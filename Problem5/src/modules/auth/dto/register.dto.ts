import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Thanh Vo' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'nthanhatee@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12345678' })
  password: string;
}
