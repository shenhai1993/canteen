import type { RcFile, UploadFile } from 'antd/lib/upload/interface';

export const FILE_TYPE = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  WEBP: 'image/webp',
  IMAGE: 'image/*',
  AUDIO: 'audio/*',
  VIDEO: 'video/*',
  ZIP: 'application/x-zip-compressed,application/x-zip,application/zip',
  RAR: '.rar,application/x-rar', // 'application/octet-stream',
  XLS: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx',
  PDF: 'application/pdf',
};

// 阿里云图片参数设置
export const OSS_PIC_PARAM = {
  MINI: '?x-oss-process=image/resize,w_200,m_lfit/quality,q_90', // 压缩图片
};

export const getBase64 = (file: UploadFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader() as any;
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error: any) => reject(error);
  });
};

export const getFileSize = (file: UploadFile) => {
  if (!file.size) return '-';
  const m = Math.round(file.size / 1024 / 1024);
  if (m <= 0) {
    const k = Math.round(file.size / 1024);
    if (k <= 0) {
      return `${k}字节`;
    }
    return `${k}KB`;
  }
  return `${m}MB`;
};

export const isImg: (file: UploadFile) => boolean = (file) => {
  if (!file) return false;
  const con1 = !!['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif'].find(
    (v) => file.url?.endsWith(v) || file.url?.endsWith(v.toUpperCase()),
  );
  const con2 = !!file.type?.startsWith('image/');
  return con1 || con2;
};

export const isVideo: (file: UploadFile) => boolean = (file) => {
  if (!file) return false;
  const con1 = !!['.mp4', '.3gp', '.mov', '.wmv', '.asf', '.asx'].find(
    (v) => file.url?.endsWith(v) || file.url?.endsWith(v.toUpperCase()),
  );
  const con2 = !!file.type?.startsWith('video/');
  return con1 || con2;
};

// 校验图片宽高
export const verifyImgWidthAndHeight: (
  file: RcFile,
  limit: {
    width?: number;
    height?: number;
  },
) => Promise<unknown> = (file, limit) => {
  return new Promise((resolve, reject) => {
    const { width, height } = limit;

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data: string = reader.result as string;
      // @ts-ignore
      const image = new Image();
      image.onload = () => {
        const imageWidth = image.width;
        const imageHeight = image.height;
        if (imageWidth !== width || imageHeight !== height) {
          reject(false);
        } else {
          resolve(true);
        }
      };
      image.src = data;
    };
  });
};

// 校验文件类型
export const verifyAccessType: (file: RcFile, accept: string) => boolean = (
  file,
  accept,
) => {
  // 获取到 .rar文件 的 file.type 值为''
  const isAccept = accept.split(',').some((type) => {
    if (!file.type || file.type === type) return true;
    // 处理accept如‘image/*’、‘audio/*’、‘video/*’的类型
    const accepts = type.split('/');
    if (
      accepts.length === 2 &&
      file.type.startsWith(accepts[0]) &&
      accepts[1] === '*'
    ) {
      return true;
    }
    return false;
  });

  return isAccept;
};
