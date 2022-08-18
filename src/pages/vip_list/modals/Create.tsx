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
                        message: '请设置套餐名称！',
                    },
                ]}
                name="name"
                placeholder="请设置套餐名称"
                label="套餐名称"
            />
            <XSelect.FoodStatus />
            <ProFormDigit
                rules={[
                    {
                        required: true,
                        message: '请设置套餐价格！',
                    },
                ]}
                name="price"
                placeholder="请设置套餐价格"
                label="套餐价格"
            />
        </MyModalForm>
    );
};
