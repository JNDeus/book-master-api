import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryBookDto {
  @IsString()
  @ApiProperty({ required: false })
  busca: string;

  @IsInt()
  @ApiProperty({ required: false })
  anoInicial: number;

  @IsInt()
  @ApiProperty({ required: false })
  anoFinal: number;

  @IsString()
  @ApiProperty({ required: false })
  sorting: string;

  @IsInt()
  @ApiProperty({ required: false })
  maxResultCount: number;

  @IsInt()
  @ApiProperty({ required: false })
  skipCount: number;
}
