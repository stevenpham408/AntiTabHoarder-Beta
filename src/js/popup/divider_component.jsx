import React from "react";

class DividerComponent extends React.Component{
    // Credit: @scottzirkel
    render () {
        return (
            <div className="container">
                {/* <p>You can divide with any text you like.</p>
                <p>For instance this...</p> */}
                <hr className="hr-text" data-content= {this.props.text}/>
                {/* <p>...this...</p> */}
                {/* <hr class="hr-text" data-content="Tab Manager"/> */}
                {/* <p>...even this!</p> */}
            </div>
        )
    }

}

export default DividerComponent