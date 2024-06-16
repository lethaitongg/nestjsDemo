import { RegisterDto } from '../dto/register.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  register(registerDto: RegisterDto): Promise<void>;
  findOne(id: number): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
}

export const IUsersService = Symbol('IUsersService');
