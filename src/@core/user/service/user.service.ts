import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { IUsersRepository } from '../repository/user.repository.interface';
import { IUsersService } from './user.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(IUsersRepository)
    private readonly _userRepository: IUsersRepository,
  ) {}

  async register(registerDto: RegisterDto) {
    const isExisted = await this._userRepository.existsByUsername(
      registerDto.userName,
    );

    if (isExisted) {
      throw new ConflictException('This username is existed');
    }

    const hashedPassword = await this.hashPassword(registerDto.password);
    const user = new User(
      registerDto.firstName,
      registerDto.lastName,
      registerDto.userName,
      hashedPassword,
    );

    return this._userRepository.saveAsync(user);
  }

  async findOne(id: number) {
    const user = await this._userRepository.findOneByIdAsync(id);

    if (!user) {
      throw new NotFoundException(`Not found user have id ${id}`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    for (const field in updateUserDto) {
      user[field] = updateUserDto[field];
    }

    this._userRepository.saveAsync(user);
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
