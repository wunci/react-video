import './toast.less';
import React, { Component } from 'react'
export default class Toast extends Component {
    // constructor(props){
    //     super(props)
        
    // }
    show(){
        
    }
    render(){
        if(this.props.isShow){
            return (
                <section className={'dialog'}>
                    <div className="dialog_wrap aniDialog">
                        <i className={'iconfont '+ this.props.icon}></i>
                        <p>{this.props.message}</p>
                    </div>
                </section>
            )
        }else{
            return ''
        }
       
    }
}

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

