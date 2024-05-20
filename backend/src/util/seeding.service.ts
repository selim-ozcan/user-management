import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';
import { User } from 'src/users/entities/user.entity';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async seedAdmin() {
    const admins = await this.entityManager.findBy(User, { role: Role.Admin });

    if (admins.length === 0) {
      const admin = new User();
      admin.username = 'admin';
      admin.firstName = 'admin';
      admin.lastName = 'admin';
      admin.password = await bcrypt.hash('Pass123?', 10);
      admin.role = Role.Admin;

      this.entityManager.save(admin);
    }
  }
}
