import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }

  @IsArray()
  data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}
