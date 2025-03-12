import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user123', description: 'Unique user ID' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;
}
