import React from "react";
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
  return <StyledSwitch></StyledSwitch>;
}

export default hot(module)(StyledSwitch)