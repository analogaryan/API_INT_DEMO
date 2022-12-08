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
    console.log(enteredBody,"enteredBody")
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
            .then((response) => response.json())
            .then((json) => {
                setEnteredTitle(json.title);
                setEnteredBody(json.body);
            });


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

        <form onFinish={onUpdateDemo}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="text" className="form-control" onChange={(e) =>setEnteredTitle(e.target.value)} defaultValue={enteredtitle}/>

            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="textarea" className="form-control" rows={5} onChange={(e) =>setEnteredBody(e.target.value)} defaultValue={enteredBody}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
export default UpdateForm;