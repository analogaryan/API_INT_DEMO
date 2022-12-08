

const Drawer = (props) => {
    const onClose = () => {
        props.setShowDrawer(false);
    };
   return   <Drawer
       title="Drawer with extra actions"
       placement={"left"}
       width={500}
       onClose={onClose}
       open={props.showDrawer}

   >

       <p>Some contents...</p>
       <p>Some contents...</p>
       <p>Some contents...</p>
   </Drawer>

}
export default Drawer