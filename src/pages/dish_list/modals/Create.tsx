import { MyModalForm } from '@/cc';
import { ProFormText,ProFormDigit } from '@ant-design/pro-components';
import XSelect from "@/components/XSelect";

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '请设置菜品名称！',
          },
        ]}
        name="name"
        placeholder="请设置菜品名称"
        label="菜品名称"
      />
      <ProFormDigit
        rules={[
          {
            required: true,
            message: '请设置菜品价格！',
          },
        ]}
        name="price"
        placeholder="请设置菜品价格"
        label="菜品价格"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请设置菜品图片！',
          },
        ]}
        name="img"
        placeholder="请设置菜品图片"
        label="菜品图片"
      />
      <XSelect.FoodStatus />
    </MyModalForm>
  );
};
