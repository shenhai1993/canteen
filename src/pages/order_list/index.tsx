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
        baseUri: 'order/order_bills',
      },
  );

  const tableProps = {
    columns: [
      columns.id,
      {
        title: '订单编号',
        dataIndex: 'code',
      },
      {
        title: '公司ID',
        dataIndex: 'company_id',
      },
      {
        title: '用户ID',
        dataIndex: 'user_id',
      },
      {
        title: '配餐时间',
        dataIndex: 'delivery_time',
      },
      {
        title: '订单总额',
        dataIndex: 'total_amount',
      },
      {
        title: '实付金额',
        dataIndex: 'pay_amount',
      },
      columns.createdAt(),
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
