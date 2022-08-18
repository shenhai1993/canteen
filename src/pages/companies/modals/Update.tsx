import { MyModalDataContext, MyModalForm } from '@/cc';
import {
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import OtherForm from '../components/OtherForm'
import { useContext, useEffect, useRef } from 'react';
export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    let data = JSON.parse(JSON.stringify(item))
    data.subsidy_enable = data.subsidy_enable?true:false
    data.discount_enable = data.discount_enable?true:false
    data.subsidy_json = data.subsidy_json?JSON.parse(data.subsidy_json):{}
    data.discount_json = data.discount_json?JSON.parse(data.discount_json):{}
    console.log(data,'data')
    formRef?.current?.setFieldsValue(data);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        let data = JSON.parse(JSON.stringify(values))
        data.subsidy_json = JSON.stringify(data.subsidy_json)
        data.discount_json = JSON.stringify(data.discount_json)
        props.actions?.update({ ...data, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText 
        name="name" 
        placeholder="公司名称" 
        label="公司名称" 
        rules={[
          {
            required: true,
            message: '请设置公司名称！',
          },
        ]} />
      <ProFormText 
        name="contractor" 
        placeholder="联系人" 
        label="联系人"
        rules={[
          {
            required: true,
            message: '请设置联系人！',
          },
        ]} />
      <ProFormText 
        name="tel" 
        placeholder="联系电话" 
        label="联系电话"
        fieldProps={{
          maxLength:11
        }}  
        rules={[
          {
            required: true,
            message: '请设置联系电话！',
          },
        ]}
        />
      <ProFormText 
        name="address" 
        placeholder="公司地址" 
        label="公司地址"
        rules={[
          {
            required: true,
            message: '请设置公司地址！',
          },
        ]}
         />
      <OtherForm.subsidy_enable subsidy_enable={item?.subsidy_enable} />
      <OtherForm.discount_enable discount_enable={item?.discount_enable} />
    </MyModalForm>
  );
};
