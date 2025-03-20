import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 } from 'uuid';
export enum Sex {
  Male = 'Male',
  Female = 'Female',
  Unisex = 'Unisex',
}
export class CreateProductDto {
  @ApiPropertyOptional({ example: v4(), description: 'Unique Product ID' })
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
  @ApiPropertyOptional({
    example: 'Black',
    description: 'color',
  })
  color: string;
  @ApiPropertyOptional({
    example: 'Black and White',
    description: 'list color',
  })
  colors: string[];
  @ApiProperty({
    example: Sex.Unisex,
    description: 'Male, Female or Unisex',
    enum: Sex,
    default: Sex.Unisex,
  })
  sex: Sex;
  @ApiProperty({
    example: '20000',
    description: 'price',
  })
  price: number;
  @ApiPropertyOptional({
    example:
      'Look like a visionary CEO and wear the same black t-shirt every day.',
    description: 'description',
  })
  description: string;
  @ApiPropertyOptional({
    example: [v4()],
    description: 'list images',
  })
  images: string[];
  @ApiPropertyOptional({
    example: 12,
    description: 'sum reviews',
  })
  reviews: number;
  @ApiPropertyOptional({
    example: 2,
    description: 'rating of product',
  })
  rating: number;
  @ApiPropertyOptional({
    example: 10,
    description: 'size of product',
  })
  size: number;
  @ApiProperty({
    example: true,
    description: 'active or inactive',
    default: true,
  })
  active: boolean;
  @ApiPropertyOptional({
    example: v4(),
    description: 'parent product',
  })
  parentId: string;
}
