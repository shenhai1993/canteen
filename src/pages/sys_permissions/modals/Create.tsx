import { MyModalForm } from '@/cc';
import XTreeSelect from '@/components/XTreeSelect';
import { ProFormText } from '@ant-design/pro-form';
import XRadioGroup from "@/components/XRadioGroup";

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
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
