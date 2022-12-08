import React, {Fragment, useEffect, useState} from "react"
import "./table.css"
import {Button, Modal} from 'antd';
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
const Table = ()=>{
    const [tableData,setTableData]=useState([])
    const [toggleModel,setToggleModel]=useState(false)
    const [editionModal,setEditionModal]=useState({booleanVal :false ,did : "" })
    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
            .then(response => response.json())
            .then(result => setTableData(result))
            .catch(error => console.log('error', error));
    },[])

    const truncateValue=(string,newString)=>{
        return string?.length > newString ? string.substr(0,newString-1) + "..." :string
    }
    const onDeletionDemo = (id)=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
    }

    return (
        <Fragment>
            <Modal title="Basic Modal" open={toggleModel}  footer={
                null
            }>
               <CreateForm setToggleModel={setToggleModel}/>
            </Modal>
            <Modal title="Basic Modal" open={editionModal} footer={
                null
            }>
                <UpdateForm setEditionModal={setEditionModal}/>
            </Modal>
            <Button style={{alignItems :"right"}} onClick={()=>setToggleModel(true)}>new</Button>
    <table id="table_design">
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>

        </tr>
            {tableData.map((item,index)=>{
            return    <tr key={index}>
                    <td>{item.id}</td>
                    <td>{truncateValue(item.title,20)}</td>
                    <td>{truncateValue(item.body,20) }</td>
                <td><Button onClick={()=>    setEditionModal({booleanVal :true,did : item.id })
                }>Update</Button> <Button type={"primary"} onClick={()=>onDeletionDemo(item.id)}>Delete</Button></td>



            </tr>
            })}
    </table>
        </Fragment>)
}
export default Table;