import { BookDto } from './book.dto';
import { ArrayContains, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedBooksResultDto {
  @IsArray()
  @ApiProperty()
  items: BookDto[];

  @IsInt()
  @ApiProperty()
  totalCount: number;
}
