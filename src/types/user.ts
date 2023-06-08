import { Company } from "../entities/company";

export interface IUser {
  id: string;
  name: string;
  password: string;
  isAdm: boolean;
  isStaff: boolean;
  securityAsk: string;
  securityAnswer: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  company: Company;
}

export interface IUserRequest {
  name?: string;
  password?: string;
  isAdm?: boolean;
  securityAsk?: string;
  securityAnswer?: string;
  companyId?: string;
}

export interface IUserLogin {
  name: string;
  password: string;
}

export interface IRecoverPasswordRequest {
  securityAnswer: string;
  newPassword: string;
}
