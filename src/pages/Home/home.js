import React, {Component} from 'react'
import './home.less'
import { initHome } from '../../fetch/fetch'
// import {Link} from 'react-router-dom'
import {List} from './components/List'
import Footer from '../../common/Footer/Footer'
import { connect } from 'react-redux'
import { saveAllVideo,showToast } from "../../store/action";
import {bindActionCreators} from 'redux'
import Loading from '../../common/Loading/Loading'
import Arrow from '../../common/Arrow/arrow'
import Search from './components/Search'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            loadDone:false,
            pStart: 0,
            pScroll: 0,
            isPullDown:false,
            isStart:false
        };
        this.pullDownStart = this.pullDownStart.bind(this)
        this.pullDownMove = this.pullDownMove.bind(this)
        this.pullDownEnd = this.pullDownEnd.bind(this)
    }
    async componentDidMount() {
        console.log('allVideoList', this.props.allVideoList)
        
        if (!Array.isArray(this.props.allVideoList) || this.state.isPullDown) {
            await initHome().then(res=>{
                this.setState({
                    videoList: res.data,
                })
                this.props.saveAllVideo(res.data)
                console.log(this.props.allVideoList)
            })
            setTimeout(() => {
                this.setState({
                    loadDone: true
                })
            }, 500);
        }else{
            this.setState({
                videoList: this.props.allVideoList,
                loadDone: true                
            })
        }
      
    }
    componentWillUnmount() {
        
    }
    pullDownStart(e){
        console.log(e.touches[0].pageY)
        this.setState({
            pStart: e.touches[0].pageY,
            isStart:true
        })
    }
    pullDownMove(e){
        e.preventDefault();
        let pScroll = Math.ceil((e.touches[0].pageY - this.state.pStart) * 0.6)
        console.log(pScroll, e.touches[0].pageY)
        this.setState({
            pScroll,
            
        })
    }
    pullDownEnd(e){
        console.log('end', e)
        let pScroll = this.state.pScroll
        this.setState({
            pScroll: 0,
            isPullDown: true,
            isStart: false,
            loadDone: pScroll >= 50 ? false : true,
        })
        if (pScroll >= 50 ){
            this.componentDidMount()
        }
    }
    render() {
        // console.log('videoList',this.state.videoList[0])
        let {pScroll,videoList,loadDone,isStart} = this.state
        console.log(isStart, 'isStart')
        return (
            <div className="home" >
                <Search />
                <Footer path="home" />
                <div className="wrap">

                    <div className="pulldownWrap"
                        onTouchStart={this.pullDownStart}
                        onTouchMove={this.pullDownMove}
                        onTouchEnd={this.pullDownEnd}
                       
                        style = {
                            {
                                top: (pScroll > 0 ? pScroll : 0) + 'px'
                            }
                        } >
                        <Arrow hidden={loadDone&&isStart} rotate={pScroll} /> 
                        <Loading loading={loadDone} />
                        <List videoList={videoList} idx={3} name="全部" link="/all" />
                        <List videoList={videoList} idx={0} name="电影" link="/movie" />
                        <List videoList={videoList} idx={1} name="电视剧" link="/tv" />
                        <List videoList={videoList} idx={2} name="综艺" link="/zy" />
                    </div>

                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        allVideoList: state.videoList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveAllVideo: bindActionCreators(saveAllVideo, dispatch),
        showToast: bindActionCreators(showToast, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)