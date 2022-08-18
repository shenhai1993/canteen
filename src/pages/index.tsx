import { history } from '@umijs/max';
import { useLayoutEffect } from 'react';

export default () => {
  useLayoutEffect(() => {
    history.push('/welcome');
  });
};
