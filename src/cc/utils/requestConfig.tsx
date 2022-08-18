import { message as msg, notification } from 'antd';
import type { RequestConfig } from 'umi';
import { history } from 'umi';

const downloadFileFun = (disposition: string, data: any) => {
  const blob = new Blob([data]);
  const start = "filename*=utf-8''";
  let fileName = '';
  if (disposition.includes(start)) {
    fileName = disposition.substr(disposition.indexOf(start) + start.length);
    fileName = decodeURI(fileName);
  }
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink: any = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    // navigator.msSaveBlob(blob, fileName);
  }
};
export const requestConfig: RequestConfig = {
  timeout: 10000,
  method: 'post',
  baseURL: process.env.BASE_URL,
  errorConfig: {
    
    errorHandler(res: any) {
      if (res) {
        const { code, message, description, type } = res;
        switch (type) {
          case '2':
            msg.error(message);
            break;
          default:
            notification.error({
              message: message,
              description: description,
            });
            break;
        }
        switch (code) {
          case 10000:
            if (history.location.pathname !== '/login') history.push('/login');
            break;
        }
      }
    },
    errorThrower(err) {
      console.log('errorThrower', err);
    },
  },
  requestInterceptors: [
    [
      (url: string, options: any) => {
        return {
          url: url,
          options: {
            ...options,
            headers: {
              authorization:
                'Bearer ' +
                localStorage.getItem(process.env.TOKEN_NAME as string),
            },
          },
        };
      },
    ],
  ],
  responseInterceptors: [
    (response:any) => {
      const { data = {} as any,headers, config } = response;
      if (headers['content-disposition']) {
        downloadFileFun(headers['content-disposition'], response.data);
        return false;
      }
      if (data.code !== 0 && data.type!=='application/vnd.ms-excel') return Promise.reject(response.data);
      return response;
    },
  ],
};
