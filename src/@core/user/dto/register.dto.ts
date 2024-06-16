import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}
