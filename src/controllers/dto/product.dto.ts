import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class CreateProductDto {
  @ApiProperty({ example: v4(), description: 'Unique Product ID' })
  id: string;

  @ApiProperty({ example: 'Que', description: 'Full name of the Product' })
  name: string;

  @ApiProperty({
    example: 'daaa',
    description: 'Product email address',
  })
  type: string;
  @ApiProperty({
    example: 'Lampo',
    description: 'category',
  })
  category: string;
}
