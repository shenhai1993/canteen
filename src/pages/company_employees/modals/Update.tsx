import { MyModalDataContext, MyModalForm } from '@/cc';
import XRadioGroup from '@/components/XRadioGroup';
import XSelect from '@/components/XSelect';
import { ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { useContext, useEffect, useRef } from 'react';

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
      <XSelect.Companies />
      <ProFormText 
        name="real_name" 
        placeholder="请输入姓名！" 
        label="姓名"
        rules={[
            {
                required: true,
                message: '请输入姓名！',
            },
        ]} 
        />
      <XRadioGroup.Sex />
      <ProFormText 
        name="phone_number" 
        placeholder="手机号"
        label="手机号"
        rules={[
            {
                required: true,
                message: '请输入手机号！',
            },
        ]} 
      />
      <XRadioGroup.CertType rules={[
        {
          required: true,
          message: '请选择证件类型！',
        },
      ]} />
      <ProFormText name="cert_no"  fieldProps={{
          maxLength:20
        }}   placeholder="证件号码" label="证件号码" />
    </MyModalForm>
  );
};
