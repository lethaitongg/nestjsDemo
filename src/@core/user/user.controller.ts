import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  Inject,
} from '@nestjs/common';
import { UsersService } from './service/user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { IUsersService } from './service/user.service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(IUsersService) private readonly _usersService: UsersService,
  ) {}

  @Post()
  async register(@Body() registerDto: RegisterDto) {
    return this._usersService.register(registerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this._usersService.update(+id, updateUserDto);
  }
}
