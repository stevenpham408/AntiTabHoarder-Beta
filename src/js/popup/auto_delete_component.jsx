import React from "react";
    
import { TextField } from '@material-ui/core/';
import { Switch } from '@material-ui/core';
import { hot } from "react-hot-loader";

class AutoDeleteComponent extends React.Component{
    render () {
        return (
            <div id='block1'>
                <span id='auto_delete_text'> Auto-Delete after </span> 
                <TextField 
                    id="auto_delete_time" 
                    label="Amount of Time" 
                    type='number'
                    style = {{ width: 50 }}
                    inputProps={{
                        style: {
                            fontSize: 14,
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 10
                        },
                    }}
                    />
                            

            
                <Switch id='auto_delete_toggle'></Switch>
                
            </div>
        )
    }
};

export default hot(module)(AutoDeleteComponent)