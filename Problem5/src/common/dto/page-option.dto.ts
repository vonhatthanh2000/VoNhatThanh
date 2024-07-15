import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortDirection } from '../enums';

export class PageOptionsDto {
  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  sort?: string | null;

  @ApiPropertyOptional({ enum: SortDirection, nullable: true })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection | null;

  @ApiProperty({ minimum: 1, example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ minimum: 1, maximum: 50, example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  take: number;

  get skip(): number {
    return this.page === 1 ? 0 : (this.page - 1) * this.take;
  }
}
