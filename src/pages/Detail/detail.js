import React, {Component} from "react";
import './detail.less'
import { singleVideoData,getVideoComment,getInitVideoLikeData,postVideoLikeData,reportComment } from '../../fetch/fetch'
import VideoDetail from './components/VideoDetail'
import Pagination from "./components/Pagination";
import Loading from '../../common/Loading/Loading'
import { connect } from 'react-redux'
import { showToast } from "../../pages/store/action";
import {bindActionCreators} from 'redux'

class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            videoDetail:null,
            videoId: this.props.match.params.id,
            userName: localStorage.getItem('user'),
            iLike: '',
            commentVal:'',
            page:1,
            loadDone:false
        }
        console.log(this.props.match.params.id)
        this.handleSelLike = this.handleSelLike.bind(this)
        this.handleCommentInput = this.handleCommentInput.bind(this)
        this.postComment = this.postComment.bind(this)
        this.goPage = this.goPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
    }
    async componentDidMount() {
        let videoDetail
        let {videoId,userName} = this.state
        await singleVideoData(videoId).then(res=>{
            videoDetail = res.data
            console.log('singleVideoData')
            
        })
        await getVideoComment(videoId).then(res => {
            this.setState({
                videoComment: res.data,
                videoDetail
            })
            console.log('getVideoComment')
        })
        await getInitVideoLikeData(videoId,userName).then(res=>{
            console.log(res.data[0])
            if (res.data[0]){
                this.setState({
                    iLike: res.data[0].iLike
                })
            }
            console.log('getInitVideoLikeData')
            
        })
        console.log('loaddone')
        setTimeout(() => {
            this.setState({
                loadDone: true
            })
        }, 500);
    }
    /**
     * 处理用户点击喜欢和不喜欢按钮
     * @param {*} type 用户点击类型 1为喜欢 2位不喜欢
     */
    handleSelLike(type,e){
        console.log(type)
        let {videoId,videoDetail,userName} = this.state
        let {name,star,img} = videoDetail[0][0]
        if (type === 'needLogin') {
            this.props.showToast({
                icon: 'fail',                
                message: '请先登录！'
            })
            return
        }
        postVideoLikeData(videoId,type,userName,name,img,star).then(res=>{
            this.props.showToast({
                message: '标记为'+ (type === '1' ? '喜欢' : '不喜欢')
            })
            this.setState({
                iLike: type
            })
        }).catch(e=>{
            this.props.showToast({
                icon: 'fail',
                message: e.message
            })
            if (e.code === 404) {
                setTimeout(() => {
                    localStorage.clear()
                    this.props.history.push('/login')
                }, 1500);
            }
            
        })
    }
    /**
     * 监听评论框
     */
    handleCommentInput(e){
        console.log(e.target.value)
        this.setState({
            commentVal: e.target.value
        })
    }
    /**
     * 用户评论点击
     */
    postComment() {
        let {commentVal,videoDetail,videoId,userName,videoComment} = this.state
        let {name} = videoDetail[0][0]
        let avator = localStorage.getItem('avator')
        if (commentVal.trim() === ''){
            this.props.showToast({
                icon:'fail',
                message: '请输入评论内容'
            })
            return
        }
        reportComment(videoId,userName,commentVal,name,avator).then(res=>{
            this.props.showToast({
                message: '评论成功'
            })
            videoComment.push({
                id: +new Date(),
                userName,
                date: this.date('yyyy-MM-dd hh:mm:ss'),
                "content": commentVal,
                avator
            });
            console.log(this.date('yyyy-MM-dd hh:mm:ss'))
            this.goPage(Math.ceil(videoComment.length / 5))
            
            this.setState((prevState) => ({
                videoComment,
                commentVal:''
            }))

            var scrollHeight = document.documentElement.scrollHeight;
            console.log(scrollHeight)
            window.scrollTo(0, scrollHeight);
           
        }).catch(e=>{
            this.props.showToast({
                icon: 'fail',
                message: e.message
            })
            if (e.code === 404) {
                setTimeout(() => {
                    localStorage.clear()
                    this.props.history.push('/login')
                }, 1500);
            }
        })
    }
    date(fmt) {
        let date = new Date()
         var o = {
             "M+": date.getMonth() + 1, //月份
             "d+": date.getDate(), //日
             "h+": date.getHours(), //小时
             "m+": date.getMinutes(), //分
             "s+": date.getSeconds(), //秒
             "q+": Math.floor((date.getMonth() + 3) / 3), //季度
             "S": date.getMilliseconds() //毫秒
         };
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
         for (var k in o)
             if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         return fmt;
        
    }
    goPage(page){
        this.setState({
            page
        })
    }
    nextPage() {
        this.setState((prevState)=>({
            page: ++prevState.page
        }))
    }
    prevPage() {
        this.setState((prevState) => ({
            page: --prevState.page
        }))
    }
    render(){
        let {iLike,videoDetail,videoComment,userName,page,commentVal,loadDone} = this.state
        return (
            <div className="detail">
                <Loading loading={loadDone} />
                <VideoDetail
                    selLike={this.handleSelLike}  
                    userName={userName} 
                    isLike={iLike}
                    goBack={()=>(this.props.history.goBack())} 
                    detail={videoDetail}
                    comments={videoComment} 
                    commentVal={commentVal}
                    handleCommentInput={(e)=>(this.handleCommentInput(e))}
                    postComment={this.postComment}
                    page={page}
                />
                <Pagination page={page} commentsPageLength={videoComment&&videoComment.length} nextPage={this.nextPage} goPage={this.goPage} prevPage={this.prevPage} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        toast: state.toast
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showToast: bindActionCreators(showToast, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)