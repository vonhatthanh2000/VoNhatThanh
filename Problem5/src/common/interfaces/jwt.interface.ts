import { Request } from 'express';
import { UserRole } from '../enums';

export interface AuthPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface IAccessToken {
  accessToken: string;
}

export interface RequestWithAuth extends Request {
  user: AuthPayload;
}
