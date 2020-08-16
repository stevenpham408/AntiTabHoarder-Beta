import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch } from '@material-ui/core/';

const StyledSwitch = withStyles({
  root: {
    position: 'relative',
    marginTop: '15px',
    marginLeft: '90px'
  },
  
})(Switch);

function ClassesShorthand({auto_delete_toggle_state, handleToggle}) {

  if(auto_delete_toggle_state === undefined) {
    return null;
  }

  else{
  return (      
    <StyledSwitch
    checked={auto_delete_toggle_state}
    onChange={handleToggle}>
    </StyledSwitch>
    )
  }
}

export default ClassesShorthand