import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { baseUrl,initHome } from "../../fetch/fetch";
import {bindActionCreators} from 'redux'
import { saveAllVideo } from "../store/action";
import './more.less'

class More extends Component {
    constructor(props){
        super(props)
        console.log(this.props.match)
        console.log(this.props.allVideoList)
    }
    componentWillMount(){
         if (Object.keys(this.props.allVideoList).length === 0) {
             initHome().then(res => {
                 this.props.saveAllVideo(res.data)
             })
         }
    }
    render(){
        let idx = 0,
            name = '';
        switch (this.props.match.path) {
            case '/all':
                idx = 3
                name = '全部'
                break;
            case '/movie':
                idx = 0
                name = '电影'                
                break;
            case '/tv':
                idx = 1
                name = '电视剧'
                break;
            case '/zy':
                idx = 2
                name = '综艺'                
                break;
            default:
                break;
        }
        console.log(idx)
        let videoList = this.props.allVideoList[idx];
        return(
            <div>
                <section className="video">
                    <section className="video_list">
                        <h1>{ name }</h1>
                        <ul>
                            {
                                videoList && videoList.map((list, i) => {
                                    return (
                                        <li key={list.id}>
                                            <Link to={'video/' + list.id}>
                                                <div><img src={baseUrl+'/images/'+list.img} alt="" /></div>
                                                <h3>{list.name}</h3>
                                                <div>
                                                    <div className="starList" style={{'backgroundPositionY':-15*(10-list.star).toFixed(0)+'px'}}></div>
                                                    <span>{list.star}</span>
                                                </div> 
                                            </Link>
                                        </li>

                                    )
                                })
                            }
                        </ul>
                    </section>
                </section>
            </div>
        )
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
)(More)