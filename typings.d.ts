import '@/cc/typings';
import '@umijs/max/typings';

export type AuthType = {
  user?: UserType;
  permissions?: PermissionsType;
  token?: TokenType;
};

export type UserType = {
  id: number;
  username: string;
  avatar: string;
};

export type PermissionsType = {
  name: string;
  path: string;
  children: PermissionsType[];
  icon: string;
  id: number;
  parent_id: number;
  title: string;
  type: string;
  url: string;
};

export type TokenType = {
  token_key: string;
  access_token: string;
  expired_at?: Date;
};
