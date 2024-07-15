import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserRole } from 'src/common/enums';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
