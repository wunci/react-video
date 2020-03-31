import { combineReducers } from "redux";
const videoList = (
  state = {},
  action: { type: string; video: Array<Object> }
) => {
  switch (action.type) {
    case "SAVE_ALL_VIDEO":
      return action.video;
    default:
      return state;
  }
};
const toast = (
  state = { icon: "", message: "", isShow: false },
  action: { type: string; toast: Object }
) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return action.toast;
    default:
      return state;
  }
};
const reducer = combineReducers({
  videoList,
  toast
});
export default reducer;
