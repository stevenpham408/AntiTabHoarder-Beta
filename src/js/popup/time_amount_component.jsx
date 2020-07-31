import React from "react";
import { hot } from "react-hot-loader";
import { withStyles } from "@material-ui/core/styles";

import { TextField } from '@material-ui/core/';

const style = {
    width: 50,
    marginRight: '25px'
};

const inputProps = {
    style: {
        height: 23,
        fontSize: 14
    }

};

const InputLabelProps = {
    style: {
        fontSize: 13
    }
};

function TimeAmountComponent(){
    const [state, setState] = React.useState('');

    const handleChange = (event) => {
        setState(event.target.value);
        chrome.storage.local.set({auto_delete_time_amount: event.target.value });
      }
    
    React.useEffect(() => {
        chrome.storage.local.get(null, function(res){
            if(res.auto_delete_time_amount != null || res.auto_delete_time_amount != undefined){
                setState(res.auto_delete_time_amount);
            }
         });
    }, []);

    return (
        <TextField 
        id="auto_delete_time" 
        label="Amount of Time" 
        type='number'
        variant='standard'
        value={state}
        onChange={handleChange}
        style={style}
        inputProps={inputProps}
        InputLabelProps={InputLabelProps}                    
        />
    )
}

export default hot(module)(TimeAmountComponent)