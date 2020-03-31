import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../fetch/fetch";

interface IVideoListProps {
  idx: number;
  videoList: Array<Array<IVideo>>;
}
interface IVideo {
  id: number;
  uid: number;
  videoImg: string;
  videoName: string;
  star: string;
}
const VideoList = (props: IVideoListProps) => {
  let videoList = props.videoList;
  let idx = props.idx;
  let items =
    videoList &&
    videoList[idx] &&
    videoList[idx].map((val: IVideo) => (
      <li key={val.id}>
        <Link to={"/video/" + val.uid}>
          <img src={baseUrl + "/images/" + val.videoImg} alt="" />
          <h4>{val.videoName}</h4>
          <div>
            <div
              className="starList"
              style={{
                backgroundPositionY:
                  -15 * Number((10 - +val.star).toFixed(0)) + "px"
              }}
            ></div>
            <span>{val.star}</span>
          </div>
        </Link>
      </li>
    ));
  return (
    <section className=" list">
      <h3>
        <i
          className={
            "iconfont " + (idx === 0 ? "icon-msnui-love" : "icon-buxihuan")
          }
        ></i>
        {idx === 0 ? "喜欢" : "不喜欢"}
        <span>({videoList && videoList[idx] && videoList[idx].length})</span>
      </h3>
      <ul>{items}</ul>
    </section>
  );
};
export default VideoList;
