import React from "react"
import {Form, Input} from "antd";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const CreateForm =(props)=>{
  return (
      <Form {...layout} name="nest-messages" onFinish={props.onCreateDemo} validateMessages={validateMessages}>
      <Form.Item
          name={['demo', 'title']}
          label="Name"
          rules={[
              {
                  required: true,
              },
          ]}
      >
          <Input />
      </Form.Item>

      <Form.Item name={['user', 'body']} label="Description">
          <Input.TextArea />
      </Form.Item>
  </Form>  )
}
export default CreateForm;