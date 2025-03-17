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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryService } from 'src/services';
import { CreateCategoryDto, DeleteMultiDto, Paging } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiBearerAuth('access-token')
@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  async createCategory(@Body() body: CreateCategoryDto) {
    await this.categoryService.createCategory(body);
    return { message: 'Category created successfully' };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getCategory(@Param('id') id: string) {
    const category = await this.categoryService.getCategory(id);
    return category ? category : { message: 'Category not found' };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
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
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete  categories' })
  @ApiBody({ type: DeleteMultiDto })
  @ApiResponse({ status: 200, description: 'Categories deleted successfully' })
  async deleteCategory(@Body('ids') ids: string[]) {
    await this.categoryService.deleteCategories(ids);
    return { message: 'Categories deleted successfully' };
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  async getAllCategory(@Param() params: Paging) {
    return await this.categoryService.getAllCategories(params);
  }
}
