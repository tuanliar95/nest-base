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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto, DeleteMultiDto, Paging } from './dto';
import { ProductService } from 'src/services';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async createProduct(@Body() body: CreateProductDto) {
    await this.productService.createProduct(body);
    return { message: 'Product created successfully' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    return product ? product : { message: 'Product not found' };
  }

  @Put(':id')
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
  @ApiOperation({ summary: 'Delete  products' })
  @ApiBody({ type: DeleteMultiDto })
  @ApiResponse({ status: 200, description: 'Products deleted successfully' })
  async deleteProducts(@Body('ids') ids: string[]) {
    await this.productService.deleteProducts(ids);
    return { message: 'Product deleted successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getAllProducts(@Param() params: Paging) {
    return await this.productService.getAllProducts(params);
  }
}
