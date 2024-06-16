import { UsersRepository } from './repository/user.repository';
import { IUsersRepository } from './repository/user.repository.interface';
import { UsersService } from './service/user.service';
import { IUsersService } from './service/user.service.interface';
import { Provider } from '@nestjs/common';

export const userproviders: Provider[] = [
  {
    provide: IUsersService,
    useClass: UsersService,
  },
  {
    provide: IUsersRepository,
    useClass: UsersRepository,
  },
];
