import React from "react";
import { hot } from "react-hot-loader";
import { withStyles } from "@material-ui/core/styles";
import { Select } from '@material-ui/core'

import { MenuItem } from '@material-ui/core'

const StyledSelect = withStyles({
    root: {
        position: 'relative',
        marginTop: '20px',
        fontSize: '14px',
        minWidth: '50px',
    },
  })(Select);
  
  function ClassesShorthand() {
    return (
        <div>
          <Select></Select>
        </div>
    )
  }
  
  export default hot(module)(StyledSelect)