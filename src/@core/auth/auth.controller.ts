import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { IAuthService } from './service/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService) private readonly _authService: IAuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Req() request: Request) {
    const userId = +request['user'].sub;

    return this._authService.getProfile(userId);
  }

  @Post()
  async logIn(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, user } = await this._authService.logIn(loginDto);

    this._authService.setRefreshTokenCookie(user, response);

    return { accessToken };
  }

  @Delete()
  @HttpCode(HttpStatus.RESET_CONTENT)
  async logOut(@Res({ passthrough: true }) response: Response) {
    await this._authService.logOut(response.cookie['refreshToken']);
    response.clearCookie('refreshToken');
  }
}
