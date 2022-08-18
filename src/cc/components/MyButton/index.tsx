import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusSquareOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from '@ant-design/icons';
import type { ButtonProps } from 'antd';
import { Button, Dropdown, Menu, Popconfirm, Tag } from 'antd';
import { history } from 'umi';
import { fromSearchParamsToParams } from '../../utils/paramsHelper';

/**
 * 查看
 */
const ShowButton = ({ title, onClick, ...rest }: ButtonProps) => {
  return (
    <Button
      key="ShowButton"
      type="primary"
      size="small"
      icon={<EyeOutlined />}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {title || '查看'}
    </Button>
  );
};

/**
 * 添加按钮
 */
const CreateButton = ({ title, onClick, ...rest }: ButtonProps) => {
  return (
    <Button
      key="CreateButton"
      type="primary"
      icon={<PlusSquareOutlined />}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {title}
    </Button>
  );
};

/**
 * 下载模版
 */
const DownloadButton = ({ title, onClick, ...rest }: ButtonProps) => {
  return (
    <Button
      key="DownloadButton"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {title}
    </Button>
  );
};

/**
 * 导出
 */
const ExportButton = (props:any) => {
  const handleMenuClick = (v: any) => {
    const params: any = { download_type: v.key, ...props.params };
    console.log(params)
    props.actions?.export(params);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: '导出本页',
          key: '1',
        },
        {
          label: '导出筛选',
          key: '2',
        },
        {
          label: '导出全部',
          key: '3',
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Button key="ExportButton">
        导出
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

/**
 * 编辑按钮
 */
const EditButton = ({ onClick, title, ...rest }: ButtonProps) => {
  return (
    <Button
      type="primary"
      size="small"
      ghost
      icon={<EditOutlined />}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {title || '编辑'}
    </Button>
  );
};

/**
 * 排序按钮
 */
const MoveButton = ({
  direction,
  onClick,
  disabled,
  ...rest
}: {
  direction: 'up' | 'down';
} & ButtonProps) => {
  return (
    <Button
      type="ghost"
      size="small"
      icon={direction === 'up' ? <UpOutlined /> : <DownOutlined />}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    />
  );
};

/**
 * 删除按钮
 */
const DeleteButton = ({
  onConfirm,
  title,
  ...rest
}: ButtonProps & {
  onConfirm: (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
  ) => void;
}) => {
  return (
    <Popconfirm
      title={`确定要${title || '删除'}?`}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() => onConfirm()}
    >
      <Button icon={<DeleteOutlined />} danger size="small" {...rest}>
        {title || '删除'}
      </Button>
    </Popconfirm>
  );
};

/**
 * 软删除按钮
 * @param param0
 * @returns
 */
const SoftDelete = ({
  deleted_at,
  onConfirm,
}: {
  deleted_at: string | undefined;
  onConfirm: (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
  ) => void;
}) => {
  return (
    <Popconfirm
      title={deleted_at ? '确定要恢复？' : '确定要禁用？'}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={onConfirm}
    >
      <Tag color={deleted_at ? 'gray' : 'green'} style={{ cursor: 'pointer' }}>
        {deleted_at ? (
          <>
            <CloseCircleOutlined />
            已禁用
          </>
        ) : (
          <>
            <CheckCircleOutlined />
            已启用
          </>
        )}
      </Tag>
    </Popconfirm>
  );
};

/**
 * 批量导入
 */
const BatchImportBtn = ({ title, onClick, ...rest }: ButtonProps) => {
  return (
    <Button
      key="BatchImportBtn"
      type="primary"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      {title}
    </Button>
  );
};

const Buttons: {
  Create: typeof CreateButton;
  Edit: typeof EditButton;
  Delete: typeof DeleteButton;
  Move: typeof MoveButton;
  SoftDelete: typeof SoftDelete;
  BatchImportBtn: typeof BatchImportBtn;
  DownloadButton: typeof DownloadButton;
  ExportButton: typeof ExportButton;
  ShowButton: typeof ShowButton;
} = {} as any;

Buttons.Create = CreateButton;
Buttons.Edit = EditButton;
Buttons.Delete = DeleteButton;
Buttons.Move = MoveButton;
Buttons.SoftDelete = SoftDelete;
Buttons.BatchImportBtn = BatchImportBtn;
Buttons.DownloadButton = DownloadButton;
Buttons.ExportButton = ExportButton;
Buttons.ShowButton = ShowButton;

export const MyButton = Buttons;
