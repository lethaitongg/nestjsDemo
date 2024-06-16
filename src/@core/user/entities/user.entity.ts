import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Profile } from './profile.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  refreshTokenExpiredDay?: Date;

  @Column()
  isDisabled: boolean;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  constructor(
    firstName?: string,
    lastName?: string,
    userName?: string,
    password?: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.isDisabled = false;
  }
}
