import { User } from 'src/@core/user/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';

export interface IAuthService {
  logIn(loginDto: LoginDto): Promise<{ accessToken: string; user: User }>;

  getProfile(userId: number): Promise<{
    firstName: string;
    lastName: string;
    dob: Date;
    address: string;
  }>;

  logOut(refreshToken: string): Promise<void>;

  setRefreshTokenCookie(user: User, response: Response): void;

  revokeToken(refreshToken: string): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
