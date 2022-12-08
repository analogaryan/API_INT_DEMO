import React, {useEffect} from "react"
import {Button, Form, Input} from "antd";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const UpdateForm =(props)=>{
    useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => response.json())
        .then((json) => console.log(json));
})

    const onCreateDemo = (values)=>{
        console.log(values,"values")
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: values.demo.title,
                body: values.demo.body,
                userId: values.demo.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => props.setEditionModal(false));
    }
    return (
        <Form  {...layout} name="nest-messages" onFinish={onCreateDemo} >
            <Form.Item
                name={['demo', 'userId']}
                label="title"
                hidden={true}

            >
                <Input value ={1} hidden/>
            </Form.Item>
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

            <Form.Item name={['demo', 'body']} label="Description">
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
export default UpdateForm;