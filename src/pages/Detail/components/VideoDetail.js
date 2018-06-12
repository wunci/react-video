import React from 'react'
import { baseUrl } from "../../../fetch/fetch";
import Comments from "./Comments";
const LinkBtn = (props)=>{
    console.log(props.isLike)
    let handleSelLike = props.selLike
    return (
        <section className="like_list">
             <div onClick={props.userName && !props.isLike ? (e) => { handleSelLike('1') } : props.isLike ? '' : (e) => { handleSelLike('needLogin') }} 
                className={'like '+ (props.isLike ? (props.isLike === '1' ? 'like_active' : 'likeDisable') : '')}>喜欢</div>
            <div onClick={props.userName && !props.isLike ? (e) => { handleSelLike('2') } : props.isLike ? '' : (e) => { handleSelLike('needLogin') }} 
                className={'like '+ (props.isLike ? (props.isLike === '2' ? 'like_active' : 'likeDisable') : '')}>不喜欢</div>
        </section>
    )
}
const FixCommentInput = ({postComment,userName,commentVal,handleCommentInput})=>{
    if(userName){
        return (
            <section className="fixed_comment" >
                <input type="text" name="comment" value={commentVal} onChange={(e)=>(handleCommentInput(e))} placeholder="评论" />
                <button onClick={(e)=>(postComment(e))}>评论</button>
            </section>
        )
    }else{
        return (
            <section className="fixed_comment" >
                <input type="text" name="comment" placeholder="登陆后才可以评论哟！" readOnly="readOnly" />
                <button className="disabled">评论</button>
            </section>
        )
    }
}
const VideoDetail = (props) => {
    let detail = props.detail && props.detail[0][0]
    let star = props.detail && props.detail[1][0]['count(*)']
    console.log('star',star)
    console.log('page', props.page)
    if (!detail) return ''
    return (
        <div>
            <header>
                <div className="wrap">
                    <div className="back" onClick={()=>(props.goBack())}>
                        <i className="iconfont icon-logout23"></i>
                        返回
                    </div>
                    <img src={baseUrl+'/images/'+detail.img} alt="" />
                    <div className="video_name">
                        <h3>{ detail.name }</h3>
                        <div className="score_wrap">
                            <strong>{ detail.star }</strong>
                            <div className="score">
                                <div className="starList" style={{'backgroundPositionY':-15*(10-detail.star).toFixed(0)+'px'}}></div>
                                <p>{star}人评分/{props.comments && props.comments.length}条评论</p>
                            </div>
                        </div>
                    </div>        
                </div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/wclimb/vue-video"><svg className="github" fill="#FFF" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a>
            </header>
            <section className="video_txt">
                <div className="video_txt_wrap">
                    <p>
                        { detail.timelong }分钟
                        { detail.type }
                    </p>
                    <p>{ detail.time1 }( {detail.country} )上映 {detail.country}</p>
                    <p>{ detail.actors }</p>
                </div>
            </section>
            <LinkBtn isLike={props.isLike} userName={props.userName} selLike={props.selLike}  />
            <section className="video_about"> 
                <h3>{ detail.name }的剧情简介</h3>
                <p>
                    { detail.detail }
                </p>
            </section>
            
            <FixCommentInput
                postComment={props.postComment}
                userName={props.userName}
                commentVal={props.commentVal}
                handleCommentInput={props.handleCommentInput}
            />
          
            <Comments comments={props.comments} page={props.page} />
        </div>

    )

    
}

export default VideoDetail