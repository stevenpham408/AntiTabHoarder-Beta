import React from "react";
import { hot } from "react-hot-loader"; 

// const message = props => <div> {props.msg} </div>
class DividerComponent extends React.Component{
    // Credit: @scottzirkel
    render () {
        return (
            <div class="container">
                {/* <p>You can divide with any text you like.</p>
                <p>For instance this...</p> */}
                <hr class="hr-text" data-content= {this.props.text}/>
                {/* <p>...this...</p> */}
                {/* <hr class="hr-text" data-content="Tab Manager"/> */}
                {/* <p>...even this!</p> */}
            </div>
            
        )
    }

}

export default hot(module)(DividerComponent)