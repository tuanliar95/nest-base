import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class Paging {
  @ApiProperty({ example: 1, description: 'current page' })
  page: number;
  @ApiProperty({ example: 50, description: 'items per page' })
  limit: number;
  @ApiProperty({ example: '-createdAt', description: 'order by' })
  sort: string;
  @ApiPropertyOptional({ example: '', description: 'search by' })
  keyword: string;
}
export class DeleteMultiDto {
  @ApiProperty({ example: [v4()], description: 'Unique  ID' })
  ids: string[];
}
export class ResponseListDto<T> {
  @ApiProperty({ example: 200, description: 'code' })
  code: number;
  @ApiProperty({ example: 'Success', description: 'message' })
  message: string;

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
  count: number;
  totalPages: number;
  page: number;
  limit: number;
  rows?: T[];
}
