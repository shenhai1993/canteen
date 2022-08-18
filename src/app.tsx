// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
import { history } from '@umijs/max';
import type { PermissionsType, UserType } from 'typings';
import { loopMenu, MyRootProvider, requestConfig } from './cc';
import { me } from './services/AuthController';

export async function getInitialState(): Promise<{
  name: string;
  auth: any;
  user?: UserType;
  permissions?: PermissionsType;
}> {
  const res = await me();
  console.log('getInitialState', res);
  if (res.code === 0) {
    return {
      auth: res.data,
      name: res.data.user.username,
      user: res.data.user,
      permissions: res.data.permissions,
    };
  } else {
    return { name: '未登录', auth: {}, user: undefined };
  }
}

export const layout = ({ initialState }: any) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: '智慧食堂后台管理系统',
    layout: 'mix',
    menu: {
      locale: false,
      params: initialState,
      request: async () => {
        return loopMenu(initialState?.permissions?.children, true);
      },
    },
    logout: () => {
      localStorage.clear();
      history.push('/login');
    },
  };
};

export const request = requestConfig;

export function rootContainer(container: any) {
  return <MyRootProvider container={container} />;
}
