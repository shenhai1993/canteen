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
                rules={[{ required: true, message: '请设置名称！', },]}
                name="name"
                placeholder="请设置名称"
                label="名称"
            />
        </MyModalForm>
    );
};
