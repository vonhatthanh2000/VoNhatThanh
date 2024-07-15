import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ResourceType } from 'src/common/enums';
import { AuthPayloadResponse } from 'src/modules/auth/dto';

@Exclude()
export class ResourceResponse {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Introduction to Databases' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'A comprehensive guide to understanding databases' })
  @Expose()
  description: string;

  @ApiProperty({ example: ResourceType.VIDEO, enum: ResourceType })
  @Expose()
  type: ResourceType;

  @ApiProperty()
  @Expose()
  @Type(() => AuthPayloadResponse)
  creator: AuthPayloadResponse;
}
