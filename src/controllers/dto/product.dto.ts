import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class CreateProductDto {
  @ApiProperty({ example: v4(), description: 'Unique Product ID' })
  id: string;

  @ApiProperty({ example: 'Que', description: 'Name' })
  name: string;

  @ApiProperty({
    example: 'daaa',
    description: 'type of Product',
  })
  type: string;
  @ApiProperty({
    example: v4(),
    description: 'category',
  })
  categoryId: string;
  @ApiProperty({
    example: 'Black',
    description: 'color',
  })
  color: string;
  @ApiProperty({
    example: 'Black and White',
    description: 'list color',
  })
  colors: string[];
  @ApiProperty({
    example: 'Male',
    description: 'Male, Female or Unisex',
  })
  sex: string;
  @ApiProperty({
    example: '20000',
    description: 'price',
  })
  price: number;
  @ApiProperty({
    example:
      'Look like a visionary CEO and wear the same black t-shirt every day.',
    description: 'description',
  })
  description: string;
  @ApiProperty({
    example: [v4()],
    description: 'list images',
  })
  images: string[];
  @ApiProperty({
    example: 12,
    description: 'sum reviews',
  })
  reviews: number;
  @ApiProperty({
    example: 2,
    description: 'rating of product',
  })
  rating: number;
  @ApiProperty({
    example: 10,
    description: 'size of product',
  })
  size: number;
  @ApiProperty({
    example: true,
    description: 'active or inactive',
  })
  active: boolean;
  @ApiProperty({
    example: v4(),
    description: 'parent product',
  })
  parentId: string;
}
