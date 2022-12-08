import React, {Fragment, useEffect, useState} from "react"
import "./table.css"
import {Button, Modal} from 'antd';
import CreateForm from "./CreateForm";
const Table = ()=>{
    const [tableData,setTableData]=useState([])
    const [toggleModel,setToggleModel]=useState(false)
    console.log(tableData,"tableData")
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
    const handleOk = () => {
        setToggleModel(false);
    };
    const handleCancel = () => {
        setToggleModel(false);
    };
    const truncateValue=(string,newString)=>{
        return string?.length > newString ? string.substr(0,newString-1) + "..." :string
    }

    return (
        <Fragment>
            <Modal title="Basic Modal" open={toggleModel} onOk={handleOk} onCancel={handleCancel} footer={
                null
            }>
               <CreateForm/>
            </Modal>
            <Button style={{alignItems :"right"}} onClick={()=>setToggleModel(true)}>new</Button>
    <table id="table_design">
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
        </tr>
            {tableData.map((item)=>{
            return    <tr>
                    <td>{item.id}</td>
                    <td>{
                        truncateValue(item.title,20)}</td>
                    <td>{truncateValue(item.body,20) }</td>
                </tr>
            })}


    </table></Fragment>)
}
export default Table;