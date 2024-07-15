import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from 'src/common/enums';

export class FilterResource {
  @ApiProperty({ required: false, example: '' })
  searchName: string;

  @ApiProperty({
    required: false,
    example: ResourceType.VIDEO,
    enum: ResourceType,
  })
  type: ResourceType;
}
