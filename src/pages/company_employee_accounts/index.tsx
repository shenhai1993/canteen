import { MyButton, MyPagination, useListPage } from '@/cc';
import { PlusOutlined } from '@ant-design/icons';
import XSelect from '@/components/XSelect';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { request } from 'umi';
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from '@ant-design/pro-components';
import { Button,Modal } from 'antd';
import XTag from '@/components/XTag'
import { WalletDeposit } from './modals/wallet_deposit';
import { WalletClear } from './modals/wallet_clear';

export default () => {
  
  const { modalRef, actions, columns, params, pagination, search, table } =
  useListPage({
    baseUri: 'company_employee_accounts',
  });

  const on_wallet_clear = (data:any) =>{
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要清除金额？',
      okText: '确认',
      cancelText: '取消',
      onOk:() => {
        request('company_employee_accounts/wallet_clear', {
            data: data,
          }).then((res) => {
            if(res.code == 0){
              actions?.list()
            }
          });
      }
    });    
  }

  const onBalance = (data:any) => {
    request('company_employee_accounts/balance', {
      data: data,
    }).then((res) => {
      if(res.code == 0){
        actions?.list()
      }
    });
    // Modal.confirm({
    //   title: '提示',
    //   icon: <ExclamationCircleOutlined />,
    //   content: '确定要刷新当前账户？',
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk:() => {
    //     request('company_employee_accounts/balance', {
    //         data: data,
    //       }).then((res) => {
    //         if(res.code == 0){
    //           actions?.list()
    //         }
    //       });
    //   }
    // }); 
  }

  const tableProps = {
    columns: [
      columns.id,
      {
        title: '所属公司员工',
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
      columns.createdAt(),
    ] as ProColumns<any, 'text'>[],
    toolBarRender: () => [
      <MyButton.BatchImportBtn
        key="import"
        title="批量导入补贴"
        icon={<PlusOutlined />}
        // actions={actions}
        // params={}
      />,
      <MyButton.ExportButton
        title="导出补贴余额"
        key="export"
        // actions={actions}
      />,
      <Button key="batchClean" danger>
        一键清零补贴
      </Button>,
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
              <ProFormText name="username" label="用户名" />
              <ProFormText name="real_name" label="姓名" />
              <ProFormText name="phone_number" label="手机号" />
              <ProFormText name="cert_no" label="证件号码" />
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
                      title: '类别',
                      dataIndex: 'acc_type',
                    },
                    {
                      title: '名称',
                      dataIndex: 'acc_name',
                    },
                    {
                      title: '编号',
                      dataIndex: 'acc_no',
                    },
                    {
                      title: '余额',
                      dataIndex: 'acc_amount',
                    },
                    {
                      title: '操作',
                      render: (_: any, record: any) => [
                        <Button key={'deposit_'+record.id} size="small" type="primary" onClick={() =>
                          modalRef.current?.showModal({
                            title: '充值',
                            child: <WalletDeposit actions={record} onChange={() => {
                              actions?.list()
                              modalRef.current?.hideModal();
                            }} />,
                          })
                        }>
                          充值
                        </Button>,
                        <Button key={'clear_'+record.id} size="small" type="ghost" onClick={() => {
                          modalRef.current?.showModal({
                            title: '清除操作',
                            child: <WalletClear actions={record} onChange={() => {
                              actions?.list()
                              modalRef.current?.hideModal();
                            }} />,
                          })
                          // on_wallet_clear({company_employee_accounts_id:record.id,reset_to:0})
                        }}>
                          清除
                        </Button>,
                        <Button key={"zero_"+record.id} size="small" onClick={() => {
                          onBalance({company_employee_accounts_id:record.id})
                        }}>
                          刷新
                        </Button>,
                      ],
                    },
                  ]}
                  dataSource={record.company_employee_accounts}
                />
              ),
            }}
          />
        </>
      }
    />
  );
};
