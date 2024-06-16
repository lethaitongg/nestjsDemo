import { Provider } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { IAuthService } from './service/auth.service.interface';

export const AuthProviders: Provider[] = [
  {
    provide: IAuthService,
    useClass: AuthService,
  },
];
