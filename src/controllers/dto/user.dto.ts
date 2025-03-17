import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
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
