import { MySettingForm,useListPage } from '@/cc';
import { ProCard, ProFormText ,ProFormInstance} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { request } from 'umi';
import { useRef, useState } from 'react';
import {notification} from 'antd'

export default () => {
  const formRef = useRef<ProFormInstance<any>>();
  const { actions,table } = useListPage(
    {
      baseUri: 'campus',
      otherApi: {
        list: () => {
          getConfigs()
        },
      },
    },
  );
  const getConfigs = () =>{
    request('configs/get', {
      data: {key:'campus' },
    }).then((res) => {
      if(res.data){
        formRef?.current?.setFieldsValue(res.data);
      }
    });
  }

  const onSave = (data:any) =>{
    request('configs/save', {
      data: {key:'campus',value:JSON.stringify(data) },
    }).then((res) => {
      if(res.code == 0){
        openNotificationWithIcon()
      }
      console.log(res,'res')
    });
  }

  const openNotificationWithIcon = () => {
    notification['success']({
      message: '提示',
      description:'保存成功！'
    });
  };


  return (
    <PageContainer
      title={false}
      content={
        <ProCard type="inner" title="园区信息配置" bordered>
          <MySettingForm
            formRef={formRef}
            onFinish={(values: any) => {
              onSave(values)
              console.log('values', values);
              return Promise.resolve();
            }}
          >
            <ProFormText
              name="name"
              placeholder="园区名称"
              label="园区名称"
            />
            <ProFormText
              name="campus_id"
              placeholder="园区id"
              label="园区id"
            />
            <ProFormText
              name="corp_id"
              placeholder="合作id"
              label="合作id"
            />
            <ProFormText.Password
              name="key"
              placeholder="秘钥"
              label="秘钥"
            />
            <ProFormText
              name="base_url"
              placeholder="接口地址"
              label="接口地址"
            />
            <ProFormText
              name="pay_notify_url"
              placeholder="支付回调"
              label="支付回调"
            />
            <ProFormText
              name="refund_notify_url"
              placeholder="退款回调"
              label="退款回调"
            />
          </MySettingForm>
        </ProCard>
      }
    />
  );
};
