/* eslint-disable react/jsx-key */
import { SaveOutlined } from '@ant-design/icons';
import type { ProFormProps } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import { Button, Col, Row, Space } from 'antd';

export const MyModalForm = ({
  children,
  formRef,
  onFinish,
  initialValues,
  ...rest
}: ProFormProps) => {
  return (
    <ProForm
      labelCol={{ sm: { span: 6 } }}
      wrapperCol={{ sm: { span: 14 } }}
      layout="horizontal"
      formRef={formRef}
      onFinish={onFinish}
      initialValues={initialValues}
      submitter={{
        render: () => {
          return (
            <Row>
              <Col span={4} offset={6}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    <SaveOutlined />
                    保存
                  </Button>
                </Space>
              </Col>
            </Row>
          );
        },
      }}
      {...rest}
    >
      {children}
    </ProForm>
  );
};
