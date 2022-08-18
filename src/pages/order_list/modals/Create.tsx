import { MyModalForm } from '@/cc';
import { ProFormText,ProFormDigit } from '@ant-design/pro-components';
import XSelect from '@/components/XSelect';

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
                        message: '请设置订单编号！',
                    },
                ]}
                name="code"
                placeholder="请设置订单编号"
                label="订单编号"
            />
            <XSelect.Companies />
            <XSelect.UserList />
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
