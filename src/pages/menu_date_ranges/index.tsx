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
import { history} from 'umi';

export default () => {
  const { modalRef, actions, columns, pagination, search, table } = useListPage(
      {
        baseUri: 'menu_batches',
      },
  );
  const substringStr = (day:string) => {
    return day.substring(5,10)
  }
  const tableProps = {
    columns: [
      columns.id,
      {
        title: '名称',
        width: 180,
        dataIndex: 'name',
      },
      {
        title: '时间段',
        render: (_: any, record: any) => {
          return record.menu_days.map((res:any) => {
            return  <span style={{padding:'0 5px 0 0'}}>{`${substringStr(res.day)}(周${res.week})`}</span>
          })
        }
      },
      {
        title: '配置菜单',
        width: 180,
        dataIndex: 'pay_amount',
        render: (_: any, record: any) => [
          <MyButton.Edit
              key={'edit_' + record.id}
              title="点击设置"
              onClick={() => {
                // localStorage.setItem('timeSlot', record.time_slot_dates,);
                // localStorage.setItem('id', record.id,);
                history.push("/menu_package?id="+record.id);
              }}
          />,
        ]
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
              key={'edit_time_' + record.id}
              onClick={() => {
                modalRef.current?.showModal({
                  title: '编辑时间段',
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
          title="新建时间段"
          onClick={() =>
              modalRef.current?.showModal({
                title: '新建时间段',
                width:1000,
                child: <Create actions={actions} />,
              })
          }
      />,
    ],
  };

  return (
      <PageContainer
          title="时间段设置"
          footer={[<MyPagination key="page" {...pagination} />]}
          content={
            <>
              <ProCard>
                <QueryFilter {...search}>
                  <ProFormText name="username" label="日期" />
                </QueryFilter>
              </ProCard>
              <ProTable {...table} {...tableProps} />
            </>
          }
      />
  );
};
