import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @IsUUID('4')
  @IsOptional()
  id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @Length(13, 13)
  @ApiProperty()
  isbn: string;

  @IsString()
  @ApiProperty()
  author: string;

  @IsString()
  @ApiProperty()
  publisher: string;

  @IsInt()
  @ApiProperty()
  year: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  language: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  weight: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  length: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  width: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  height: number;
}
