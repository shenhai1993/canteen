import { defineConfig } from '@umijs/max';
import envConfig from './envConfig';

export default defineConfig({
  ...{
    antd: {},
    // access: {},
    model: {},
    initialState: {},
    request: {},
    // dva: {},
    layout: {},
    npmClient: 'npm',
    hash: true,
    history: { type: 'hash' },
    links: [
      {
        rel: 'icon',
        href: './assets/ico.png',
        type: 'image/x-icon',
      },
    ],
    manifest: {
      basePath: '',
    },
  },
  ...envConfig,
});
