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
        baseUri: 'setting/dishes',
      },
  );
  const tableProps = {
    columns: [
      columns.id,
      {
        title: '菜品名称',
        dataIndex: 'name',
      },
      {
        title: '菜品价格',
        dataIndex: 'price',
      },
      {
        title: '菜品图片',
        dataIndex: 'img',
      },
      {
        title: '对应餐别',
        dataIndex: 'meal_type',
      },
      columns.createdAt(),
      columns.softDelete(),
      {
        title: '操作',
        key: 'action',
        valueType: 'option',
        align: 'right',
        render: (_: any, record: any) => [
          <MyButton.Edit
            disabled={record.deleted_at}
            key={'edit_' + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: '编辑菜品',
                defaultData: record,
                child: <Update actions={actions} />,
              });
            }}
          />,
          <MyButton.Delete
              key={'delete_' + record.id}
              onConfirm={() => actions.delete({ id: record.id })}
          />
        ],
      },
    ] as ProColumns<any, 'text'>[],
    toolBarRender: () => [
      <MyButton.Create
        key="create"
        title="新建菜品"
        onClick={() =>
          modalRef.current?.showModal({
            title: '新建菜品',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="菜品管理"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <QueryFilter {...search}>
            <ProFormText name="name" label="菜品名称" />
          </QueryFilter>
          <ProTable {...table} {...tableProps} expandable={{ defaultExpandAllRows: true }} />
        </>
      }
    />
  );
};
