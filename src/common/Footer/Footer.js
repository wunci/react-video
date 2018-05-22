import React from 'react'
import {Link} from 'react-router-dom'
import './footer.less'
const Footer = (props)=>(
    <section className="footer">
        <Link to="/" className={props.path === 'home' ? 'active' : ''}>
            <i className='iconfont icon-dianying'></i>
            <span>主页</span>
        </Link>
        <Link to="/me" className={props.path === 'me' ? 'active' : ''}>
            <i className='iconfont icon-my1'></i>
            <span>我</span>
        </Link>
    </section>
)

export default Footer