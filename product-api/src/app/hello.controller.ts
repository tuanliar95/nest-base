/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard, JwtAuthGuard } from '@shared/guards';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos';
import { DeleteMultiDto, Paging } from '@shared/dtos';


@Controller('hello')
export class HelloController {
    constructor(private readonly productService: ProductService) { }
    @Get()
    @ApiOperation({ summary: 'Hello' })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    async hello() {
        return await this.productService.getData();
    }
}
