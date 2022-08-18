import { useModel } from '@umijs/max';

export default () => {
  const { initialState } = useModel('@@initialState');

  return <h1>welcome{initialState?.user?.username}</h1>;
};
