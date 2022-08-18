import type { MyModalRefType } from '@/cc/typings';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useRef } from 'react';
import { MyLoading } from '../MyLoading';
import { MyModal } from '../MyModal';

export const MyModalRefContext = React.createContext({});

export const MyRootProvider = (props: any) => {
  const ref = useRef<MyModalRefType>();

  return (
    <ConfigProvider locale={zhCN}>
      <MyLoading count={0} />
      <MyModalRefContext.Provider value={ref}>
        <MyModal ref={ref} />
        {props.container}
      </MyModalRefContext.Provider>
    </ConfigProvider>
  );
};
