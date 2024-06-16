import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User) private readonly _repository: Repository<User>,
  ) {}

  findAllAsync() {
    return this._repository.find();
  }

  findOneByIdAsync(id: number) {
    return this._repository.findOneBy({ id });
  }

  findOneByUserName(userName: string): Promise<User> {
    return this._repository.findOneBy({ userName });
  }

  findOneByRefreshToken(refreshToken: string): Promise<User> {
    return this._repository.findOneBy({ refreshToken });
  }

  async removeAsync(user: User) {
    await this._repository.remove(user);
  }

  async saveAsync(user: User) {
    await this._repository.save(user);
  }

  existsByUsername(userName: string) {
    return this._repository.existsBy({ userName });
  }
}
