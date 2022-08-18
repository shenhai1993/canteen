/* eslint-disable react/no-array-index-key */
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';

export type MyStatisticProps = {
  /**
   * 需要展示的数据
   */
  items?: StatisticProps[];
  /**
   * 间距
   * @default 16
   */
  gutter?: number;
};

export const MyStatistic = (props: MyStatisticProps) => {
  return props.items ? (
    <div style={{ paddingBottom: '20px' }}>
      <Row gutter={props.gutter ?? 16}>
        {props.items?.map((item, index) => {
          return (
            <Col span={4} key={index} style={{ paddingTop: '10px' }}>
              <Statistic {...item} />
            </Col>
          );
        })}
      </Row>
    </div>
  ) : (
    <></>
  );
};
