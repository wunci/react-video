import './toast.less';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showToast } from "../../pages/store/action";
import {bindActionCreators} from 'redux'
class Toast extends Component {
    // constructor(props){
    //     super(props) 
    // }
    componentWillReceiveProps(){
        let toast = this.props.toast;        
        let isShow = toast.isShow === false ? toast.isShow : true
        if (!isShow) {
            console.log('show toast')
            setTimeout(() => {
                this.props.showToast({
                    isShow: false
                })
            }, 1500);
        }
    }
    render(){
        let toast = this.props.toast; 
        console.log(toast)
        let isShow = toast.isShow === false ? toast.isShow : true
        if (isShow) {
            return (
                <section className={'dialog'}>
                    <div className="dialog_wrap aniDialog">
                        <i className={'iconfont '+ (toast.icon === 'fail' ?  'icon-shibai' : 'icon-chenggong')}></i>
                        <p>{toast.message}</p>
                    </div>
                </section>
            )
        }else{
            return ''
        }
       
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
)(Toast)
// export let Toast = function (text, timeout, options) {

//     //如果已经弹出一个了，那么就先移除，这边只会有一个

//     try {
//         document.body.removeChild(document.querySelector('div.toast-it'));
//     } catch (e) {

//     }

//     //开始创造
//     var timeout = timeout || 3000;
//     let toast = document.createElement('DIV');
//     toast.classList.add('toast-it');
//     let content = document.createTextNode(text);
//     toast.appendChild(content);
//     toast.style.animationDuration = timeout / 1000 + 's';

//     for (let prop in options) {
//         toast.style[prop] = options[prop];
//     }
//     //别被挡住了
//     toast.style['z-index'] = 9999999;
//     document.body.appendChild(toast);
//     setTimeout(function () {
//         try {
//             document.body.removeChild(toast);
//         } catch (e) {

//         }
//     }, timeout);
// };

