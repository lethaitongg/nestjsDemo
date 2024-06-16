import { LoginDto } from '../dto/login.dto';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IUsersRepository } from '../../user/repository/user.repository.interface';
import { IAuthService } from './auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUsersRepository)
    private _userRepository: IUsersRepository,
    private _jwtService: JwtService,
  ) {}

  async logIn(loginDto: LoginDto) {
    const user = await this.findByUsernamePassword(loginDto);
    const payload = { sub: user.id, username: user.userName };
    const accessToken = await this._jwtService.signAsync(payload);
    await this.doRefreshToken(user);

    return {
      accessToken,
      user,
    };
  }

  async getProfile(userId: number) {
    const user = await this._userRepository.findOneByIdAsync(userId);

    if (!user) {
      throw new NotFoundException(`Not found user having id ${userId}`);
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.profile.dob,
      address: user.profile.address,
    };
  }

  async logOut(refreshToken: string) {
    if (!refreshToken) {
      return;
    }

    return this.revokeToken(refreshToken);
  }

  private async findByUsernamePassword(loginDto: LoginDto) {
    const { userName, password } = loginDto;
    const incorectPasswordException = new UnauthorizedException(
      'Username or password is incorrect',
    );
    const user = await this._userRepository.findOneByUserName(userName);

    if (!user) {
      throw incorectPasswordException;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw incorectPasswordException;
    }

    return user;
  }

  private async doRefreshToken(user: User) {
    user.refreshToken = this.generateNewRefreshToken();
    user.refreshTokenExpiredDay.setDate(new Date().getDate() + 7);

    return this._userRepository.saveAsync(user);
  }

  private generateNewRefreshToken() {
    const categories = [
      'abcdefghijklmnopqrstuvxyz',
      'ABCDEFGHIJKLMNOPQRSTUVXYZ',
      '0123456789',
      '£$&()*+[]@#^-_!?',
    ];

    const sizeOfToken = 50;

    let token = '';

    for (let i = 0; i < sizeOfToken; i++) {
      const randomCategory = categories[Math.floor(Math.random() * 4)];
      const index = Math.floor(Math.random() * randomCategory.length);
      const randomCharacter = randomCategory.charAt(index);

      token += randomCharacter;
    }

    return token;
  }

  public setRefreshTokenCookie(user: User, response: Response) {
    response.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      expires: user.refreshTokenExpiredDay,
    });
  }

  public async revokeToken(refreshToken: string) {
    const user = await this._userRepository.findOneByRefreshToken(refreshToken);

    if (!user) {
      return;
    }

    user.refreshToken = null;

    return this._userRepository.saveAsync(user);
  }
}
