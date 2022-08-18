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
      baseUri: 'merchants',
    },
  );

  const tableProps = {
    columns: [
      columns.id,
      {
        title: '商家名称',
        dataIndex: 'name',
      },
      {
        title: '建行商户号',
        dataIndex: 'mrch',
      },
      {
        title: '建行分行号',
        dataIndex: 'branch',
      },
      {
        title: '商家柜台数量',
        dataIndex: 'pos_amount',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '商户柜台号',
        dataIndex: 'pos_ids',
      },
      {
        title:'商家编号',
        dataIndex:'business_id'
      },
      columns.softDelete(),
      columns.createdAt(),
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
                title: '编辑商家',
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
        title="添加商家"
        onClick={() =>
          modalRef.current?.showModal({
            title: '添加商家',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="商家管理"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="username" label="用户名" />
            </QueryFilter>
          </ProCard>
          <ProTable 
            {...table}
            {...tableProps}
            expandable={{
              expandedRowRender: (record) => (
                <ProTable
                  style={{ margin: '0px 20px 0px 20px' }}
                  search={false}
                  toolBarRender={false}
                  pagination={false}
                  size="small"
                  columns={[
                    columns.id,
                    {
                      title: 'vpos',
                      dataIndex: 'vpos',
                    },
                    {
                      title: 'pos',
                      dataIndex: 'pos',
                    }
                  ]}
                  dataSource={record.merchant_pos}
                />
              ),
            }}
            />
        </>
      }
    />
  );
};
