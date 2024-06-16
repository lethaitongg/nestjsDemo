import { User } from '../entities/user.entity';

export interface IUsersRepository {
  findOneByIdAsync(id: number): Promise<User>;
  findOneByUserName(userName: string): Promise<User>;
  findOneByRefreshToken(refreshToken: string): Promise<User>;
  findAllAsync(): Promise<User[]>;
  saveAsync(user: User): Promise<void>;
  removeAsync(user: User): Promise<void>;
  existsByUsername(userName: string): Promise<boolean>;
}

export const IUsersRepository = Symbol('IUsersRepository');
