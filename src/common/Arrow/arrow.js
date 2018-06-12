import React from 'react'
import arrow from '../../img/arrow.png';
import './arrow.less'
const Arrow = ({rotate,hidden}) => {
    console.log(rotate)
    if (hidden){
        return  <div className="arrowWrap"><img className={rotate > 50 ? 'rotate' : ''} src={arrow} alt=""/></div>
    }else{
        return ''
    }
}
export default Arrow