/* eslint-disable react/jsx-key */
import { Spin } from 'antd';
import './index.less';

export type MyLoadingProps = {
  /**
   * 当前请求数，大于0，会显示loading
   * @default 0
   */
  count?: number;
};

export const MyLoading = ({ count = 1 }: MyLoadingProps) => {
  return (
    <>
      {count > 0 && (
        <div className="my-loading">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};
