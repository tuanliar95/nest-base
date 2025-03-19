import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
class Address {
  country: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
}
export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiPropertyOptional({
    example: ['admin'],
    description: 'Roles of user',
    default: ['user'],
  })
  roles: string[];
}
export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user123', description: 'Unique user ID' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiPropertyOptional({
    example: ['admin'],
    description: 'Roles of user',
    default: ['user'],
  })
  roles: string[];
  @ApiPropertyOptional({
    example: 'string',
    description: 'address of user',
  })
  address: Address;
  @ApiPropertyOptional({
    example: 'position',
    description: 'position of user',
  })
  position: string;
  @ApiPropertyOptional({
    example: 'firstName',
    description: 'firstName of user',
  })
  firstName: string;
  @ApiPropertyOptional({
    example: 'lastName',
    description: 'lastName of user',
  })
  lastName: string;
  @ApiPropertyOptional({
    example: 'phoneNumber',
    description: 'phoneNumber of user',
  })
  phoneNumber: string;
  @ApiPropertyOptional({
    example: 'description',
    description: 'description of user',
  })
  description: string;
  @ApiPropertyOptional({
    example: 'socialF',
    description: 'social Facebook of user',
  })
  socialF: string;
  @ApiPropertyOptional({
    example: 'socialF',
    description: 'social linkdin  of user',
  })
  socialL: string;
  @ApiPropertyOptional({
    example: 'socialX',
    description: 'social x  of user',
  })
  socialX: string;
  @ApiPropertyOptional({
    example: 'socialT',
    description: 'social telegram  of user',
  })
  socialT: string;
  @ApiPropertyOptional({
    example: false,
    description: 'enable2Fa  for user',
    default: false,
  })
  enable2Fa: boolean;
}
export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;
  @ApiProperty({ example: 'string', description: 'password ' })
  password: string;
}
