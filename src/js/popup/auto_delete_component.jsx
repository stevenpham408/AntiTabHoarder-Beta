import React from "react";
    
import { TextField } from '@material-ui/core/';
import { hot } from "react-hot-loader";
import ToggleSwitchComponent from './toggle_switch_component.jsx'
import SelectComponent from './select_time_unit_component.jsx'
import TimeAmountComponent from './time_amount_component.jsx'

class AutoDeleteComponent extends React.Component{
    render () {
        return (
            <div id='block1'>
                    <TimeAmountComponent/>
                    <SelectComponent id='sex'/>
                    <ToggleSwitchComponent/>

             </div>
        )
    }
};

export default hot(module)(AutoDeleteComponent)