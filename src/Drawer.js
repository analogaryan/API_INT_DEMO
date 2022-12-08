import React from "react"
import {Drawer} from 'antd';

const DrawerView = (props) => {
    const onClose = () => {
        props.setShowDrawer(false);
    };
   return   <Drawer
       header={false}
       placement={"left"}
       width={500}
       onClose={onClose}
       open={props.showDrawer}

   >

       <p>{props.viewData.id}</p>
       <p>{props.viewData.title}</p>
       <p>{props.viewData.body}</p>
   </Drawer>

}
export default DrawerView