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
    const [enteredtitle,setEnteredTitle]=useState("")
    const [enteredBody,setEnteredBody]=useState("")
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
            .then((response) => response.json())
            .then((json) => {setEnteredTitle(json.title);setEnteredBody(json.body);});


    },[props.id])

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
                <input type="hidden" />
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
                <input type="text" onChange={(e) =>setEnteredTitle(e.target.value)} value={enteredtitle}/>
            </Form.Item>

            <Form.Item name={['body']} label="Description">
                <input type="textarea" onChange={(e) =>setEnteredBody(e.target.value)} value={enteredBody}/>
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