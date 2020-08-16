import React from "react";
import logo from '../../img/logo.png'; // with import

class BlockTitleComponent extends React.Component{
    render() {
        return (
            <div id='block_title'>
                 <img src={logo} />
            </div>
        )
    }
};

export default (BlockTitleComponent)