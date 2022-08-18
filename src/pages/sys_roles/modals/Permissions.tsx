import { MyModalDataContext, MyModalForm } from '@/cc';
import XTree from '@/components/XTree';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useContext, useEffect, useRef } from 'react';
import { request } from 'umi';

export const Permissions = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    request('authorization/permission/sys_roles/set_permissions', {
      data: { id: item?.id },
    }).then((res) => {
      formRef?.current?.setFieldsValue(res.data);
    });
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        console.log(props.actions, values);
        props.actions.setPermissions(item?.id, values.permissions_ids);
        return Promise.resolve();
      }}
    >
      <XTree.SysPermissions />
    </MyModalForm>
  );
};
