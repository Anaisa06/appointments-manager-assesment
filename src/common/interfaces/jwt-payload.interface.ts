import { Role } from '../enums/role.enum';

export interface IJwtPayload {
  id: number;
  email: string;
  name: string;
  role: Role;
}
