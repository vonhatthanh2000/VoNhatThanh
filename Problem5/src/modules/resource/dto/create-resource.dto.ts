import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ResourceType } from 'src/common/enums';

export class CreateResourceDto {
  @ApiProperty({ example: 'Introduction to Databases' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'A comprehensive guide to understanding databases' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: ResourceType.VIDEO, enum: ResourceType })
  @IsEnum(ResourceType)
  type: ResourceType;
}
