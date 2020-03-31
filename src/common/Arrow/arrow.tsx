import React from "react";
import * as arrow from "../../img/arrow.png";
import "./arrow.less";
const Arrow = ({ rotate, hidden }: { rotate: number; hidden: boolean }) => {
  if (hidden) {
    return (
      <div className="arrowWrap">
        <img className={rotate > 50 ? "rotate" : ""} src={arrow} alt="" />
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Arrow;
