import React from "react";
    
import { TextField } from '@material-ui/core/';
import { hot } from "react-hot-loader";
import ToggleSwitchComponent from './toggle_switch_component.jsx'
import SelectTimeUnitComponent from './select_time_unit_component.jsx'
import { Select } from '@material-ui/core'

import { MenuItem } from '@material-ui/core'
class AutoDeleteComponent extends React.Component{
    render () {
        return (
            <div id='block1'>
                <TextField 
                    id="auto_delete_time" 
                    label="Amount of Time" 
                    type='number'
                    variant='standard'
                    style = 
                    {{
                        width: 50,
                        marginRight: '25px'
                    }}
                    inputProps={{
                        style: {
                            height: 23,
                            fontSize: 14,
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 13
                        },
                    }}
                    
                    />

                    <SelectTimeUnitComponent>
                        <MenuItem value={'minutes'}>minutes</MenuItem>
                        <MenuItem value={'hours'}>hours</MenuItem>
                    </SelectTimeUnitComponent>
                    <ToggleSwitchComponent/>

             </div>
        )
    }
};

export default hot(module)(AutoDeleteComponent)