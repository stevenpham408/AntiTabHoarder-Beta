import React, { Suspense } from "react";
import { hot } from "react-hot-loader";

import BlockTitleComponent from './block_title_component.jsx'
import AutoDeleteComponent from './auto_delete_component.jsx'
import DividerComponent from './divider_component.jsx'
import TableComponent from './tab_table_component.jsx'
import NukeComponent from './nuke_button_component.jsx'
import styled from 'styled-components'

const PopupDividerStyle = styled.div`
.container {
    max-width: 90%;  
    margin-left: 25px;
    margin-top: 15px;
  }
  
  .hr-text {
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;
    opacity: 0.9;
    &:before {
      content: '';
      // use the linear-gradient for the fading effect
      // use a solid background color for a solid bar
      background: linear-gradient(to right, transparent, #818078, transparent);
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
    }
    &:after {
      content: attr(data-content);
      position: relative;
      display: inline-block;
      color: black;
  
      padding: 0 .5em;
      line-height: 1.5em;
      // this is really the only tricky part, you need to specify the background color of the container element...
      color: #818078;
      background-color: #fcfcfa;
    }
  }
`
class AppComponent extends React.Component{
    render() {
        return (
            <div>
                <BlockTitleComponent/>
                <PopupDividerStyle>
                    <DividerComponent text='Auto Delete'/>
                </PopupDividerStyle>
                <AutoDeleteComponent/>
                <PopupDividerStyle>
                    <DividerComponent text='Tab Manager'/>
                </PopupDividerStyle>
                <NukeComponent/>
                <TableComponent/>
            </div>
        )
    }
};

export default hot(module)(AppComponent)