/* eslint-disable no-async-promise-executor */
import ImageViewer from '@/components/Viewer/ImageViewer';
import VideoViewer from '@/components/Viewer/VideoViewer';
import {
  DeleteOutlined,
  DownloadOutlined,
  FileOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import { Button, Image, message, Progress, Tooltip, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import { VideoThumb } from './containers/video';
import './index.less';
import { OSS } from './storage';
import {
  getBase64,
  getFileSize,
  isImg,
  isVideo,
  OSS_PIC_PARAM,
  verifyAccessType,
  verifyImgWidthAndHeight,
} from './utils';

import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadFileStatus,
  UploadProps,
} from 'antd/lib/upload/interface';
export const errorPic =
  'https://pulinway.oss-cn-shenzhen.aliyuncs.com/juyouwu/1646037345025.png';

type IOSS = {
  accessid: string;
  host: string;
  policy: string;
  signature: string;
  expire: number;
  dir: string;
};

type IPreview = {
  visible: boolean;
  current?: number;
};

type IPreviewVideo = {
  visible: boolean;
  file: UploadFile<any>;
};

type IProps = UploadProps & {
  limitQuality?: number; // 限制大小，单位MB
  limitImageWidth?: number; // 限制宽度
  limitImageHeight?: number; // 限制高度
  disabledReason?: string; // 禁止理由，用于提示
  showDelete?: boolean; // 显示删除按钮，默认显示
  showDownload?: boolean; // 显示下载按钮，默认显示
  showPreview?: boolean; // 显示预览按钮，默认显示，暂时只支持图片格式的预览
  onUploadSuccess: (files: UploadFile[]) => void; // 上传成功的回调
};

export default ({
  defaultFileList, // 默认已上传的文件
  accept = '', // 限制类型，多个用英文逗号“,”隔开，取值可以读取utils下的FILE_TYPE
  maxCount = 999, // 限制数量
  disabled,
  disabledReason,
  limitQuality,
  limitImageWidth,
  limitImageHeight,
  showDelete = true,
  showDownload = true,
  showPreview = true,
  onUploadSuccess,
}: IProps) => {
  const [OSSData, setOSSData] = useState<IOSS>({
    accessid: '',
    policy: '',
    signature: '',
    expire: 0,
    dir: '',
    host: '',
  });
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<IPreview>({
    visible: false,
  }); // 图片预览
  const [previewVideo, setPreviewVideo] = useState<IPreviewVideo>({
    visible: false,
    file: { url: '', uid: '', name: '视频' },
  }); // 视频预览

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getOSSConfig = ({
    onSuccess,
    onError,
  }: {
    onSuccess: () => void;
    onError: () => void;
  }) => {
    request('auth/ali_yun_sts', { method: 'post' })
      .then((res: { data: IOSS }) => {
        localStorage.setItem(OSS, JSON.stringify(res.data));
        setOSSData(res.data);
        onSuccess();
      })
      .catch(() => onError);
  };

  const getExtraData = (file: UploadFile) => {
    // console.log('--OSSData', OSSData);
    return {
      key: file.fileName,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  const beforeUpload = (file: RcFile) => {
    return new Promise(
      async (resolve: (v: RcFile) => void, reject: (v: string) => void) => {
        const now = Date.now();

        // 返回 false 或 Promise.reject 时，只用于拦截上传行为，不会阻止文件进入上传列表（原因）。如果需要阻止列表展现，可以通过返回 Upload.LIST_IGNORE 实现

        // if (maxCount) {
        //   const isCount = files.length >= maxCount;
        //   if (isCount) {
        //     message.error(`最多上传${maxCount}个文件`);
        //     return Upload.LIST_IGNORE;
        //   }
        // }

        if (accept) {
          const isAccept = verifyAccessType(file, accept);
          if (!isAccept) {
            message.error('文件格式不支持！');
            // return Upload.LIST_IGNORE;
          }
        }

        if (limitQuality) {
          const isLtM = file.size / 1024 / 1024 < limitQuality;
          if (!isLtM) {
            message.error(`文件大小不能超过${limitQuality}MB！`);
            // return Upload.LIST_IGNORE;
          }
        }

        if ((limitImageWidth || limitImageHeight) && isImg(file)) {
          const isValid = await verifyImgWidthAndHeight(file, {
            width: limitImageWidth,
            height: limitImageHeight,
          });
          if (!isValid) {
            message.error(
              `图片像素需为${limitImageWidth} x ${limitImageHeight}！`,
            );
            // return Upload.LIST_IGNORE;
          }
        }

        // @ts-ignore 拼接4位随机数，减少同时选择多个文件上传时导致的key相同，上传进度不更新问题
        // file.fileName = 'juyouwu/' + now + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

        // @ts-ignore
        file.fileName =
          'juyouwu/' + now + file.name?.slice(file.name.lastIndexOf('.'));

        const oss = localStorage.getItem(OSS);
        if (!oss) {
          getOSSConfig({
            onSuccess: () => resolve(file),
            onError: () => reject('配置获取失败'),
          });
        } else {
          const ossObj = JSON.parse(oss);
          if (!ossObj.expire || ossObj.expire * 1000 < now) {
            getOSSConfig({
              onSuccess: () => resolve(file),
              onError: () => reject('配置获取失败'),
            });
          } else {
            setOSSData(ossObj);
            resolve(file);
          }
        }
      },
    );
  };

  const onChange: (info: UploadChangeParam<any>) => void = async ({
    file,
    fileList,
  }) => {
    console.log('onChange fileList', fileList, file);
    if (!file.status || file.status === 'error') {
      message.error(`${file.name}上传失败`);
    }
    if (file.status === 'done') {
      onUploadSuccess(
        fileList
          .filter((v) => v.status === 'done')
          .map((v) =>
            v.originFileObj
              ? {
                  uid: v.uid,
                  status: v.status,
                  url: OSSData.host + '/' + v.fileName,
                  size: v.size,
                  name: v.name,
                  type: v.type,
                }
              : v,
          ),
      );
    }
    if (file.originFileObj) {
      const fileBase64 = (await getBase64(file.originFileObj)) as string;
      // 自定义itemRender时，file中不会生成thumbUrl
      file.thumbUrl = fileBase64;
    }
    setFiles(fileList);
  };

  const onPreview = (i: number) => {
    setPreviewImage({ visible: true, current: i });
  };

  const onRemove = (file: UploadFile) => {
    const filesRest = files.filter((v) => v.url !== file.url);
    onChange({ file, fileList: filesRest });
  };

  const onDownload = (file: UploadFile) => {
    // 存在 originFileObj 说明上传了，但是还没处理成完整地址
    const fileUrl = file.originFileObj
      ? `${OSSData.host + '/' + file.fileName}`
      : file.url;
    window.open(fileUrl);
  };

  useEffect(() => {
    if (Array.isArray(defaultFileList)) {
      const formatFiles = defaultFileList.map((v) => ({
        ...v,
        status: 'done' as UploadFileStatus,
      }));
      setFiles(formatFiles);
    }
  }, [defaultFileList]);

  return (
    <>
      <Upload
        // multiple // BUG: https://github.com/ant-design/ant-design/issues/26536
        accept={accept}
        action={OSSData.host}
        fileList={files}
        className="upload-wrap"
        disabled={disabled && !!disabledReason}
        data={getExtraData}
        onChange={onChange}
        beforeUpload={beforeUpload}
        itemRender={(_, file, currFileList) => {
          const hasError = !file.status || file.status === 'error';
          const isLoading = file.percent && file.percent < 100;
          // 如果是阿里云的图片则显示缩略图
          const imgUrl = file.url?.includes('aliyuncs')
            ? `${file.url}${OSS_PIC_PARAM.MINI}`
            : file.url;
          // 文件索引
          const currentIndex =
            currFileList.findIndex((f) => f.uid === file.uid) || 0;

          let content = <FileOutlined />;
          if (isImg(file)) {
            content = (
              <Image
                src={file.thumbUrl || imgUrl}
                fallback={errorPic}
                preview={showPreview ? { visible: false } : false}
                onClick={() => {
                  if (hasError) return;
                  onPreview(currentIndex);
                }}
              />
            );
          } else if (isVideo(file)) {
            content = (
              <VideoThumb
                file={file}
                currentIndex={currentIndex}
                onClick={() => {
                  if (hasError) return;
                  setPreviewVideo({
                    visible: true,
                    file,
                  });
                }}
              />
            );
          }

          return (
            <Tooltip
              title="上传错误"
              visible={hasError}
              // @ts-ignore
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              <div
                key={file.uid}
                className={`${hasError ? 'upload-card error' : 'upload-card'}`}
              >
                <div className="left-content">
                  <div className="icon-wrap">
                    {isLoading ? <LoadingOutlined width={20} /> : content}
                  </div>
                  <div className="mid-content">
                    <ProFormText
                      name="picName"
                      label=""
                      placeholder="不填不改"
                      className="picture-name"
                      wrapperCol={{ span: 24, offset: 0 }}
                      fieldProps={{
                        defaultValue: `${
                          file.name ||
                          file.url?.slice(file.url.lastIndexOf('/') + 1) ||
                          ''
                        } ${hasError ? '(上传错误)' : ''}`,
                        bordered: false,
                        allowClear: false,
                        autoComplete: 'false',
                        readOnly: true, // TODO 编辑图片名字
                        style: {
                          flex: 1,
                          fontSize: '12px',
                          color: hasError ? '#ff4d4f' : '#000',
                        },
                      }}
                    />
                    {isLoading ? (
                      <Progress
                        percent={Number(file.percent?.toFixed(2))}
                        size="small"
                      />
                    ) : (
                      <>
                        <div className="file-info">
                          大小：{getFileSize(file)}
                        </div>
                        <div className="file-info">
                          类型：{file.type || '-'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  {showDownload && (
                    <DownloadOutlined
                      className="right-button"
                      title="下载"
                      disabled={file.status !== 'done'}
                      onClick={() => onDownload(file)}
                    />
                  )}
                  {showDelete && (
                    <DeleteOutlined
                      className="right-button"
                      title="删除"
                      onClick={() => onRemove(file)}
                    />
                  )}
                </div>
              </div>
            </Tooltip>
          );
        }}
      >
        {files.length < maxCount && (
          <Button
            onClick={() => {
              // 禁止上传并且需要提示
              if (disabled && !!disabledReason) {
                message.error(disabledReason);
              }
            }}
            // 禁止上传但不需要提示
            disabled={disabled && !disabledReason}
            icon={<UploadOutlined />}
          >
            上传
          </Button>
        )}
      </Upload>
      {/* 图片预览组件 */}
      {previewImage.visible && (
        <ImageViewer
          {...previewImage}
          files={files.filter((f) => f.status && f.status === 'done')}
          setPreview={setPreviewImage}
        />
      )}
      {/* 视频预览组件 */}
      {previewVideo.visible && (
        <VideoViewer
          file={previewVideo.file}
          visible={previewVideo.visible}
          setPreview={setPreviewVideo}
        />
      )}
    </>
  );
};
