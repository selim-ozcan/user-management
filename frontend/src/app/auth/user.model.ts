import { Role } from './role.enum';

export class User {
  username: string;
  id: number;
  role: Role;
  firstName: string;
  lastName: string;
  password?: string;

  constructor() {}
}
