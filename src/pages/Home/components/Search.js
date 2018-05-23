import React from 'react'
import {Link} from 'react-router-dom'
export default ()=>(
    <div id="search">
        <Link to="/search">
            <div className="search_input">
                <i className="iconfont icon-sousuo1"></i>搜索
            </div>
        </Link>
    </div>
)