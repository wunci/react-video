import React from "react";
import { baseUrl } from "../../../fetch/fetch";
import { Link } from "react-router-dom";
import { IVideo } from "../../type";
interface IListProps {
  videoList: Array<Array<IVideo>>;
  idx: number;
  name: string;
  link: string;
}
export const List = (props: IListProps) => {
  let list = props.videoList;
  let idx = props.idx;
  let listItems =
    list[idx] &&
    list[idx].map((val: IVideo, i: number) => {
      return <ListDetail key={i} {...val} />;
    });
  return (
    <section className="video_list">
      <div className="video_list_header">
        <h3>
          {props.name}
          <span>({list[idx] && list[idx].length})</span>
        </h3>
        <Link to={props.link}>
          更多 <i className="iconfont icon-jiantouyou"></i>
        </Link>
      </div>
      <ul>{listItems}</ul>
    </section>
  );
};

export const ListDetail = (props: IVideo) => (
  <li>
    <Link to={"/video/" + props.id}>
      <div className="preImg">
        <img src={baseUrl + "/images/" + props.img} alt="" />
      </div>
      <h3>{props.name}</h3>
      <div>
        <div
          className="starList"
          style={{
            backgroundPositionY:
              -15 * Number((10 - +props.star).toFixed(0)) + "px"
          }}
        ></div>
        <span>{props.star}</span>
      </div>
    </Link>
  </li>
);
