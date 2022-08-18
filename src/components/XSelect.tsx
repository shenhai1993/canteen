import { MyProFormSelect } from '@/cc';
import { request } from 'umi';

const SysRoles = ({ title, ...rest }: any) => {
  //角色选择
  const doRequest = async () => {
    const res = await request('sys_roles/select', {
      method: 'POST',
    });
    if (res.code === 0) return res.data;
  };

  return (
    <MyProFormSelect
      name="roles_id"
      label={title || '选择角色'}
      placeholder="请选择所属角色"
      request={doRequest}
      mode="multiple"
      allowClear
      fieldProps={{
        fieldNames: {
          label: 'name',
          value: 'id',
        },
      }}
      {...rest}
    />
  );
};

const Companies = ({ title, ...rest }: any) => {
  //角色选择
  const doRequest = async () => {
    const res = await request('companies/list', { method: 'post' });
    if (res.code === 0) return res.data;
  };

  return (
    <MyProFormSelect
      name="companies_id"
      label={title || '所属公司'}
      placeholder="请选择所属公司"
      request={doRequest}
      allowClear
      fieldProps={{
        fieldNames: {
          label: 'name',
          value: 'id',
        },
      }}
      {...rest}
    />
  );
};
const FoodStatus = ({ title, ...rest }: any) => {
  return (
    <MyProFormSelect
      name="meal_type"
      label={title || '餐品类型'}
      placeholder="选择餐品类型"
      allowClear
      options={[
        {
          label: '早餐',
          value: '早餐',
        },
        {
          label: '午餐',
          value: '午餐',
        },
        {
          label: '晚餐',
          value: '晚餐',
        },
      ]}
      rules={[
        {
          required: true,
          message: '请选择菜品类型！',
        },
      ]}
      {...rest}
    />
  );
};
// 公司用户列表
const UserList = ({ title, ...rest }: any) => {
  //岗位选择
  const doRequest = async () => {
    const res = await request('company_employees/select');
    if (res.code === 0) return res.data;
  };

  return (
    <MyProFormSelect
      name="user_id"
      label={title || '用户名称'}
      placeholder="请选择用户"
      request={doRequest}
      allowClear
      fieldProps={{
        fieldNames: {
          label: 'real_name',
          value: 'id',
        },
      }}
      rules={[
        {
          required: true,
          message: '请选择公司！',
        },
      ]}
      {...rest}
    />
  );
};
const XSelect: {
  SysRoles: typeof SysRoles;
  Companies: typeof Companies;
  FoodStatus: typeof FoodStatus;
  UserList: typeof UserList;
} = {} as any;

XSelect.SysRoles = SysRoles;
XSelect.Companies = Companies;
XSelect.FoodStatus = FoodStatus;
XSelect.UserList = UserList;
export default XSelect;
