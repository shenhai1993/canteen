// https://umijs.org/config/
import { defineConfig } from 'umi';

const env = process.env.REACT_APP_ENV || 'local';
if (!env) throw 'REACT_APP_ENV need to set!!!';

const config = {
  // 开发环境
  local: defineConfig({
    define: {
      'process.env.BASE_URL': '/api/admin/',
      'process.env.TOKEN_NAME': 'ADMIN-TOKEN-LOCAL',
    },
    proxy: {
      '/api': {
        // target: 'https://canteen-test.sxkj.info/',
        target: 'http://10.39.69.63:8000/',
        changeOrigin: true,
        pathRewrite: { '^': '' },
      },
    },
  }),
  // 测试环境
  develop: defineConfig({
    publicPath: './',
    define: {
      'process.env.BASE_URL': '/services/api/admin/',
      'process.env.TOKEN_NAME': 'ADMIN-TOKEN-DEVELOP',
    },
  }),
  // 生产环境
  master: defineConfig({
    publicPath: './',
    define: {
      'process.env.BASE_URL': '/services/api/admin/',
      'process.env.TOKEN_NAME': 'ADMIN-TOKEN',
    },
  }),
} as Record<string, any>;

export default config[env];
