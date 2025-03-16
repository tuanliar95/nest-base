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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';
import { CreateUserDto, DeleteMultiDto, Paging, ResponseListDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() body: { name: string; email: string }) {
    await this.userService.createUser({
      name: body.name,
      email: body.email,
    });
    return { message: 'User created successfully' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    return user ? user : { message: 'User not found' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<CreateUserDto>,
  ) {
    await this.userService.updateUser(id, body);
    return { message: 'User updated successfully' };
  }

  @Delete()
  @ApiOperation({ summary: 'Delete  users' })
  @ApiBody({ type: DeleteMultiDto })
  @ApiResponse({ status: 200, description: 'Users deleted successfully' })
  async deleteUsers(@Body('ids') ids: string[]) {
    await this.userService.deleteUsers(ids);
    return { message: 'User deleted successfully' };
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: ResponseListDto,
  })
  async getAllUsers(@Query() params: Paging) {
    const userRes = await this.userService.getAllUsers(params);
    return {
      code: 200,
      message: 'Users retrieved successfully',
      data: userRes,
    };
  }
}
