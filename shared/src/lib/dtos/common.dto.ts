import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { v4 } from 'uuid';

export class Paging {
    @ApiProperty({ example: 1, description: 'current page', })
    page: number = 1;
    @ApiProperty({ example: 50, description: 'items per page' })
    limit: number = 50;
    @ApiProperty({ example: '-createdAt', description: 'order by' })
    sort: string | undefined;
    @ApiPropertyOptional({ example: '', description: 'search by' })
    keyword: string | undefined;
}
export class DeleteMultiDto {
    @ApiProperty({ example: [v4()], description: 'Unique  ID' })
    ids: string[] = [];
}
export class ResponseListDto<T> {
    @ApiProperty({ example: 200, description: 'code' })
    code!: number;
    @ApiProperty({ example: 'Success', description: 'message' })
    message!: string;

    @ApiPropertyOptional({ description: 'data' })
    data?: {
        count: number;
        totalPages: number;
        page: number;
        limit: number;
        rows?: T[];
    };
}
export class Pagination<T> {
    count!: number;
    totalPages!: number;
    page!: number;
    limit!: number;
    rows?: T[];
}
export class LoginDto {
    @ApiProperty({
        example: 'john@example.com',
        description: 'User email address',
    })
    email!: string;
    @ApiProperty({ example: 'string', description: 'password ' })
    password!: string;
  }
  