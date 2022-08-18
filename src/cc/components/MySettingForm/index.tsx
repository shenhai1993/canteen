/* eslint-disable react/jsx-key */
import { FooterToolbar } from '@ant-design/pro-components';
import type { ProFormProps } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';

export const MySettingForm = ({
  children,
  formRef,
  onFinish,
  ...rest
}: ProFormProps) => {
  return (
    <ProForm
      labelCol={{ sm: { span: 3 } }}
      wrapperCol={{ sm: { span: 11 } }}
      layout="horizontal"
      formRef={formRef}
      onFinish={onFinish}
      submitter={{
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
      {...rest}
    >
      {children}
    </ProForm>
  );
};
