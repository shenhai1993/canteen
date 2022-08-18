import { MyButton, useListPage } from '@/cc';
import XTag from '@/components/XTag';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { message } from 'antd';
import { request } from 'umi';
import { Create } from './modals/Create';
import { Update } from './modals/Update';

export default () => {
  const { modalRef, actions, table, resData } = useListPage({
    baseUri: 'sys_permissions',
    otherApi: {
      move: (id: number, type: string) => {
        request('sys_permissions/move', {
          data: { id: id, type: type },
        }).then(() => {
          message.success('操作成功');
          actions.list();
        });
      },
    },
  });

  const tableProps = {
    columns: [
      {
        title: '名称',
        dataIndex: 'id',
        render: (_: any, record: any) => (
          <>
            {record.id}_{record.name}
          </>
        ),
      },
      {
        title: '路由',
        dataIndex: 'url',
      },
      {
        title: '类型',
        render: (_: any, record: any) => (
          <XTag.SysPermissionsType value={record.type} />
        ),
      },
      {
        title: '排序',
        render: (_: any, record: any) => [
          <MyButton.Move
            key="up"
            direction="up"
            disabled={!record.parent_id}
            onClick={() => actions.move(record.id, 'up')}
          />,
          <MyButton.Move
            key="down"
            direction="down"
            disabled={!record.parent_id}
            onClick={() => actions.move(record.id, 'down')}
          />,
        ],
      },
      {
        title: '授权标示',
        dataIndex: 'permission',
      },
      /*{
        title: '菜单显示',
        render: (_: any, record: any) => <XTag.Boolean value={record.show_in_menu} />,
      },*/
      {
        title: '后端Api',
        dataIndex: 'api_json',
      },
      {
        title: '排序',
        render: (_: any, record: any) => [
          <MyButton.Move
            key="up"
            direction="up"
            disabled={!record.parent_id}
            onClick={() => actions.move(record.id, 'up')}
          />,
          <MyButton.Move
            key="down"
            direction="down"
            disabled={!record.parent_id}
            onClick={() => actions.move(record.id, 'down')}
          />,
        ],
      },
      {
        title: '操作',
        key: 'action',
        valueType: 'option',
        align: 'right',
        render: (_: any, record: any) => [
          <MyButton.Edit
            key={'edit_' + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: '编辑菜单',
                defaultData: record,
                child: <Update actions={actions} />,
              });
            }}
          />,
          <MyButton.Delete
            key={'delete_' + record.id}
            onConfirm={() => actions.delete({ id: record.id })}
          />,
        ],
      },
    ] as ProColumns<any, 'text'>[],
    toolBarRender: () => [
      <MyButton.Create
        key="create"
        title="新建菜单"
        onClick={() =>
          modalRef.current?.showModal({
            title: '新建菜单',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="菜单管理"
      content={
        <>
          {!resData ? null : (
            <ProTable
              {...table}
              {...tableProps}
              expandable={{ defaultExpandAllRows: true }}
            />
          )}
        </>
      }
    />
  );
};
