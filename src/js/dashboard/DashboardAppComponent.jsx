import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import BlockTitleComponent from '../popup/block_title_component.jsx'
import DividerComponent from '../popup/divider_component.jsx'
import SavedBookMarksList from './SavedBookmarksList.jsx'
import styled from 'styled-components'

const DashboardLogoStyle = styled.div`
    margin-right:190px;
`

const DashboardDividerStyle = styled.div`
    margin-top: 10px;
    width: 400%;

`
class DashboardAppComponent extends React.Component{
    render() {  
        return (
            <>
            <DashboardLogoStyle>
                <BlockTitleComponent id='dashboardLogo'/>
            </DashboardLogoStyle>
            <DashboardDividerStyle>
                <DividerComponent/>

            </DashboardDividerStyle>
             <Suspense fallback={<p>Loading....</p>}>
                <SavedBookMarksList/>
            </Suspense>
            </>
        )
    }
};

export default hot(module)(DashboardAppComponent)