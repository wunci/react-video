import React,{Component} from 'react'
import {getAvator,editNameData,uploadAvator,meDelete,meLike,meComment} from '../../fetch/fetch'
import "../Home/home.less";
import './me.less'
import Comments from './components/Comments'
import Header from './components/Header'
import VideoList from './components/VideoList'
import Footer from '../../common/Footer/Footer'
import Loading from '../../common/Loading/Loading'
import { connect } from 'react-redux'
import { showToast } from "../../pages/store/action";
import {bindActionCreators} from 'redux'

class Me extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            avator:'',
            videoList:null,
            comments:null,
            editNameVal:'',
            isEdit:false,
            loadDone:false
        }
        this.touchStart = this.touchStart.bind(this)
        this.touchMove = this.touchMove.bind(this)
        this.touchEnd = this.touchEnd.bind(this)
        this.touchStartHideAll = this.touchStartHideAll.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.editUserName = this.editUserName.bind(this)
        this.handleUserNameInput = this.handleUserNameInput.bind(this)
        this.uploadAvator = this.uploadAvator.bind(this)
    }
    async componentDidMount() {
        let {user,avator} = localStorage
        if (!user || user === '') {
            this.props.history.push('/login')   
            return         
        }
        // 获取头像
        await getAvator(user).then(res=>{
            console.log(res.avator)
            this.setState({
                user,
                avator:res.avator
            })
        })
        // 获取个人喜欢列表
        await meLike(user).then(res => {
            this.setState({
                videoList:res.data
            })
        })
        // 获取个人评论
        await meComment(user).then(res => {
            this.setState({
                comments: res.data
            })
        })
        setTimeout(() => {
            this.setState({
                loadDone: true
            })
        }, 500);
        console.log(avator)
    }
    /**
     * 删除自己的评论
     * @param {*} id 影片id
     * @param {*} e 
     */
    deleteComment(id, event) {
        console.log(id)
        let {user} = localStorage
        event.persist();
        meDelete(id,user).then(res=>{
            var el = event.target
            // console.log(event)
            el.parentNode.style.height = 0;
            el.parentNode.style.borderTop = 'none';
            this.props.showToast({
                message:'删除成功'
            })
        }).catch(e=>{
            this.props.showToast({
                icon: 'fail',
                message: e.message
            })
            setTimeout(() => {
                if (e.code === 404) {
                    localStorage.clear()
                    this.props.history.push('/login')
                }
            }, 1500);
        })
    }
    editUserName(type){
        let {user} = localStorage,
            {editNameVal} = this.state
        if(type === 'edit'){
            console.log('edit')
            this.setState({
                isEdit: true,
                editNameVal: user
            })
        }else{
            console.log('post')
            if (user === editNameVal){
                this.props.showToast({
                    icon:'fail',
                    message: '请修改名称'
                })
                this.setState({
                    isEdit: false,
                })
                return
            }
            editNameData(user, editNameVal).then(res => {
                this.props.showToast({
                    message: '修改成功'
                })
                localStorage.setItem('user', editNameVal)
                document.cookie = `token=${res.token};max-age=${30*24*60*60*1000}`
                this.setState({
                    isEdit: false,
                    user: editNameVal
                })
            }).catch(e=>{
                this.props.showToast({
                    icon: 'fail',
                    message: e.message
                })
                setTimeout(() => {
                    this.setState({
                        isEdit: false,
                    })
                    if (e.code === 404) {
                        localStorage.clear()
                        this.props.history.push('/login')
                    }
                }, 1500);
                
            })
        }
    }
    handleUserNameInput(e){
        let val = e.target.value
        this.setState({
            editNameVal:val
        })
    }
    uploadAvator(e){        
        let {user} = this.state,
            files = e.target.files
        console.log(e.target.files)
        if (files.length !== 0) {
            var file = files[0],
                reader = new FileReader(),
                _that = this;
            reader.onload = function (e) {
                var image = new Image();
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext("2d");
                    canvas.width = 100;
                    canvas.height = 100;
                    ctx.clearRect(0, 0, 100, 100);
                    ctx.drawImage(image, 0, 0, 100, 100);
                    var blob = canvas.toDataURL("image/png");
                    uploadAvator(user, blob).then(res => {
                        _that.props.showToast({
                            message: '上传成功'
                        })
                        localStorage.setItem('avator', res.avator);
                        _that.setState({
                            avator: res.avator
                        })
                    }).catch(e => {
                        _that.props.showToast({
                            icon: 'fail',
                            message: e.message
                        })
                        setTimeout(() => {
                            if (e.code === 404) {
                                localStorage.clear()
                                _that.props.history.push('/login')
                            }
                        }, 1500);
                    })
                }
                image.src = e.target.result
            };
            reader.readAsDataURL(file);
        };
    }
    touchStart(e) {
        var commentWrap = document.querySelectorAll('.commentWrap')
        for (var i = 0; i < commentWrap.length; i++) {
            commentWrap[i].style.transform = 'translate(' + 0 + 'rem)';
            commentWrap[i].style.webkitTransform = 'translate(' + 0 + 'rem)';
        }
        var start = e.touches[0].pageX / 100;
        this.start = start;
    }
    touchStartHideAll(e) {
        if (e.target.className !== 'delete') {
            var commentWrap = document.querySelectorAll('.commentWrap')
            for (var i = 0; i < commentWrap.length; i++) {
                commentWrap[i].style.transform = 'translate(' + 0 + 'rem)';
                commentWrap[i].style.webkitTransform = 'translate(' + 0 + 'rem)';
            }
        }
    }
    touchMove(e) {
        var scroll = e.touches[0].pageX / 100 - this.start;
        this.scroll = scroll
        if (scroll < -1.5) {
            scroll = -1.5
        } else if (scroll > 0) {
            scroll = 0
        }
        // console.log(scroll)
        var el = e.currentTarget
        // console.log(el)
        el.style.transform = 'translate(' + scroll + 'rem)';
        el.style.webkitTransform = 'translate(' + scroll + 'rem)';
    }
    touchEnd(e) {
        var el = e.currentTarget
        if (this.scroll < 0 && this.scroll >= -1) {
            el.style.transform = 'translate(' + 0 + 'rem)';
            el.style.webkitTransform = 'translate(' + 0 + 'rem)';
        }
        if (this.scroll < -1) {
            el.style.transform = 'translate(' + -1.5 + 'rem)';
            el.style.webkitTransform = 'translate(' + -1.5 + 'rem)';
        }
        this.scroll = 0;
    }
    logout(){
        localStorage.clear()
        this.props.showToast({
            message:'退出成功'
        })
        setTimeout(() => {
            this.props.history.push('/home')
        }, 1500);
    }
    render(){
        let {avator,user,videoList,comments,isEdit,editNameVal,loadDone} = this.state
        return (
            <div>
                <Footer path="me" />
                <div className="me" onTouchStart={this.touchStartHideAll}>
                    <div className="me_deatil">
                        <Header 
                            avator={avator} 
                            user={user} 
                            editUserName={this.editUserName}
                            isEdit={isEdit}
                            editNameVal={editNameVal}
                            handleUserNameInput={this.handleUserNameInput}
                            upload={this.uploadAvator}
                            logout={this.logout.bind(this)}
                        />
                        <Loading loading={loadDone} />
                        <VideoList videoList={videoList} idx="0" />
                        <VideoList videoList={videoList} idx="1" />
                        <Comments
                            comments={comments} 
                            start={this.touchStart}  
                            move={this.touchMove}  
                            end={this.touchEnd}  
                            deleteComment={this.deleteComment}
                        />
                    </div>
                </div>
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
)(Me)