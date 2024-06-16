import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class Profile extends BaseEntity {
  //TODO
  @Column()
  address: string;

  @Column()
  dob: Date;

  constructor(address?: string, dob?: Date) {
    super();
    this.address = address;
    this.dob = dob;
  }
}
