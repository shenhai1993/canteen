import { MyButton, MyImport, MyPagination, useListPage } from '@/cc';
import XSelect from '@/components/XSelect';
import { getCertType } from '@/utils/CertType';
import { PlusOutlined } from '@ant-design/icons';
import XRadioGroup from '@/components/XRadioGroup';
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
import XTag from '@/components/XTag'

export default () => {
  const { modalRef, actions, columns, params, pagination, search, table } =
    useListPage({
      baseUri: 'company_employees',
    });

  const tableProps = {
    columns: [
      columns.id,
      {
        title: '所属公司',
        render: (_, record: any) => record.company.name,
      },
      {
        title: '姓名',
        dataIndex: 'real_name',
      },
      {
        title: '性别',
        render: (_, record: any) => <XTag.MySex value={record.sex} />,
      },
      {
        title: '手机号',
        dataIndex: 'phone_number',
      },
       {
        title: '账户总金额',
        render: () => {
          return 0;
        },
      },
      // {
      //   title: '证件信息',
      //   render: (_, record) => {
      //     return getCertType(record?.cert_type) + record.cert_no;
      //   },
      // },
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
                title: '编辑公司员工',
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
        title="添加公司员工"
        onClick={() =>
          modalRef.current?.showModal({
            title: '添加公司员工',
            child: <Create actions={actions} />,
          })
        }
      />,
      <MyButton.BatchImportBtn
        key="import"
        title="导入"
        icon={<PlusOutlined />}
        onClick={() =>
          modalRef.current?.showModal({
            title: '导入',
            child: <MyImport actions={actions} />,
          })
        }
      />,
      <MyButton.ExportButton key="export" actions={actions} params={params} />,
    ],
  };

  return (
    <PageContainer
      title="公司员工管理"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <ProCard>
            <QueryFilter {...search}>
              <XSelect.Companies />
              <ProFormText name="real_name" label="姓名" />
              <ProFormText name="phone_number" label="手机号" />
              <ProFormText name="cert_no" label="证件号码" />
            </QueryFilter>
            <ProTable {...table} {...tableProps} />
          </ProCard>
        </>
      }
    />
  );
};
