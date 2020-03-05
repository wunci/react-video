import React from "react";
import { baseUrl } from "../../../fetch/fetch";

const Comments = props => {
  let commentsLength = props.comments.length;
  let comments = props.comments.slice((props.page - 1) * 5, props.page * 5);
  let commentList = comments.map(val => (
    <li key={val.id}>
      <Avator {...val} />
      <div className="comments_detail">
        <h4>{val.userName}</h4>
        <p>{val.date}</p>
        <div>{val.content}</div>
      </div>
    </li>
  ));
  return (
    <section className="video_comments">
      <h3>评论({commentsLength})</h3>
      <ul id="ul">{commentList}</ul>
    </section>
  );
};
const Avator = ({ avator, userName }) => {
  if (avator !== "") {
    return (
      <div className="avator">
        <img src={baseUrl + "/images/avator/" + avator + ".png"} alt="" />
      </div>
    );
  } else {
    return <div className="avator">{userName.charAt(0)}</div>;
  }
};
export default Comments;
