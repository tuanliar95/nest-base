/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';
import { CreateUserDto, DeleteMultiDto, Paging, ResponseListDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() body: CreateUserDto) {
    const existingUser = await this.userService.findOne(body.email, true);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    } else {
      const { id: userId, ...payload } = body;
      await this.userService.createUser(payload);
      return { message: 'User created successfully' };
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    return user ? user : { message: 'User not found' };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<CreateUserDto>,
  ) {
    const { id: userId, ...payload } = body;
    await this.userService.updateUser(id, payload);
    return { message: 'User updated successfully' };
  }

  @Delete()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete  users' })
  @ApiBody({ type: DeleteMultiDto })
  @ApiResponse({ status: 200, description: 'Users deleted successfully' })
  async deleteUsers(@Body('ids') ids: string[]) {
    await this.userService.deleteUsers(ids);
    return { message: 'User deleted successfully' };
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
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
