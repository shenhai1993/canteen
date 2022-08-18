import { MyProFormTree } from '@/cc';
import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface';
import { Form ,Tree} from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import {CheckCircleFilled,InfoCircleFilled } from '@ant-design/icons';

const SysPermissions: React.FC<ProFormFieldItemProps<any>> = ({
  ...rest
}: ProFormFieldItemProps<any>) => {
  const [treeData, setTreeData] = useState<any[]>([]);

  useEffect(() => {
    request('sys_permissions/tree', { method: 'post' }).then((res) => {
      setTreeData(res.data);
    });
  }, []);

  return (
    <Form.Item name="permissions_ids" label="选择菜单">
      <MyProFormTree
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        treeData={treeData}
        {...rest}
      />
    </Form.Item>
  );
};


const Myenterprise = ({actions,onChange,rest}:any) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  console.log(actions.menu_batches_id,'jjsjdata')
  const onTreeDate = (data:any) => {
    data.forEach((res:any) => {
        if(res.menus_count > 0){
          res.icon = <CheckCircleFilled style={{color:'#1890ff'}} />
        } else {
          res.icon = <InfoCircleFilled style={{color:'#faad14'}} />
        }
        if(res?.children?.length > 0){ 
          onTreeDate(res.children)
        }
    })
    setTreeData(data)
    
  }
    
  useEffect(() => {
    request('companies/tree', { method: 'post',data:{menu_batches_id:actions?.menu_batches_id} }).then((res) => {
      // setTreeData(res.data)
      onTreeDate(res.data)
      // setTreeData(onTreeDate(res.data));
    });
  }, []);
  return  <>{treeData.length > 0?
    <Tree
      showIcon
      onSelect={onChange}
      defaultExpandAll
      fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      treeData={treeData}
    />
  :''}</>
}

const XTree: {
  SysPermissions: typeof SysPermissions;
  Myenterprise: typeof Myenterprise
} = {} as any;

XTree.SysPermissions = SysPermissions;
XTree.Myenterprise = Myenterprise

export default XTree;
