import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Select } from '@material-ui/core'
import {MenuItem} from '@material-ui/core'
  
const StyledSelect = withStyles({
    root: {
        position: 'relative',
        marginTop: '1.465em',
        fontSize: '14px',
        minWidth: '50px',

    },
})(Select);

function SelectComponent({auto_delete_toggle_state}) {
    const [state, setState] = React.useState('');

    const handleChange = (event) => {
        setState(event.target.value);
        chrome.storage.local.set({timeUnit: event.target.value });
    };

    React.useEffect(() => {
        chrome.storage.local.get(null, function(res){
            if(res.timeUnit != undefined){
                setState(res.timeUnit);
            }
        })
    });

    if(auto_delete_toggle_state === false){
        return <StyledSelect 
                disabled
                value={''}
                />
    }
    return (
        <StyledSelect 
            id='selectTimeUnit'
            value={state}
            onChange = {handleChange}
            inputProps={{
                name: 'timeUnit'
            }}
            >
                <MenuItem value={'minutes'}>minutes</MenuItem>
                <MenuItem value={'hours'}>hours</MenuItem>
        </StyledSelect>
    )
}
  
export default SelectComponent