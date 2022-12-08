import React, {useEffect, useState} from "react"
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
    fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
        .then((response) => response.json())
        .then((json) => console.log(json,"json") );


    },[])

    const onUpdateDemo = (values)=>{
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
        <Form  {...layout} name="nest-messages" onFinish={onUpdateDemo} >
            <Form.Item
                name={[ 'userId']}
                label=""
                hidden={true}

            >
                <Input value ={1} hidden/>
            </Form.Item>
            <Form.Item
                name={['title']}
                label="Title"
                rules={[
                    {
                        required: true,
                        message : "please enter title"
                    },
                ]}
            >
                <Input onChange = {(e)=>props.setEnteredTitle(e.target.value)} defaultValue={props.title} />
            </Form.Item>

            <Form.Item name={['body']} label="Description">
                <Input.TextArea rows={4} onChange = {(e)=>props.setEnteredBody(e.target.value)}defaultValue={props.body}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>  )
}
export default UpdateForm;