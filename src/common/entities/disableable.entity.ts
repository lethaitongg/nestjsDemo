import { Column } from 'typeorm';

export class DisableableEntity {
  @Column()
  isDisabled: Date;
}
