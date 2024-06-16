import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/user.module';
import { AuthProviders } from './auth.providers';

@Module({
  controllers: [AuthController],
  providers: [...AuthProviders],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class AuthModule {}
