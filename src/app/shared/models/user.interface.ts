export interface LoginModel {
  id: number;
  login: string;
  name: string;
  hash: string;
  salt: string;
  createdAt: Date;
}