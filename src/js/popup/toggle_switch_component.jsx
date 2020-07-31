import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { hot } from "react-hot-loader";

import { Switch } from '@material-ui/core/';


// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledSwitch = withStyles({
  root: {
    position: 'relative',
    marginTop: '20px',
    marginLeft: '90px'
  },
  
})(Switch);

function ClassesShorthand() {

  const [state, setState] = React.useState(undefined)
 
  const handleChange = (event) => {

    setState(event.target.checked);
    chrome.storage.local.set({auto_delete_toggle: event.target.checked });
  }

  React.useEffect(() => {
    
    chrome.storage.local.get(null, function(res){
      setState(res.auto_delete_toggle === undefined ? false : res.auto_delete_toggle);
    });
  }, []);

  if(state === undefined) {
    return null;
  }

  else{
  return (

    <StyledSwitch
    checked={state}
    onChange={handleChange}
    > 
    </StyledSwitch>)
  }
 
}

export default hot(module)(ClassesShorthand)