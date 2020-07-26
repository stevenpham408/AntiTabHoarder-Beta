import React from "react";
import { hot } from "react-hot-loader";

class BlockTitleComponent extends React.Component{
    render() {
        return (
            <div id='block_title'>
                 
                ANTI-TabHoarder
            </div>
        )
    }
};

export default hot(module)(BlockTitleComponent)