import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryBookDto {
  @IsString()
  @ApiProperty({ required: false })
  busca: string;

  @IsInt()
  @ApiProperty({ required: false })
  anoinicial: number;

  @IsInt()
  @ApiProperty({ required: false })
  anofinal: number;

  @IsString()
  @ApiProperty({ required: false })
  sorting: string;

  @IsInt()
  @ApiProperty({ required: false })
  MaxResultCount: number;

  @IsInt()
  @ApiProperty({ required: false })
  SkipCount: number;
}
