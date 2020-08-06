import React from "react";
import { hot } from "react-hot-loader";

import BlockTitleComponent from './block_title_component.jsx'
import AutoDeleteComponent from './auto_delete_component.jsx'
import DividerComponent from './divider_component.jsx'
import TableComponent from './tab_table_component.jsx'

class AppComponent extends React.Component{
    render() {
        return (
            <div>
                <BlockTitleComponent/>
                <DividerComponent text='Auto Delete'/>
                <AutoDeleteComponent id='yer'/>
                <DividerComponent text='Tab Manager'/>
                <TableComponent/>
            </div>
        )
    }
};


export default hot(module)(AppComponent)