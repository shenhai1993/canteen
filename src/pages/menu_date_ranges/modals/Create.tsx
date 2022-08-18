import { MyModalForm } from '@/cc';
import { ProFormText } from '@ant-design/pro-components';
import ShowCalendar from '../components/ShowCalendar'

export const Create = (props: any) => {
  let dayArr:any = []
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store({...values,...{days:dayArr}});
        return Promise.resolve();
      }}
    >
      <ProFormText
        rules={[{ required: true, message: '请设置名称！', },]}
        name="name"
        placeholder="请设置名称"
        label="名称"
      />
      <ShowCalendar.getCalendar onChange={(e:any) => {
        dayArr = e
      }} />
    </MyModalForm>
  );
};
