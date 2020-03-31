import axios, { AxiosResponse } from "axios";
export const baseUrl = "http://vue.wclimb.site";
// export const baseUrl = 'http://localhost:3000';
let $axios = axios.create({
  baseURL: baseUrl + "/vi/"
});

function getCookie(name: string) {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if (arr) return unescape(arr[2]);
  else return null;
}

interface IPromise {
  data: Array<any>;
  code: number;
  token: string;
  avator: string;
}
function $fetch(method: "get" | "post", url: string, data: Object = {}) {
  return new Promise<IPromise>((reslove, reject) => {
    $axios({
      method,
      url,
      data,
      headers: {
        token: getCookie("token")
      }
    })
      .then((res: AxiosResponse) => {
        let body = res.data;
        if (body.code === 200 || body.code === 201) {
          reslove(body);
        } else {
          reject(body);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 首页初始化数据
export const initHome = () => $fetch("get", "list");

// 验证码
export const yzmChange = () => $fetch("get", "getYzm");

// 注册登录
export const signin = (userName: string, password: string) =>
  $fetch("post", "signin", {
    userName,
    password
  });

// 个人评论
export const meComment = (userName: string) =>
  $fetch("post", "getUserComment", {
    userName
  });

// 获取用户喜欢不喜欢数据
export const meLike = (userName: string) =>
  $fetch("post", "getUserLikeData", {
    userName
  });

// 删除评论---
export const meDelete = (commentId: number, userName: string) =>
  $fetch("post", "deleteComment", {
    userName,
    commentId
  });

// 上传头像----
export const uploadAvator = (userName: string, avator: string) =>
  $fetch("post", "uploadAvator", {
    avator,
    userName
  });

// 获取头像
export const getAvator = (userName: string) =>
  $fetch("post", "getUserAvator", {
    userName
  });

// 编辑用户名
export const editNameData = (oldName: string, newName: string) =>
  $fetch("post", "editUserName", {
    newName,
    userName: oldName
  });

// 搜索
export const search = (val: string) =>
  $fetch("post", "search", {
    val
  });

// 获取单个video数据
export const singleVideoData = (videoId: number) =>
  $fetch("post", "getVideoById", {
    videoId
  });

// 获取评论
export const getVideoComment = (videoId: number) =>
  $fetch("post", "getVideoComment", {
    videoId
  });

// 初始化单个video的like信息（判断用户当前的选项）
export const getInitVideoLikeData = (videoId: number, userName: string) =>
  $fetch("post", "getUserSingleLike", {
    userName,
    videoId
  });

// 提交用户选择like数据
export const postVideoLikeData = (
  videoId: number,
  like: string,
  userName: string,
  videoName: string,
  videoImg: string,
  star: string
) =>
  $fetch("post", "postUserLike", {
    like,
    userName,
    videoName,
    videoImg,
    star,
    videoId
  });

// 发表评论
export const reportComment = (
  videoId: number,
  userName: string,
  content: string,
  videoName: string,
  avator: string
) =>
  $fetch("post", "postComment", {
    videoId,
    userName,
    content,
    videoName,
    avator
  });
