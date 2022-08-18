import {MyModalDataContext, MyModalForm, useListPage} from '@/cc';
import { ProFormInstance, ProFormText } from '@ant-design/pro-components';
import {useContext, useEffect, useRef, useState} from 'react';
import {Col, message, Row} from 'antd';
import { Upload, Button, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { read, utils, writeFileXLSX } from 'xlsx'
import { exportExcel, importExcel } from '@/services/AuthController';
import {request} from "@@/exports";
export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);
  const time_slot_id:any = localStorage.getItem('id')
  const [params, setParams] = useState({company_id: item?.id || 0,time_slot_id: time_slot_id})
  const getCompany = async () => {
    const res = await request('company_menus/list', { method: 'post' ,data:{...params}});
    if (res.code === 0) return res.data;
  };
  console.log(getCompany())
  const [tabledata, setTabledata] = useState<Array<any>>([]);
  const columns = [
    {
      title: '公司id',
      dataIndex: 'company_id',
      key: 'company_id',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '餐别',
      dataIndex: 'menu_type',
      key: 'menu_type',
      render:(text: any, record: any)=>[
        <div>{text==='breakfast'?'早餐':text==='lunch'?'午餐':text==='dinner'?'晚餐':'夜宵'}</div>
      ]
    },
    {
      title: '菜单',
      dataIndex: 'content',
      key: 'content',
    },{
      title: '价格(元)',
      dataIndex: 'price',
      key: 'price',
    }
  ];
  //上传
  const files: any = {
    beforeUpload: (file: any) => {
      let formData = new FormData()
      formData.append('file', file);
      importExcel(formData).then((res)=>{
        setTabledata(res.data)
      })
      /*let reader = new FileReader()
      reader.readAsBinaryString(file)//读取这个文件
      reader.onload = function (event:any) {
        let {result} = event.target
        let xlsxdata = read(result, { type: 'binary' })
        for (let n in xlsxdata.Sheets) {//这里是多张表格 所以写一个循环
          let col = utils.sheet_to_json(xlsxdata.Sheets[n], { header: 1, defval: '', blankrows: true })//解析为数组
          console.log(col)
          col.splice(0, 1); // 去掉表
          setTabledata(col)
        }
      }*/
      return false;
    },
  };
  // 下载excle菜单文件
  const onDownloadFun = async () => {
    const id:any = localStorage.getItem('id')
    const params:any = {timeSlot_id: id,company_id: item?.id || 0}
    exportExcel(params).then((response) => {
      const blob = new Blob([response],{type: 'application/vnd.ms-excel;charset=utf-8'});
      const fileName =  'fileName' || 'filename.xls';
      const linkNode = document.createElement('a');
      linkNode.download = fileName; //a标签的download属性规定下载文件的名称
      linkNode.style.display = 'none';
      linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
      document.body.appendChild(linkNode);
      linkNode.click();  //模拟在按钮上的一次鼠标单击
      URL.revokeObjectURL(linkNode.href); // 释放URL 对象
      document.body.removeChild(linkNode);
    })
  };
  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        // 所有企业的id 为0 餐补状态为0 折扣设置为0
        values.company_id = item?.id || 0
        values.menu_info = tabledata
        values.subsidy_enable = item?.subsidy_enable || 0
        values.discount_enable = item?.discount_enable || 0
        request('company_menus/store', { method: 'post' ,data:{...values}}).then(()=>{
          message.success('保存成功！');
        })
        //先多个行请求，没想好怎么改组件
        props.actions?.list({  });
        return Promise.resolve();
      }}>
      <ProFormText name="name" placeholder="名称" label="名称" />
      {tabledata.length>0?<Table dataSource={tabledata} columns={columns} />:''}
      <Row gutter={16}>
        <Col span={6} ><div className='ant-form-item-label' style={{width: '100%', }}>重新上传菜单：</div></Col>
        <Col span={6}>
          <Upload {...files} maxCount={1} showUploadList={true}>
            <Button icon={<UploadOutlined />} style={{marginRight: '20px', }}>选择文件</Button>
          </Upload>
        </Col>
        <Col span={4}>
          <Button key="DownloadButton" onClick={() => onDownloadFun()}>
            下载模版
          </Button>
        </Col>
      </Row>

    </MyModalForm>
  );
};
