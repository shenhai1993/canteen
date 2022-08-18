import {MyButton, MyImport, MyPagination, useListPage} from '@/cc';
import { PageContainer } from '@ant-design/pro-layout';
import {ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { Table ,Tabs,Row,Col,PageHeader,Button,Card,Statistic,notification,Modal} from 'antd';
import { history,request,useSearchParams } from 'umi';
import {Update} from "./modals/Update";
import { PlusOutlined } from '@ant-design/icons';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import XTree from '@/components/XTree'
const weekArr = ['周日','周一','周二','周三','周四','周五','周六']
let CruuId:any = ''
export default () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { TabPane } = Tabs;
  const time_slot_id:any = localStorage.getItem('id')
  const moment:any = localStorage.getItem('timeSlot')
  const [getCid,setCid] = useState<any>('')
  const [getShowData,setShowData] = useState<any>({})
  const [getMunuData,setMunuData] = useState<any>([])
  const {  modalRef, actions, columns, pagination} = useListPage(
    {
      baseUri: 'companies',
      otherApi: {
        list: () => {
          getHeaderShow()
        },
      },
    },
  );
  useEffect(() => {
    console.log(searchParams.get('id'),'history')
  },[])
  const getHeaderShow = () =>{
    request('menu_batches/show', {
      data: {id:searchParams.get('id') },
    }).then((res) => {
      if(res.code == 0){
        setShowData(res.data)
      }
      console.log(res,'res')
    });
  }
  const getShow = (id:number) => { //菜单
    request('menus/show', {
      data: {menu_batches_id:searchParams.get('id'),companies_id:id },
    }).then((res) => {
      if(res.code == 0){
        setMunuData(res.data)
      }
      console.log(res,'res')
    });
  }

  const onDeleteFun = (id:number) => {
    request('menu_days/delete', {
      data: {id:id },
    }).then((res) => {
      if(res.code == 0){
        getHeaderShow()
        getShow(CruuId)
      }
      console.log(res,'res')
    });
  }

  const onClear = () => {//清除
    if(!CruuId){
      onNotification('warning','请先选择左侧公司！')
      return false
    }
    Modal.confirm({
      title: '提示',
      content: '确定清空菜单？将不可恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk:() => {
        request('menus/clear', {
          data: {menu_batches_id:searchParams.get('id'), companies_id:CruuId},
        }).then((res) => {
          if(res.code == 0){
            onNotification('success','清除成功！')
            getHeaderShow()
            getShow(CruuId)
          }
        });
      }
    });
    
  }

const onNotification = (type:NotificationType,des:string) => {
  notification[type]({
    message: '提示',
    description:des
  });
}

  const substringStr = (day:string) => {
    return day.substring(5,10)
  }

  const MunuColumns:any = [
    {
      title:'日期',
      render: (_: any, record: any) => {
        let day = new Date(record.day).getDay()
        return `${record.day}(${weekArr[day]})`
      }
    },
    {
      title:'早餐',
      render: (_: any, record: any) => {
        if(record.早餐){
          return <> {
            record.早餐.map((res:any) => {
              return <div style={{fontSize:'12px'}}><span style={{color:'#f00',padding:'0 5px 0 0'}}>¥{res[0]}</span>{res[1]}</div>
            }) 
          }</>
        }
      }
    },
    {
      title:'午餐',
      render: (_: any, record: any) => {
        if(record.午餐){
          return <> {
            record.午餐.map((res:any) => {
              return <div style={{fontSize:'12px'}}><span style={{color:'#f00',padding:'0 5px 0 0'}}>¥{res[0]}</span>{res[1]}</div>
            }) 
          }</>
        }
      }
    },
    {
      title:'晚餐',
      render: (_: any, record: any) => {
       if(record.晚餐){
        return <> {
          record.晚餐.map((res:any) => {
            return <div style={{fontSize:'12px'}}><span style={{color:'#f00',padding:'0 5px 0 0'}}>¥{res[0]}</span>{res[1]}</div>
          }) 
        }</>
       }
      }
    },
    {
      title:'宵夜',
      render: (_: any, record: any) => {
        if(record.宵夜){
          return <>{
            record.宵夜.map((res:any) => {
              return <div style={{fontSize:'12px'}}><span style={{color:'#f00',padding:'0 5px 0 0'}}>¥{res[0]}</span>{res[1]}</div>
            }) 
          }</>
        }
      }
    }
  ]


  return (
    <PageContainer
      title={getShowData.name}
      content={
      <>
        <Card style={{marginBottom:'20px'}}>
          <Row>
          {getShowData?.menu_days?
                getShowData?.menu_days.map((res:any,index:number) => {
                  return <Col span={3} key={'week_'+index} style={{textAlign:'center'}}>
                    <Statistic title={'周'+res.week} value={substringStr(res.day)}/>
                    <MyButton.Delete
                        key={'delete_' + index}
                        onConfirm={() => onDeleteFun(res.id)}
                      />
                  </Col>
                })
              :''
            }
          </Row>
          </Card>
          <Tabs defaultActiveKey="0" type="card">
            <TabPane tab="配置菜单" key="0">
              <div style={{padding:'20px 0'}}>
                <Row gutter={20}>
                    <Col span={5}>
                      <div key="trees_body" style={{padding:'20px 0',backgroundColor:'#fff'}}>
                        <XTree.Myenterprise actions={{menu_batches_id:searchParams.get('id')}} onChange={(e:any) => {
                          if(e.length > 0){
                            CruuId = e[0].toString()
                            setCid(e[0])
                            getShow(e[0])
                          }
                          console.log(e,'cdscds')
                        }} />
                      </div>
                    </Col>
                    <Col span={19}>
                      <div key="tables_body" style={{padding:'20px',backgroundColor:'#fff'}}>
                        <div style={{marginBottom:'10px'}}>
                          <MyButton.BatchImportBtn
                            key="import"
                            title="导入（覆盖）"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              modalRef.current?.showModal({
                                title: '导入与下载模版',
                                child: <MyImport actions={{type:'custom',ApiUrl:'menus/batch_store',menu_batches_id:searchParams.get('id'),companies_id:getCid }} onChange={() => {
                                  getShow(CruuId)
                                  modalRef.current?.hideModal();
                                }} />,
                              })
                            }
                          />
                          <Button style={{marginLeft:'10px'}} type='primary' onClick={() => onClear()}>清空菜单</Button>
                        </div>
                        <Table rowKey="day" pagination={false} bordered columns={MunuColumns} dataSource={getMunuData} />
                      </div>
                    </Col>
                  </Row> 
              </div>
            </TabPane>
          </Tabs>
      </>
    } />
  );
}
