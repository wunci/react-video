import React from 'react'
import { baseUrl } from "../../../fetch/fetch";
import {Link} from 'react-router-dom'
export const List = (props) => {
    let list = props.videoList
    let idx = props.idx
    console.log(list[idx])
    // let length1 = list[idx].length || 0
    let listItems = list[idx] && list[idx].map((val, i) => {
        return <ListDetail key={i} {...val} />
    })
    return (
        <section className="video_list">
            <div className="video_list_header">
                <h3>{props.name}<span>{list[idx]&&list[idx].length}</span></h3>
                <Link to={props.link}>更多 <i className="iconfont icon-jiantouyou"></i></Link>   
            </div>
            <ul>
                {listItems} 
            </ul>
        </section>
    )
}
export const ListDetail = (props) => (
    <li>
        <Link to={'/video/'+props.id}>
            <div className="preImg"><img src={baseUrl+'/images/'+props.img} alt=""/></div>
            <h3>{props.name}</h3>
            <div>  
                <div className="starList" style={{'backgroundPositionY':-15*(10-props.star).toFixed(0)+'px'}}></div>
                <span>{props.star}</span>
            </div> 
        </Link>
    </li>
)