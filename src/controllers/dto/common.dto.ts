import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class Paging {
  @ApiProperty({ example: 1, description: 'current page' })
  page: number;
  @ApiProperty({ example: 50, description: 'items per page' })
  limit: number;
  @ApiProperty({ example: '-createdAt', description: 'order by' })
  sort: string;
  @ApiProperty({ example: '', description: 'search by' })
  keyword: string;
}
export class DeleteMultiDto {
  @ApiProperty({ example: [v4()], description: 'Unique  ID' })
  ids: string[];
}
