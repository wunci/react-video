export const saveAllVideo = (video: Array<Object>) => ({
  type: "SAVE_ALL_VIDEO",
  video
});

export const showToast = (toast: Object) => ({
  type: "SHOW_TOAST",
  toast
});
