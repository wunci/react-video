import React from "react";
import { baseUrl } from "../../../fetch/fetch";
const Header = ({
  user,
  avator,
  editUserName,
  isEdit,
  handleUserNameInput,
  editNameVal,
  upload,
  logout
}: {
  user: string;
  avator: string;
  editUserName: Function;
  isEdit: boolean;
  handleUserNameInput: Function;
  editNameVal: string;
  upload: Function;
  logout: Function;
}) => {
  let UploadAvator = () => {
    if (avator === "") {
      return (
        <div>
          <input onChange={e => upload(e)} id="upload" type="file" />
          <div className="avator_border">上传头像</div>
        </div>
      );
    } else {
      return (
        <div>
          <input onChange={e => upload(e)} id="upload" type="file" />
          <div className="avator_border">
            <img src={baseUrl + "/images/avator/" + avator + ".png"} alt="" />
          </div>
        </div>
      );
    }
  };
  let UserName = () => {
    if (!isEdit) {
      return (
        <div>
          {user}
          <i
            onClick={() => editUserName("edit")}
            className="iconfont icon-bianji"
          ></i>
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="text"
            value={editNameVal}
            onChange={e => handleUserNameInput(e)}
            autoFocus
          />{" "}
          <i
            onClick={() => editUserName("post")}
            className="iconfont icon-submit"
          ></i>
        </div>
      );
    }
  };
  return (
    <section className="avator">
      <UploadAvator />

      <div className="name">{<UserName />}</div>
      <div className="logout" onClick={() => logout()}>
        <i className="iconfont icon-logout23"></i>
        退出
      </div>
    </section>
  );
};
export default Header;
