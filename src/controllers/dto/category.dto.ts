import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class CreateCategoryDto {
  @ApiProperty({ example: v4(), description: 'Unique Category ID' })
  id: string;

  @ApiProperty({ example: 'Clother', description: 'Name' })
  name: string;

  @ApiProperty({
    example: true,
    description: 'active or inactive',
  })
  active: boolean;
}
