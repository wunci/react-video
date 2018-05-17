import React from 'react'
import {baseUrl} from '../../../fetch/fetch'
const Header = (props)=>{
    return (
        <section className="avator">
            {/* <input id="upload" type="file" />
            <div className="avator_border">
                <img src="" alt="" />
            </div> */}
            <input id="upload" type="file" />
            <div className="avator_border">
                <img src={baseUrl+'/images/avator/'+props.avator+'.png'} alt="" />
            </div>
            <div className="name">
                {props.user}<i className="iconfont icon-bianji"></i>
                {/* <input type="text" />
                <i className="iconfont icon-submit"></i> */}
            </div>
            <div className="logout">
            <i className="iconfont icon-logout23"></i>
            退出
            </div>
        </section>
    )
}
export default Header