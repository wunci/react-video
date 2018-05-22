import React, {Component} from 'react'
import './home.less'
import { initHome } from '../../fetch/fetch'
// import {Link} from 'react-router-dom'
import {List} from './components/List'
import Footer from '../../common/Footer/Footer'
import { connect } from 'react-redux'
import { saveAllVideo } from "../store/action";
import {bindActionCreators} from 'redux'
import Loading from '../../common/Loading/Loading'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            loadDone:false
        };
    }
    async componentDidMount() {
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
    }
    componentWillUnmount() {
        
    }
    render() {
        // console.log('videoList',this.state.videoList[0])
        return (
            <div className="home" >
                <Loading loading={this.state.loadDone} />
                <Footer path="home" />
                <List videoList={this.state.videoList} idx={3} name="全部" link="/all" />
                <List videoList={this.state.videoList} idx={0} name="电影" link="/movie" />
                <List videoList={this.state.videoList} idx={1} name="电视剧" link="/tv" />
                <List videoList={this.state.videoList} idx={2} name="综艺" link="/zy" />
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)