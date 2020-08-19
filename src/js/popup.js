import "../css/popup.scss";
import React from "react";

import { render } from "react-dom";
import App from './popup/app_component.jsx';

 render(
  <App/>,
  window.document.getElementById("app-container") 
);