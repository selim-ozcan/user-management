import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', enum: Role, default: Role.User })
  role: Role;
}
