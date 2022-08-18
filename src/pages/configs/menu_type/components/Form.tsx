import {
    ProFormText,
    ProFormSwitch,
    ProFormTimePicker
  } from '@ant-design/pro-components';
import React,{ useState,useEffect } from 'react';
import { TimePicker,Form } from 'antd';
import moment from 'moment';
const format = 'HH:mm';
const ConfigForm = ({label,name,defaulet}:any) => {
    console.log(defaulet,'defaulet2')
    useEffect(() => {
        console.log(defaulet?.order_at?.before_time,'defaulet')
      },[defaulet])
    const [it_status,set_it_status] = useState(false)
    return <>
        <ProFormSwitch label={label} name={['use_at',name,'enable']} fieldProps={{onChange:(e)=>{set_it_status(e)}}} />
        <div>
            {/* <div className='MealTonicItem'>
                <div className='label'>订餐时间：</div>
                <div><ProFormText fieldProps={{addonBefore:'前',style:{width:'150px'}}} rules={[
                    {
                        required: it_status,
                        message: '请设置！',
                    },
                ]} name={[name,'order_at','before_days']} /></div>
                <div className="day">天的</div>
                <div>
                    <ProFormTimePicker name={[name,'order_at','before_time']} rules={[
                        {
                            required: it_status,
                            message: '请设置！',
                        },
                    ]} fieldProps={{defaultValue:moment(defaulet?.order_at?.before_time,format),format:format,style:{width:'150px'}}} />
                </div>
            </div> */}
            <div className='MealTonicItem'>
                <div className='label'>用餐时间：</div>
                <div><ProFormTimePicker name={['use_at',name,'start_time']} rules={[
                    {
                        required: it_status,
                        message: '请设置！',
                    },
                ]} fieldProps={{format:format,style:{width:'150px'},defaultValue:defaulet?.use_at?.start_time}}/></div>
                <div className="day">到</div>
                <div><ProFormTimePicker name={['use_at',name,'end_time']} rules={[
                    {
                        required: it_status,
                        message: '请设置！',
                    },
                ]} fieldProps={{format:format,style:{width:'150px'},defaultValue:defaulet?.use_at?.end_time}}/></div>
            </div>
        </div>
    </>
}

const OForm: {
    ConfigForm: typeof ConfigForm
} = {} as any;
OForm.ConfigForm = ConfigForm;
export default OForm;