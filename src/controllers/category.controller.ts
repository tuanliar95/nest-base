/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { CreateCategoryDto, DeleteMultiDto, Paging } from './dto';
import { CategoryService } from 'src/services';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  async createCategory(@Body() body: CreateCategoryDto) {
    await this.categoryService.createCategory(body);
    return { message: 'Category created successfully' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getCategory(@Param('id') id: string) {
    const category = await this.categoryService.getCategory(id);
    return category ? category : { message: 'Category not found' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async updateCategory(
    @Param('id') id: string,
    @Body() body: Partial<CreateCategoryDto>,
  ) {
    await this.categoryService.updateCategory(id, body);
    return { message: 'Category updated successfully' };
  }

  @Delete()
  @ApiOperation({ summary: 'Delete  categories' })
  @ApiBody({ type: DeleteMultiDto })
  @ApiResponse({ status: 200, description: 'Categories deleted successfully' })
  async deleteCategory(@Body('ids') ids: string[]) {
    await this.categoryService.deleteCategories(ids);
    return { message: 'Categories deleted successfully' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  async getAllCategory(@Param() params: Paging) {
    return await this.categoryService.getAllCategories(params);
  }
}
