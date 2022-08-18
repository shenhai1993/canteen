import { MyModalDataContext, MyModalForm } from '@/cc';
import XRadioGroup from '@/components/XRadioGroup';
import XSelect from '@/components/XSelect';
import { ProFormInstance, ProFormText,ProFormDigit } from '@ant-design/pro-components';
import { useContext, useEffect, useRef } from 'react';
import { request } from 'umi';

export const WalletClear = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  const onSave = (data:any) =>{
    request('company_employee_accounts/wallet_clear', {
      data: data,
    }).then((res) => {
      if(res.code == 0){
        props.onChange(true)
      }
    });
  }

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        console.log(values)
        // props.actions?.update({ ...values, id: item?.id });
        console.log(props.actions,'values')
        onSave({...values,...{company_employee_accounts_id:props.actions?.id}})
        return Promise.resolve();
      }}
    >
      <ProFormDigit 
        name="reset_to" 
        placeholder="清除到一定金额" 
        label="清除到"
        rules={[
            {
                required: true,
                message: '设置一个金额！',
            },
        ]} 
        />
    </MyModalForm>
  );
};
