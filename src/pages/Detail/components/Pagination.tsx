import React from "react";
const Pagination = (props: {
  page: number;
  commentsPageLength: number;
  nextPage: Function;
  prevPage: Function;
  goPage: Function;
}) => {
  let { page, commentsPageLength, nextPage, prevPage, goPage } = props;
  let commentLength = Math.ceil(commentsPageLength / 5);
  return (
    <section className="page">
      {commentsPageLength > 1 && page > 1 ? (
        <div onClick={() => goPage(1)}>首页</div>
      ) : (
        ""
      )}
      {page >= 2 ? <div onClick={() => prevPage()}>上一页</div> : ""}
      {page < commentLength ? <div onClick={() => nextPage()}>下一页</div> : ""}
      {page < commentLength ? (
        <div onClick={() => goPage(commentLength)}>尾页</div>
      ) : (
        ""
      )}
      {commentLength >= 1 ? (
        <div className="pageNum">{page + "/" + commentLength}页</div>
      ) : (
        ""
      )}
    </section>
  );
};
export default Pagination;
