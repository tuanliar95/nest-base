/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class CreateCategoryDto {
  @ApiPropertyOptional({ example: v4(), description: 'Unique Category ID' })
  id: string;

  @ApiProperty({ example: 'Clother', description: 'Name' })
  name: string;
  @ApiProperty({ example: 'XXYAL', description: 'Code' })
  code: string;

  @ApiProperty({
    example: true,
    description: 'active or inactive',
    default: true,
  })
  active: boolean;
}
