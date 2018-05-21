import React,{Component} from 'react'
import {getAvator,editNameData,uploadAvator,meDelete,meLike,meComment} from '../../fetch/fetch'
import "../Home/home.less";
import './me.less'
import Toast from "../../common/Toast";
import Comments from './components/Comments'
import Header from './components/Header'
import VideoList from './components/VideoList'
import Footer from '../../common/Footer'

class Me extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            avator:'',
            videoList:null,
            comments:null,
            toast: {
                isShow: false,
                icon: ''
            },
            editNameVal:'',
            isEdit:false
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
    async componentWillMount(){
        let {user,avator} = localStorage
        if (!user || user === '') {
            this.props.history.push('/login')   
            return         
        }
        // 获取头像
        getAvator(user).then(res=>{
            console.log(res.avator)
            this.setState({
                user,
                avator:res.avator
            })
        })
        // 获取个人喜欢列表
        meLike(user).then(res => {
            this.setState({
                videoList:res.data
            })
        })
        // 获取个人评论
        meComment(user).then(res => {
            this.setState({
                comments: res.data
            })
        })
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
            this.$message({
                message:'删除成功'
            })
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
                this.$message({
                    icon:'fail',
                    message: '请修改名称'
                })
                this.setState({
                    isEdit: false,
                })
                return
            }
            editNameData(user, editNameVal).then(res => {
                this.$message({
                    message: '修改成功'
                })
                localStorage.setItem('user', editNameVal)
                document.cookie = `token=${res.token};max-age=${30*24*60*60*1000}`
                this.setState({
                    isEdit: false,
                    user: editNameVal
                })
            }).catch(e=>{
                this.$message({
                    icon: 'fail',
                    message: e.message
                },()=>{
                     this.setState({
                         isEdit: false,
                     })
                    if (e.code === 404) {
                        this.props.history.push('/login')
                        localStorage.clear()
                    }
                })
                
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
                        _that.$message({
                            message: '上传成功'
                        })
                        localStorage.setItem('avator', res.avator);
                        _that.setState({
                            avator: res.avator
                        })
                    }).catch(e => {
                        _that.$message({
                            icon: 'fail',
                            message: e.message
                        }, () => {
                            if (e.code === 404) {
                                this.props.history.push('/login')
                                localStorage.clear()
                            }
                        })
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
        this.$message({
            message:'退出成功'
        },()=>{
            this.props.history.push('/home')
        })
    }
    $message(data = {icon:'success',message:'',},cb){
        this.setState({
            toast: {
                isShow: true,
                icon: data.icon === 'fail' ?  'icon-shibai' : 'icon-chenggong',
                message: data.message
            }
        })
        setTimeout(() => {
            this.setState({
                toast: {
                    isShow: false, 
                }
            })
            cb && cb()
        }, 1500);
    }
    render(){
        let {avator,user,videoList,comments,isEdit,editNameVal} = this.state
        let {icon,isShow,message} = this.state.toast
        
        return (
            <div>
                <Toast icon={icon} message={message} isShow={isShow} />
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
export default Me