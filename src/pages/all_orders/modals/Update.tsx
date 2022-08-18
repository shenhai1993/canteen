import { MyModalDataContext, MyModalForm } from '@/cc';
import {ProFormDigit, ProFormInstance, ProFormText} from '@ant-design/pro-components';
import { useContext, useEffect, useRef } from 'react';
import XSelect from "@/components/XSelect";

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '请设置订单编号！',
          },
        ]}
        name="code"
        placeholder="请设置订单编号"
        label="订单编号"
      />
      <XSelect.Companies />
      <ProFormText name="user_id" placeholder="请设置用户" label="用户名称" />
      <ProFormText name="status" placeholder="请设置订单状态" label="订单状态" />
      <ProFormDigit
        rules={[
          {
            required: true,
            message: '请设置配餐时间！',
          },
        ]}
        name="delivery_time"
        placeholder="请设置配餐时间"
        label="配餐时间"
      />
      <ProFormDigit
        rules={[
          {
            required: true,
            message: '请设置订单金额！',
          },
        ]}
        name="total_amount"
        placeholder="请设置订单金额"
        label="订单金额"
      />
      <ProFormDigit
        rules={[
          {
            required: true,
            message: '请设置实付金额！',
          },
        ]}
        name="pay_amount"
        placeholder="请设置实付金额"
        label="实付金额"
      />
    </MyModalForm>
  );
};
