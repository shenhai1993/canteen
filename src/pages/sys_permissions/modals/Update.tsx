import { MyModalDataContext, MyModalForm } from '@/cc';
import XTreeSelect from '@/components/XTreeSelect';
import XRadioGroup from '@/components/XRadioGroup';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormText } from '@ant-design/pro-form';
import { useContext, useEffect, useRef } from 'react';

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
    console.log('Update useEffect:::', item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <XTreeSelect.SysPermissions />
      <XRadioGroup.SysPermissionsType />
      <ProFormText name="name" placeholder="菜单名称" label="菜单名称" />
      <ProFormText name="url" placeholder="链接" label="菜单链接" />
      <ProFormText name="permission" placeholder="按钮授权" label="按钮授权" />
      <ProFormText name="icon" placeholder="复制下方图标" label="图标设置" />
    </MyModalForm>
  );
};
