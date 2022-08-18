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
            baseUri: 'setting/user_level_discounts',
        },
    );
    const tableProps = {
        columns: [
            columns.id,
            {
                title: '等级ID',
                dataIndex: 'user_level_id',
            },
            {
                title: '对应餐别',
                dataIndex: 'meal_type',
            },
            {
                title: '折扣类型',
                dataIndex: 'discount_type',
            },
            {
                title: '等级折扣',
                dataIndex: 'discoun',
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
                                title: '编辑等级折扣',
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
                title="新建等级折扣"
                onClick={() =>
                    modalRef.current?.showModal({
                        title: '新建等级折扣',
                        child: <Create actions={actions} />,
                    })
                }
            />,
        ],
    };

    return (
        <PageContainer
            title="用户等级套餐折扣表"
            footer={[<MyPagination key="page" {...pagination} />]}
            content={
                <>
                    <QueryFilter {...search}>
                        <ProFormText name="name" label="用户等级" />
                    </QueryFilter>
                    <ProTable {...table} {...tableProps} expandable={{ defaultExpandAllRows: true }} />
                </>
            }
        />
    );
};
