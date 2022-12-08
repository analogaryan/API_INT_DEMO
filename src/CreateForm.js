import React from "react"
import {Button, Form, Input} from "antd";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const CreateForm =(props)=>{
    const onCreateDemo = (values)=>{
        console.log(values,"values")
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
  return (
      <Form  {...layout} name="nest-messages" onFinish={onCreateDemo} >
      <Form.Item
          name={['demo', 'title']}
          label="title"
          rules={[
              {
                  required: true,
                  message : "please enter title"
              },
          ]}
      >
          <Input />
      </Form.Item>

      <Form.Item name={['user', 'body']} label="Description">
          <Input.TextArea />
      </Form.Item>
          <Form.Item
              wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
              }}
          >
              <Button type="primary" htmlType="submit">
                  Submit
              </Button>
          </Form.Item>
  </Form>  )
}
export default CreateForm;