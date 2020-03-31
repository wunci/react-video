export interface IVideo {
  id: number;
  uid: number;
  videoImg: string;
  videoName: string;
  star: string;
  img: string;
  name: string;
  time1: string;
}
export interface IComment {
  date: string;
  videoName?: string;
  id: number;
  content: string;
  userName: string;
  avator: string;
}
export interface IVideoDetail {
  name: string;
  star: string;
  img: string;
  "count(*)": number;
  detail: string;
  actors: string;
  country: string;
  timelong: string;
  type: string;
  time1: string;
}
