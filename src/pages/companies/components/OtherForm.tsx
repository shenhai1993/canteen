
import {
    ProFormText,
    ProFormSwitch,
  } from '@ant-design/pro-components';
import { Col, Row,Form,Calendar} from 'antd';
import { MyProFormRadioGroup } from '@/cc';
import { useState } from 'react';
const subsidy_enable = ({subsidy_enable}:any) => {
    const [getShow,setShow] = useState(subsidy_enable)
    console.log(subsidy_enable,'subsidy_enable')
    return <>
       <Form.Item label="补贴设置">
        <ProFormSwitch
        name="subsidy_enable"
        fieldProps={{
            onChange:(value:any) => {
                console.log(value,'测试32')
                setShow(value)
            }
        }}
      />{
        getShow?<>
        <ProFormText fieldProps={{addonBefore:'¥'}} name={['subsidy_json','company']} placeholder="企业月总额" label="企业月总额"  />
            <ProFormText fieldProps={{addonBefore:'¥'}} name={['subsidy_json','person']} placeholder="单人月总额" label="单人月总额"  />
            <div className='subsidy_style'>
                <div className="label">单人单次：</div>
                <div className="value"><ProFormText 
                    name={['subsidy_json','daily','breakfast']}
                    placeholder="早餐"
                    fieldProps={{
                        addonBefore:'早餐',
                        style:{
                            width:'120px'
                        }
                    }}
                    />
                </div>
                <div className="value"><ProFormText 
                    name={['subsidy_json','daily','lunch']} 
                    placeholder="中餐"
                    fieldProps={{
                        addonBefore:'中餐',
                        style:{
                            width:'120px'
                        }
                    }} 
                    />
                </div>
                <div className="value"><ProFormText 
                    name={['subsidy_json','daily','dinner']}  
                    placeholder="晚餐"
                    fieldProps={{
                        addonBefore:'晚餐',
                        style:{
                            width:'120px'
                        }
                    }} 
                /></div>
                <div className="value"><ProFormText 
                    name={['subsidy_json','daily','midnight']} 
                    placeholder="夜宵"
                    fieldProps={{
                        addonBefore:'夜宵',
                        style:{
                            width:'120px'
                        }
                    }} 
                /></div>
            </div>
        </>:''
      }
        </Form.Item>
    </>
}

const DiscountSelect = ({label,name1,name2}:any) => {
    const [getType, setType] = useState('1');
    console.log(name1,'name1')
    return <Row>
        <Col span={10}>
            <MyProFormRadioGroup
                name={name1}
                label={label}
                fieldProps={{
                    buttonStyle: 'solid',
                    onChange:(e)=>{
                        setType(e.target.value)
                        console.log(e)
                    }
                }}
                
                options={[
                    {
                    label: '固定金额',
                    value: '1',
                    },
                    {
                    label: '百分比',
                    value: '2',
                    },
                ]}
            />
        </Col>
        <Col span={14}><ProFormText 
            name={name2}
            placeholder="请输入具体金额 或 百分比" />
        </Col>
    </Row>
}

const discount_enable = ({discount_enable}:any) => {
    const [getShow,setShow] = useState(discount_enable)
    return <>
        <Form.Item label="折扣设置">
            <ProFormSwitch 
                name="discount_enable" 
                fieldProps={{
                onChange:(value:any) => {
                    setShow(value)
                }
            }} />
            {getShow?<>
                <DiscountSelect label="早餐" name1={['discount_json','breakfast','type']} name2={['discount_json','breakfast','value']} />
                <DiscountSelect label="午餐" name1={['discount_json','lunch','type']} name2={['discount_json','lunch','value']} />
                <DiscountSelect label="晚餐" name1={['discount_json','dinner','type']} name2={['discount_json','dinner','value']} />
            </>:''}
            
        </Form.Item>
    </>
}

const OtherForm: {
    subsidy_enable: typeof subsidy_enable
    discount_enable: typeof discount_enable
} = {} as any;
OtherForm.subsidy_enable = subsidy_enable;
OtherForm.discount_enable = discount_enable;
export default OtherForm;