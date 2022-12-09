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
            .then((json) => {
                setEnteredTitle(json.title);
                setEnteredBody(json.body);
            });


    },[props.id])

    const onUpdateDemo = (e)=>{
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: props.id,
                title: enteredtitle,
                body: enteredBody,
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

        <form onSubmit={onUpdateDemo}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input type="text" className="form-control" onChange={(e) =>setEnteredTitle(e.target.value)} defaultValue={enteredtitle}/>

            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Description</label>
                <input type="textarea" className="form-control" rows={5} onChange={(e) =>setEnteredBody(e.target.value)} defaultValue={enteredBody}/>
            </div>

            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    )
}
export default UpdateForm;