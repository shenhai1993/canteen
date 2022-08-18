import { Modal } from 'antd';

import type { UploadFile } from 'antd/lib/upload/interface';

type IPreview = {
  file: UploadFile<any>; // 预览的视频
  visible: boolean;
};
type IProps = IPreview & {
  setPreview: React.Dispatch<React.SetStateAction<IPreview>>;
};

export default ({ file, visible, setPreview }: IProps) => {
  return visible ? (
    <Modal
      visible={visible}
      maskClosable
      closable
      footer={null}
      width="900px"
      style={{ top: '50%', transform: 'translate(0, -50%)' }}
      bodyStyle={{ padding: 0 }}
      onCancel={() => {
        setPreview((s) => ({
          ...s,
          visible: false,
        }));
      }}
    >
      {/* 部分浏览器只有静音状态才能播放。。。 */}
      <video
        muted={true}
        controls={true}
        preload="auto"
        style={{ width: '100%' }}
      >
        <source src={file.url || file.thumbUrl} type={file.type} />
        您的浏览器不支持 video 标签。
      </video>
    </Modal>
  ) : null;
};
