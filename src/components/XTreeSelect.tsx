import { MyProFormTreeSelect } from '@/cc';
import { request } from 'umi';

const SysPermissions = () => {
  const doRequest = async () => {
    const res = await request('sys_permissions/list', { method: 'post' });
    if (res.code === 0) return res.data;
  };

  return (
    <MyProFormTreeSelect
      name="parent_id"
      label="上级菜单"
      placeholder="请选择上级菜单，不选则为根节点"
      request={doRequest}
    />
  );
};

const ItemCategories = ({
  name = 'parent_id',
  title = '上级分类',
  ...rest
}: any) => {
  const doRequest = async () => {
    const res = await request('item_categories/tree', { method: 'post' });
    if (res.code === 0) return res.data;
  };

  return (
    <MyProFormTreeSelect
      name={name}
      label={title}
      placeholder="请选择分类!"
      request={doRequest}
      {...rest}
    />
  );
};

const XTreeSelect: {
  SysPermissions: typeof SysPermissions;
  ItemCategories: typeof ItemCategories;
} = {} as any;

XTreeSelect.SysPermissions = SysPermissions;
XTreeSelect.ItemCategories = ItemCategories;

export default XTreeSelect;
