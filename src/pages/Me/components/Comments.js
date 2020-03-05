import React from "react";

const Comments = ({ comments, start, move, end, deleteComment }) => {
  let items =
    comments &&
    comments.map(val => (
      <li key={val.id}>
        <section
          className="commentWrap"
          onTouchStart={e => start(e)}
          onTouchMove={e => move(e)}
          onTouchEnd={e => end(e)}
        >
          <h5>影片：{val.videoName}</h5>
          <section>
            <span>评论：</span>
            <p>{val.content}</p>
          </section>
          <div className="time">{val.date}</div>
        </section>
        <div className="delete" onClick={e => deleteComment(val.id, e)}>
          删除
        </div>
      </li>
    ));
  return (
    <section className="comment list">
      <h3>
        <i className="iconfont icon-pinglun1"></i>
        评论<span>({comments && comments.length})</span>
      </h3>
      <ul>{items}</ul>
    </section>
  );
};
export default Comments;
