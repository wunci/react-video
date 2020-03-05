import React, { Component } from "react";
import { baseUrl, yzmChange, signin } from "../../fetch/fetch";
import "./login.less";
import Footer from "../../common/Footer/Footer";
import { connect } from "react-redux";
import { showToast } from "../../store/action";
import { bindActionCreators } from "redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      yzm: "",
      yzmData: "",
      random: "",
      toast: {
        isShow: false,
        icon: ""
      }
    };
    this.submit = this.submit.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.changeYzm = this.changeYzm.bind(this);
  }
  componentDidMount() {
    let { user } = localStorage;

    if (user && user !== "") {
      this.props.history.push("/me");
      return;
    }
    this.changeYzm();
  }
  changeYzm() {
    yzmChange().then(res => {
      console.log("验证码", res.data);
      this.setState({
        yzmData: res.data,
        random: +new Date()
      });
    });
  }
  inputChange(e) {
    let target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }
  submit(e) {
    let { userName, yzm, yzmData, password } = this.state;
    if (userName.trim() === "") {
      this.props.showToast({
        icon: "fail",
        message: "请输入用户名"
      });
    } else if (password.trim() === "") {
      this.props.showToast({
        icon: "fail",
        message: "请输入密码"
      });
    } else if (yzm !== yzmData) {
      this.props.showToast({
        icon: "fail",
        message: "请输入正确的验证码"
      });
    } else {
      signin(userName, password)
        .then(res => {
          if (res.code === 200) {
            this.props.showToast({
              message: "登录成功"
            });
            document.cookie = `token=${res.token};max-age=${30 *
              24 *
              60 *
              60 *
              1000}`;
            localStorage.setItem("user", userName);
            localStorage.setItem("avator", res.avator);
            setTimeout(() => {
              this.props.history.push("/home");
            }, 1500);
          } else if (res.code === 201) {
            //新用户
            this.props.showToast({
              message: "注册成功"
            });
            document.cookie = `token=${res.token};max-age=${30 *
              24 *
              60 *
              60 *
              1000}`;
            localStorage.setItem("user", userName);
            setTimeout(() => {
              this.props.history.push("/home");
            }, 1500);
          }
        })
        .catch(e => {
          this.props.showToast({
            icon: "fail",
            message: e.message
          });
        });
    }
  }
  render() {
    return (
      <div>
        <Footer path="/" />
        <main>
          <section className="main_wrap">
            <section className="user_title">
              <i className="iconfont icon-denglu"></i>
              <h3>注册/登录</h3>
            </section>
            <section className="user">
              <form>
                <div className="input">
                  <div className="input_wrap">
                    <i className="iconfont icon-name"></i>
                    <input
                      type="text"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.inputChange}
                      placeholder="用户名"
                    />
                  </div>
                  <div className="input_wrap">
                    <i className="iconfont icon-mima1"></i>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.inputChange}
                      placeholder="密码"
                    />
                  </div>
                  <div className="input_wrap">
                    <i className="iconfont icon-yanzhengma1"></i>
                    <input
                      type="text"
                      name="yzm"
                      onChange={this.inputChange}
                      placeholder="验证码"
                    />
                    <img
                      onClick={this.changeYzm}
                      src={baseUrl + "/images/yzm.jpg?v=" + this.state.random}
                      alt=""
                    />
                  </div>
                </div>
                <div className="submit" onClick={this.submit}>
                  立即注册/登录
                </div>
              </form>
            </section>
          </section>
        </main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    toast: state.toast
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showToast: bindActionCreators(showToast, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
