import { PlaySquareOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/lib/upload/interface';
import { useState } from 'react';

export const VideoThumb = ({
  file,
  currentIndex,
  onClick,
}: {
  file: UploadFile<any>;
  currentIndex: number;
  onClick: () => void;
}) => {
  const [showPlayIcon, setShowPlayIcon] = useState({
    visible: false,
    current: 0,
  }); // 显示预览视频图标

  return (
    <div
      className="video-mask"
      onClick={onClick}
      onMouseEnter={() => {
        setShowPlayIcon({
          visible: true,
          current: currentIndex,
        });
      }}
      onMouseLeave={() => {
        setShowPlayIcon({
          visible: false,
          current: 0,
        });
      }}
    >
      <video preload="meta" src={file.url || file.thumbUrl} />
      {showPlayIcon.visible && showPlayIcon.current === currentIndex && (
        <span className="video-play-icon">
          <PlaySquareOutlined /> 播放
        </span>
      )}
    </div>
  );
};
