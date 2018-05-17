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
            comments:null
        }
    }
    async componentWillMount(){
        let {user,avator} = localStorage
        getAvator(user).then(res=>{
            console.log(res.avator)
            this.setState({
                user,
                avator:res.avator
            })
        })
        meLike(user).then(res => {
            this.setState({
                videoList:res.data
            })
        })
        meComment(user).then(res => {
            this.setState({
                comments: res.data
            })
        })
        console.log(avator)
    }
    render(){
        let {avator,user,videoList,comments} = this.state
        return (
            <div>
                <Toast />
                <Footer path="me" />
                <div className="me">
                    <div className="me_deatil">
                        <Header avator={avator} user={user} />
                        <VideoList videoList={videoList} idx="0" />
                        <VideoList videoList={videoList} idx="1" />
                        <Comments comments={comments} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Me