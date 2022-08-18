import { MyTag } from '@/cc';

const SysPermissionsType = ({ value }: { value: string }) => {
  return (
    <MyTag colors={{ 目录: 'red', 页面: 'blue', 按钮: 'cyan' }} value={value} />
  );
};

const Boolean = ({ value }: { value: string }) => {
  return (
    <MyTag
      colors={{ 是: '#7cb305', 否: '#bfbfbf' }}
      value={value ? '是' : '否'}
    />
  );
};

const MySex = ({ value }: any) => {
  const sexList:any = {0:'未知',1:'女',2:'男'}
  return (
    <MyTag colors={{ 未知: 'red', 男: 'blue', 女: 'cyan' }} value={sexList[value]} />
  );
};

const XTag: {
  SysPermissionsType: typeof SysPermissionsType;
  Boolean: typeof Boolean;
  MySex: typeof MySex
} = {} as any;

XTag.SysPermissionsType = SysPermissionsType;
XTag.Boolean = Boolean;
XTag.MySex = MySex;

export default XTag;
