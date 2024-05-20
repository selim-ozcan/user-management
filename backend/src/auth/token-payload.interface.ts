import { Role } from './enums/role.enum';

export interface TokenPayload {
  id: number;
  username: string;
  role: Role;
}
