import "../css/popup.scss";
import React from "react";
import { render } from "react-dom";
// import GreetingComponent from './popup/greeting_component.jsx'
// import BlockTitle from './popup/block_title_component.jsx'
// import {AutoDelete} from './popup/auto_delete_component.jsx'
import App from './popup/app_component.jsx';

render(
  <App/>,
  window.document.getElementById("app-container") 
);
    