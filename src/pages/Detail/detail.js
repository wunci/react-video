import React, {Component} from "react";
import './detail.less'
import { singleVideoData,getVideoComment } from '../../fetch/fetch'
import VideoDetail from './components/VideoDetail'
class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            videoDetail:null,
            videoId: this.props.match.params.id
        }
        console.log(this.props.match.params.id)
    }
    async componentWillMount() {
        let videoDetail
        let videoId = this.state.videoId
        await singleVideoData(videoId).then(res=>{
            videoDetail = res.data
        })
        await getVideoComment(videoId).then(res => {
            this.setState({
                videoComment: res.data,
                videoDetail
                
            })
        })
    }
    render(){
        return (
            <div>
                <VideoDetail goBack={()=>(this.props.history.goBack())} detail={this.state.videoDetail} comments={this.state.videoComment} />
            </div>
        )
    }
}
export default Detail