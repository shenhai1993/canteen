import { login } from '@/services/AuthController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message } from 'antd';

export const MyLogin = (props: any) => {
  const { setInitialState } = useModel('@@initialState');

  const onFinish = async (values: any) => {
    login(values).then((res) => {
      setInitialState({
        name: res.data.user.username,
        user: res.data.user,
        permissions: res.data.permissions,
      });
      localStorage.setItem(
        process.env.TOKEN_NAME as string,
        res.data.token.access_token,
      );
      message.success('登录成功！');
      history.push('/welcome');
    });
  };

  return (
    <LoginForm {...props} onFinish={onFinish}>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
        placeholder="请输入用户名"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder="请输入密码"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      />
    </LoginForm>
  );
};
