import { MyModalForm } from '@/cc';
import { ProFormText,ProFormDigit } from '@ant-design/pro-components';

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText rules={[{ required: true, message: '请设置商家名称！' }]} name="name" placeholder="商家名称" label="商家名称" />
      <ProFormText name="mrch" placeholder="建行商户号" label="建行商户号" />
      <ProFormText name="branch" placeholder="建行分行号" label="建行分行号" />
      <ProFormDigit rules={[{ required: true, message: '请设置商家柜台数量！' }]} min={1} max={50} name="pos_amount" placeholder="商家柜台数量" label="商家柜台数量" />
      <ProFormText name="mobile" placeholder="手机号" label="手机号" />
      <ProFormText name="pos_ids" placeholder="商户柜台号" label="商户柜台号" />
    </MyModalForm>
  );
};
