import { Image } from 'antd';

import type { UploadFile } from 'antd/lib/upload/interface';

type IPreview = {
  visible: boolean;
  current?: number;
};
type IProps = {
  files: UploadFile<any>[]; // 预览的图片列表
  visible: boolean; // 是否显示预览
  current?: number; // 预览的图片数组下标
  setPreview: React.Dispatch<React.SetStateAction<IPreview>>;
};

export default ({ files, visible, current, setPreview }: IProps) => {
  return (
    <div style={{ display: 'none' }}>
      <Image.PreviewGroup
        preview={{
          visible: visible,
          current: current || 0,
          onVisibleChange: (vis) => setPreview((s) => ({ ...s, visible: vis })),
        }}
      >
        {files.map((f) => (
          <Image src={f.thumbUrl || f.url} key={f.uid} />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};
