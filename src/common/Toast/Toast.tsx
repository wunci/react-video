import "./toast.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { showToast } from "../../store/action";
import { bindActionCreators, Dispatch } from "redux";

interface IRecipeProps {
  toast: { isShow: Boolean; message: string; icon: string };
  showToast: Function;
}
class Toast extends Component<IRecipeProps> {
  constructor(props: IRecipeProps) {
    super(props);
  }
  componentWillReceiveProps() {
    let toast = this.props.toast;
    let isShow = toast.isShow === false ? toast.isShow : true;
    if (!isShow) {
      setTimeout(() => {
        this.props.showToast({
          isShow: false
        });
      }, 1500);
    }
  }
  render() {
    let toast = this.props.toast;
    let isShow = toast.isShow === false ? toast.isShow : true;
    if (isShow) {
      return (
        <section className={"dialog"}>
          <div className="dialog_wrap aniDialog">
            <i
              className={
                "iconfont " +
                (toast.icon === "fail" ? "icon-shibai" : "icon-chenggong")
              }
            ></i>
            <p>{toast.message}</p>
          </div>
        </section>
      );
    } else {
      return "";
    }
  }
}

function mapStateToProps(state: IRecipeProps) {
  return {
    toast: state.toast
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    showToast: bindActionCreators(showToast, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
