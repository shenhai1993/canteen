import { Calendar} from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import type { Moment } from 'moment';
import React, { useState,useEffect } from 'react';
let zlist:any = []
let mo:string = '' //当前月份
let ye:string = '' //当前年份
const getDateDay = (date:any) => { //获取日期
  let data_date:any = new Date(date)
  let y = data_date.getFullYear()
  let m = data_date.getMonth()+1
  let d = data_date.getDate() 
  let day = y+'/'+(m<10?'0'+m:m)+'/'+(d<10?'0'+d:d)
  return {day:day,mo:m,ye:y}
}
const getCalendar = ({onChange}:any) => {
  const [dayList,setdayList] = useState<any>([])
  
  useEffect(() => {
    zlist = []
    mo = ''
    ye = ''
    console.log(zlist,'zlist2')
  },[])
  const onSelect = (value: Moment) => {
    let date = getDateDay(value)
    if(mo !='' && (mo != date.mo || ye != date.ye)){
      mo = date.mo
      ye = date.ye
      return false
    }
    if(dayList.length > 0){
      if(dayList.indexOf(date.day) > -1){
        dayList.map((res:string,index:number) => {
          if(date.day == res){
            zlist.splice(index,1)
            setdayList(zlist)
          }
        })  
      } else {
        zlist.push(date.day)
        mo = date.mo
        ye = date.ye
        setdayList(zlist)
      }
    } else {
      mo = date.mo
      ye = date.ye
      zlist.push(date.day)
      setdayList(zlist)
    }
    onChange(zlist)
  };
  const dateCellRender = (value: Moment) => {
    let selectDay = getDateDay(value)
    if(dayList.indexOf(selectDay.day) > -1){
      return <div className='SelectCalendar' key={selectDay.day}><CheckCircleFilled style={{color:'#1890ff',fontSize:'17px'}} /> <span>已选择</span></div>
    } else {
      return ''
    }
  };
  return <Calendar onChange={onSelect} dateCellRender={dateCellRender} />
}

const TCalendar: {
    getCalendar: typeof getCalendar
} = {} as any;
TCalendar.getCalendar = getCalendar;
export default TCalendar;