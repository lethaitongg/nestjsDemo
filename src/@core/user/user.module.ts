import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IUsersRepository } from './repository/user.repository.interface';
import { userproviders } from './user.providers';
import { Profile } from './entities/profile.entity';

@Module({
  controllers: [UsersController],
  providers: [...userproviders],
  imports: [TypeOrmModule.forFeature([User, Profile])],
  exports: [IUsersRepository],
})
export class UsersModule {}
