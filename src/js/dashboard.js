import "../css/popup.scss";
import React from "react";

import { render } from "react-dom";
import App from './dashboard/AppComponent.jsx';

 render(
  <App/>,
  window.document.getElementById("dashboard-app-container") 
);