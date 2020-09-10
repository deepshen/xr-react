import React from 'react'
import {Form,Input,Button} from 'antd'

const {Item} = Form

const MyForm = props => {
  const {formData=[],...restProps} = props
  const form = Form.useForm()
  const config = {
    labelCol:{span:4},
    wrapperCol:{span:8}
  }
  const handleFinish = (values)=>{

  }
  return (
    <Form
      {...config}
      {...restProps}
      onFinish={handleFinish}
    >
      <Item
        label='name'
        name='name'
        rules={[
          {required: true, message: '请输入名称'}
        ]}
      >
        <Input />
      </Item>
      <Item label='age' name='age'>
        <Input />
      </Item>
      <Item wrapperCol={{offset:4}}>
        <Button style={{marginRight:20}}>取消</Button>
        <Button type='primary' htmlType='submit'>确定</Button>
      </Item>
    </Form>
  )
}

export default MyForm
