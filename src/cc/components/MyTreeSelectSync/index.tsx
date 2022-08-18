import ProForm from '@ant-design/pro-form';
import { useDebounceFn } from 'ahooks';
import { TreeSelect } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { request } from 'umi';

import type { FormItemProps, TreeSelectProps } from 'antd';
import type { LabelInValueType, RawValueType } from 'rc-select/lib/Select';
import type { DefaultOptionType } from 'rc-tree-select/lib/TreeSelect';

type IObject = Record<string, string>;
export type IMyTreeSelectProps = FormItemProps & {
  requestProps: {
    url: string; // 数据接口
    defaultParams?: Record<string, any>; // 接口请求参数
  };
  defaultNode?: IObject; // 用于编辑情况下，如果之前选的是子集的数据，因为此时接口数据未加载子集数据导致无法显示对应label，需要传入一个默认的数据处理，格式至少包含fieldNames中label和value对应的字段
  disabledIds?: string[]; // 禁止选中的结点id
  fieldProps?: TreeSelectProps; // treeSelect 所有支持属性
};

// 异步加载子节点，搜索需要请求接口，否则只能查询到已加载的数据，如一次性请求所有数据的使用 MyTreeSelect 即可
export const MyTreeSelectSync = ({
  requestProps,
  defaultNode,
  disabledIds,
  fieldProps = {},
  label,
  name,
  ...rest // FormItem 所有支持属性
}: IMyTreeSelectProps) => {
  const fieldNames = {
    label: 'name',
    value: 'id',
    children: 'children',
  };
  const isInitRef = useRef(false); // 接口数据初始化
  const [treeData, setTreeData] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const formatNode = (node: any) => {
    // 禁止某些选项
    if (
      disabledIds &&
      (disabledIds.includes(node.id) || disabledIds.includes(node.parent_id))
    ) {
      node.disabled = true;
    }
    return node;
  };

  const updateTreeData = (
    list: any[],
    key: React.Key,
    children: any[] = [],
  ): any[] => {
    return list.map((node) => {
      if (node.id === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });
  };

  const onRequest = (params: any) => {
    console.log(params, '加载222');
    return request(requestProps.url, {
      data: {
        ...requestProps.defaultParams,
        ...params,
      },
    }).then((res) => {
      if (Array.isArray(res.data)) {
        if (params?.parent_id) {
          // 加载子节点数据
          setTreeData((s) =>
            updateTreeData(
              s,
              params.parent_id,
              (res.data || []).map((v: any) => formatNode(v)),
            ),
          );
        } else {
          // 初始化最外层数据
          isInitRef.current = true;
          setTreeData((res.data || []).map((v: any) => formatNode(v)));
        }
      }
    });
  };

  const onLoadData = (data?: any) => {
    return onRequest({
      parent_id: data.id,
    });
  };

  useEffect(() => {
    // 外部参数改变重新初始化
    isInitRef.current = false;
  }, [requestProps.defaultParams]);

  const { run: onDebounceSearch } = useDebounceFn(
    (v) => onRequest({ name: v }),
    { wait: 500 },
  );

  return (
    <ProForm.Item label={label} name={name} {...rest}>
      <TreeSelect
        fieldNames={fieldNames}
        placeholder="请选择"
        treeData={
          !isOpen && defaultNode ? [defaultNode, ...treeData] : treeData
        }
        loadData={onLoadData}
        treeNodeFilterProp={fieldNames.label}
        onSearch={onDebounceSearch}
        onSelect={(
          value: RawValueType | LabelInValueType,
          node: DefaultOptionType,
        ) => {
          console.log(value, node, '选中');
          if (fieldProps.onSelect) {
            fieldProps.onSelect(value, node);
          }
        }}
        onChange={(value, lab, extra) => {
          console.log(value, lab, extra, '选中');
          if (fieldProps.onChange) {
            fieldProps.onChange(value, lab, extra);
          }
        }}
        onDropdownVisibleChange={(open) => {
          setIsOpen(open);
          // 展开且未初始化数据则请求
          if (open && !isInitRef.current) {
            onRequest({});
          }
        }}
        {...fieldProps}
      />
    </ProForm.Item>
  );
};
