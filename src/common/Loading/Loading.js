import React from 'react'
import './loading.less';
import Logo from './svg.js';
const Loading = ({loading})=>{
    return (
        <div className="mini-loading" style={{height: !loading ? '' : '0'}}>
            {/* <img src={'./loading.svg'} alt="" /> */}
            <Logo />
        </div>
    )
}
export default Loading