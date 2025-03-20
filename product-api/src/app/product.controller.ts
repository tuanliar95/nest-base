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


@ApiBearerAuth('access-token')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async createProduct(@Body() body: CreateProductDto) {
    await this.productService.createProduct(body);
    return { message: 'Product created successfully' };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    return product ? product : { message: 'Product not found' };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  async updateProduct(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>,
  ) {
    await this.productService.updateProduct(id, body);
    return { message: 'Product updated successfully' };
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete  products' })
  @ApiBody({ type: DeleteMultiDto })
  @ApiResponse({ status: 200, description: 'Products deleted successfully' })
  async deleteProducts(@Body('ids') ids: string[]) {
    await this.productService.deleteProducts(ids);
    return { message: 'Product deleted successfully' };
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getAllProducts(@Param() params: Paging) {
    return await this.productService.getAllProducts(params);
  }
}
