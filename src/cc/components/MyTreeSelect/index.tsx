import { request } from 'umi';

import { ProFormTreeSelect } from '@ant-design/pro-components';
import type { FormItemProps, TreeSelectProps } from 'antd';

type IProps = FormItemProps & {
  // dataSource与requestUri必选一项，否则走默认参数，不会显示下拉数据
  requestProps?: {
    url: string; // 数据接口
    defaultParams?: Record<string, any>; // 接口请求参数
  };
  dataSource?: any[]; // 数据源，如果不是接口数据可以直接使用这个
  fieldProps?: TreeSelectProps; // treeSelect 所有支持属性
};

export const MyTreeSelect = ({
  requestProps,
  dataSource = [],
  fieldProps = {},
  label,
  name,
  ...rest // FormItem 所有支持属性
}: IProps) => {
  const fieldNames = fieldProps.fieldNames || {
    label: 'name',
    value: 'id',
    children: 'children',
  };

  const doRequest = async () => {
    if (!requestProps?.url) {
      return dataSource;
    }
    const res = await request(requestProps.url, {
      data: requestProps.defaultParams || {},
    });
    if (res.code === 0) {
      return res.data;
    }
  };

  return (
    <ProFormTreeSelect
      label={label}
      name={name}
      request={() => {
        return doRequest();
      }}
      fieldProps={{
        fieldNames,
        placeholder: '请选择',
        showSearch: true,
        treeNodeFilterProp: fieldNames.label,
        treeDefaultExpandAll: true,
        ...fieldProps,
      }}
      {...rest}
    />
  );
};
