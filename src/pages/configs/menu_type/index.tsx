import { MySettingForm, useListPage } from '@/cc';
import {
  ProCard,
  ProFormInstance,
  ProFormText,
  ProFormTimePicker
} from '@ant-design/pro-components';
import moment from 'moment';
import { request } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { useRef, useState } from 'react';
import OForm from './components/Form'
import {notification} from 'antd'
const format = 'HH:mm';
const initialValues = {
  order_at:{
    before_days:'',
    before_time:'21:01'
  },
  use_at:{
    breakfast: {},
    lunch: {},
    dinner: {},
    midnight: {}
  }
 }
 let getDefauleData:any = {}
export default () => {
  const [getLog,setLog] = useState(false)
  const formRef = useRef<ProFormInstance<any>>();

  const { actions,table } = useListPage(
    {
      baseUri: 'menu_types',
      otherApi: {
        list: () => {
          getConfigs()
        },
      },
    },
  );
  const getConfigs = () =>{
    request('configs/get', {
      data: {key:'menu_type' },
    }).then((res) => {
      setLog(true)
      if(res.data){
        getDefauleData = res.data
        formRef?.current?.setFieldsValue(res.data);
        console.log(getDefauleData,'res')
      } else {
        formRef?.current?.setFieldsValue(initialValues)
      }
     
    });
  }
  const onSave = (data:any) =>{
    request('configs/save', {
      data: {key:'menu_type',value:JSON.stringify(data) },
    }).then((res) => {
      if(res.code == 0){
        openNotificationWithIcon()
      }
      console.log(res,'res')
    });
  }

  const openNotificationWithIcon = () => {
    notification['success']({
      message: '提示',
      description:'保存成功！'
    });
  };

  return (
    <PageContainer
      title={false}
      content={
        <ProCard type="inner" title="餐补配置" bordered>
          <MySettingForm
            formRef={formRef}
            onFinish={(values: any) => {
              let data = formRef?.current?.getFieldsValue()
              console.log(values,'data')
              if(values.order_at.before_time.length > 10){
                values.order_at.before_time = values.order_at.before_time.substring(11,16)
              }
              Object.keys(values.use_at).forEach((k) => {
                if(values.use_at[k].enable){
                  if(values.use_at[k].start_time.length > 10){
                    values.use_at[k].start_time = values.use_at[k].start_time.substring(11,16)
                  }
                  if( values.use_at[k].end_time.length > 10){
                    values.use_at[k].end_time = values.use_at[k].end_time.substring(11,16)
                  }
                }
              })
              console.log('values', values);
              // actions?.update(values);
              onSave(values)
              return Promise.resolve();
            }}
          >
            {getLog?<>
              <div className='MealTonicItem'>
                <div className='label'>订餐时间：</div>
                <div><ProFormText fieldProps={{addonBefore:'前',style:{width:'150px'}}} rules={[
                    {
                        required: true,
                        message: '请设置！',
                    },
                ]} name={['order_at','before_days']} /></div>
                <div className="day">天的</div>
                <div>
                    <ProFormTimePicker name={['order_at','before_time']} rules={[
                        {
                            required: true,
                            message: '请设置！',
                        },
                    ]} fieldProps={{defaultValue:getDefauleData?.order_at?.before_time,format:format,style:{width:'150px'}}} />
                </div>
            </div>
              <OForm.ConfigForm label="早餐" name='breakfast' defaulet={getDefauleData?.use_at?.breakfast} />
              <OForm.ConfigForm label="午餐" name='lunch' defaulet={getDefauleData?.use_at?.lunch} />
              <OForm.ConfigForm label="晚餐" name='dinner' defaulet={getDefauleData?.use_at?.dinner} />
              <OForm.ConfigForm label="宵夜" name='night' defaulet={getDefauleData?.use_at?.midnight} />
            </>:''}
            
          </MySettingForm>
        </ProCard>
      }
    />
  );
}
