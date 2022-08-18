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
                        message: '请选择用户等级！',
                    },
                ]}
                name="user_level_id"
                placeholder="请选择用户等级"
                label="用户等级"
            />
            <ProFormText
                rules={[
                    {
                        required: true,
                        message: '请设置对应餐别！',
                    },
                ]}
                name="meal_type"
                placeholder="请设置对应餐别"
                label="对应餐别"
            />
            <ProFormText
                rules={[
                    {
                        required: true,
                        message: '请设置折扣类型！',
                    },
                ]}
                name="discount_type"
                placeholder="请设置折扣类型"
                label="折扣类型"
            />
            <ProFormDigit
                rules={[
                    {
                        required: true,
                        message: '请设置等级折扣！',
                    },
                ]}
                name="discount"
                placeholder="请设置等级折扣"
                label="等级折扣"
            />
        </MyModalForm>
    );
};
