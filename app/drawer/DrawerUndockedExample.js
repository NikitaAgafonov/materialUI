import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const DrawerUndockedExample = (props) => {
        console.log(props);
        return (
            <div>
                <Drawer
                    docked={false}
                    width={200}
                    open={props.open}
                    //onRequestChange={() => props.handleCloseDrawer}
                >
                    <MenuItem onTouchTap={props.handleCloseDrawer}>CLOSE</MenuItem>
                </Drawer>
            </div>
        );
};
export default DrawerUndockedExample;