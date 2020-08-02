import React from "react";
    
import { TextField } from '@material-ui/core/';
import { hot } from "react-hot-loader";
import ToggleSwitchComponent from './toggle_switch_component.jsx'
import SelectComponent from './select_time_unit_component.jsx'
import TimeAmountComponent from './time_amount_component.jsx'

function AutoDeleteComponent(){
    const [toggle, setToggle] = React.useState(undefined);

    const handleToggle = (event) => {
        setToggle(event.target.checked);
        chrome.storage.local.set({auto_delete_toggle: event.target.checked });
      }

      React.useEffect(() => {
    
        chrome.storage.local.get(null, function(res){
          setToggle(res.auto_delete_toggle === undefined ? false : res.auto_delete_toggle);
        });
      }, [toggle]);

      return (
        <div>
          <TimeAmountComponent auto_delete_toggle_state={toggle}/>
          <SelectComponent auto_delete_toggle_state={toggle}/>
          <ToggleSwitchComponent auto_delete_toggle_state={toggle} handleToggle={handleToggle}/>
        </div>
      )
} 

export default hot(module)(AutoDeleteComponent)