import React from 'react'

const Comments = (props) => {
    let comments = props.comments
    let items = comments && comments.map(val=>(
        <li key={val.id}>
            <section className="commentWrap">
                <h5>影片：{val.videoName}</h5>
                <section>
                    <span>评论：</span>
                    <p>{val.content}</p>
                </section>
                <div className="time">{val.date}</div>
            </section>
            <div className="delete">删除</div>
        </li> 
    ))
    return(
        <section className="comment list">
            <h3>
                <i className="iconfont icon-pinglun1"></i>
                评论<span>({comments && comments.length})</span>
            </h3>
            <ul>
                {items}
            </ul>
        </section>
    )
}
export default Comments