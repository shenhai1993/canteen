import { MyModalDataContext, MyModalForm } from '@/cc';
import XSelect from '@/components/XSelect';
import { ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { useContext, useEffect, useRef } from 'react';

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    console.log('update item', item);
    const roles_id = item?.roles.map((d: any) => d.id);
    formRef?.current?.setFieldsValue({ ...item, roles_id: roles_id });
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText name="username" placeholder="用户名" label="用户名" />
      <ProFormText.Password name="password" placeholder="密码" label="密码" />
      <XSelect.SysRoles />
    </MyModalForm>
  );
};
