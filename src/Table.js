import React, {Fragment,useRef, useEffect, useState} from "react"
import "./table.css"
import {Button, Modal} from 'antd';
import Drawer from "./Drawer";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
const Table = ()=>{
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [tableData,setTableData]=useState([])
    const [viewData,setViewData]=useState([])
    const [enteredtitle,setEnteredTitle]=useState("")
    const [enteredBody,setEnteredBody]=useState("")
    const [showDrawer,setShowDrawer]=useState(false)


    const [toggleModel,setToggleModel]=useState(false)
    const [editionModal,setEditionModal]=useState({booleanVal :false ,did : "",title:"",body:"" })


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
    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e) => {
        const copyListItems = [...tableData];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setTableData(copyListItems);
    };


    return (
        <Fragment>
            <Drawer setShowDrawer = {setShowDrawer} showDrawer = {showDrawer} viewData = {viewData}/>
            <Modal modalProps = {{destroyOnClose:true}}title="Create"  onOk={()=>setToggleModel(false)} onCancel={()=>setToggleModel(false)} open={toggleModel}  footer={
                null
            }>
               <CreateForm setToggleModel={setToggleModel}/>
            </Modal>
            <Modal title="Update" open={editionModal.booleanVal}  onOk={()=>setEditionModal(false)} onCancel={()=>setEditionModal(false)}footer={
                null
            }>
                <UpdateForm setEnteredBody={setEnteredBody}  setEnteredTitle = {setEnteredTitle} id={editionModal.did}  setEditionModal={setEditionModal} body={enteredBody} title={enteredtitle}/>
            </Modal>
            <Button style={{left: "23%",margin: "10px"}} onClick={()=>setToggleModel(true)}>new</Button>
    <table id="table_design">
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>

        </tr>
            {tableData.map((item,index)=>{
            return    <tr key={index}
                          onDragStart={(e) => dragStart(e, index)}
                          onDragEnter={(e) => dragEnter(e, index)}
                          onDragEnd={drop}
                          key={index}
                          draggable>
                    <td>{item.id}</td>
                    <td><a onClick={()=>setShowDrawer(true)}>{truncateValue(item.title,20)}</a></td>
                    <td>{truncateValue(item.body,20) }</td>
                <td><Button onClick={()=>
                {
                    setEditionModal({booleanVal :true, did : item.id ,body: item.body,title: item.title}) ;
                    setEnteredTitle(item.title);
                    setEnteredBody(item.body);
                }
                }
                >Update</Button> <Button type={"primary"} onClick={()=>onDeletionDemo(item.id)}>Delete</Button> <Button type={"primary"} onClick={()=>setViewData(item)}>view</Button></td>



            </tr>
            })}
    </table>
        </Fragment>)
}
export default Table;