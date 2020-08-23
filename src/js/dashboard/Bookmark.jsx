import React from "react";
import styled from 'styled-components'
const Styles = styled.div`
    div{
        margin-bottom: 5px;
    }

    img {
        vertical-align: middle;
        display: table-cell;
        margin-right: 1em;
    }

    span {
        vertical-align: middle;
        display: table-cell;
    }

    .bookmark{
        padding-left: 5px;
        text-align: left;
    }

    .bookmarkDiv{
        width: 700px;
    }
`

// Grab bookmark object passed from context as a prop
function Bookmark({ bookmark }) {
    return (
        <Styles>
            {/* Give each div a unique ID to query the object store for deletion  */}

            <div className='bookmarkDiv' id={bookmark.id}>
                <span className='removeButton'>
                    <input type="image" style={{marginTop: 2, width: 13, height:13, marginRight: 35}}src="https://www.pngfind.com/pngs/m/90-905672_x-cross-close-symbol-icon-button-gui-close.png"/>
                    </span>
                
                <span className='favIcon'> 
                    <img 
                    style={{width:17, height:17, marginRight: '50%'}} 
                    src ={bookmark.faviconUrl}
                    />   
                </span>
                
                <span className='bookmark'>
                    <a href ={bookmark.url}>  
                    {bookmark.title} 
                    </a> 
                </span>
            </div>
        </Styles>
    );
}

export default Bookmark;