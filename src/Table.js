import React, {useEffect, useState} from "react"
const Table = ()=>{
    const [tableData,setTableData]=useState([])
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




    return (
    <table>
        <tr>
            <th>id</th>
            <th>title</th>
            <th>body</th>
        </tr>
            {tableData.map((item)=>{
                <tr>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.body }</td>
                </tr>
            })}


    </table>)
}
export default Table;