import { MyButton, MyPagination, useListPage } from '@/cc';
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from '@ant-design/pro-components';
import { Create } from './modals/Create';
import { Update } from './modals/Update';

export default () => {
  const { modalRef, actions, columns, pagination, search, table } = useListPage(
    {
      baseUri: 'companies',
    },
  );

  const tableProps = {
    columns: [
      columns.id,
      {
        title: '公司名称',
        dataIndex: 'name',
      },
      {
        title: '联系人',
        dataIndex: 'contractor',
      },
      {
        title: '联系电话',
        dataIndex: 'tel',
      },
      {
        title: '公司地址',
        dataIndex: 'addr',
      },
      columns.createdAt(),
      columns.softDelete(),
      {
        title: '操作',
        key: 'action',
        align: 'right',
        valueType: 'option',
        render: (_: any, record: any) => [
          <MyButton.Edit
            disabled={record.deleted_at}
            key={'edit_' + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: '编辑公司',
                width: 1050,
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
        title="添加公司"
        onClick={() =>
          modalRef.current?.showModal({
            title: '添加公司',
            width: 1050,
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="公司管理"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="username" label="用户名" />
            </QueryFilter>

            <ProTable {...table} {...tableProps} />
          </ProCard>
        </>
      }
    />
  );
};
