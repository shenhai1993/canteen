import { MyButton, MyPagination, useListPage } from '@/cc';
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from '@ant-design/pro-components';
import { Tag } from 'antd';
import { Create } from './modals/Create';
import { Update } from './modals/Update';

export default () => {
  const { modalRef, actions, columns, pagination, search, table } = useListPage(
    {
      baseUri: 'admins',
    },
  );

  const tableProps = {
    columns: [
      columns.id,
      {
        title: '用户名',
        dataIndex: 'username',
        sorter: true,
      },
      {
        title: '角色',
        render: (_: any, record: any) => {
          return record.roles.map((item: any) => (
            <Tag key={item.id} color={item.color}>
              {item.name}
            </Tag>
          ));
        },
      },
      columns.createdAt(),
      {
        title: '操作',
        key: 'action',
        align: 'right',
        valueType: 'option',
        render: (_: any, record: any) => [
          <MyButton.Edit
            key={'edit_' + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: '编辑管理员',
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
        title="添加管理员"
        onClick={() =>
          modalRef.current?.showModal({
            title: '添加管理员',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="管理员管理"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="username" label="用户名" />
            </QueryFilter>
          </ProCard>
          <ProTable {...table} {...tableProps} />
        </>
      }
    />
  );
};
