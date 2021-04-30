import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryBookDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  busca: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ required: false })
  anoInicial: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ required: false })
  anoFinal: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  sorting: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  maxResultCount: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  skipCount: number;
}
