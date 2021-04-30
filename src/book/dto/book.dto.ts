import { IsInt, IsNumber, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @IsUUID('4')
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
  @ApiProperty({ required: false })
  language: string;

  @IsNumber()
  @ApiProperty({ required: false })
  weight: number;

  @IsNumber()
  @ApiProperty({ required: false })
  length: number;

  @IsNumber()
  @ApiProperty({ required: false })
  width: number;

  @IsNumber()
  @ApiProperty({ required: false })
  height: number;
}
