import { MyProFormRadioGroup } from '@/cc';

const SysPermissionsType = () => {
  return (
    <MyProFormRadioGroup
      name="type"
      label="菜单类型"
      rules={[
        {
          required: true,
          message: '请选择类型',
        },
      ]}
      options={[
        {
          label: '目录',
          value: '目录',
        },
        {
          label: '页面',
          value: '页面',
        },
        {
          label: '按钮',
          value: '按钮',
        },
      ]}
    />
  );
};

const Sex = () => {
  return (
    <MyProFormRadioGroup
      name="sex"
      label="性别"
      rules={[
        {
          required: true,
          message: '请选择类型',
        },
      ]}
      options={[
        {
          label: '未知',
          value: '0',
        },
        {
          label: '女',
          value: '1',
        },
        {
          label: '男',
          value: '2',
        }
      ]}
    />
  );
};

const CertType = ({...rest}) => {
  return (
    <MyProFormRadioGroup
      name="cert_type"
      label="证件类型"
      options={[
        {
          label: '身份证',
          value: '1010',
        },
        {
          label: '港澳证件',
          value: '1070',
        },
        {
          label: '台湾证件',
          value: '1160',
        },
        {
          label: '外籍护照',
          value: '1052',
        },
      ]}
      {...rest}
    />
  );
};
const XRadioGroup: {
  SysPermissionsType: typeof SysPermissionsType;
  Sex: typeof Sex;
  CertType: typeof CertType;
} = {} as any;

XRadioGroup.SysPermissionsType = SysPermissionsType;
XRadioGroup.Sex = Sex;
XRadioGroup.CertType = CertType;

export default XRadioGroup;
