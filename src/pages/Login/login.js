import React, {Component} from 'react'
import {baseUrl,yzmChange,signin} from '../../fetch/fetch'
import './login.less'
import Toast from "../../common/Toast/Toast";
import Footer from '../../common/Footer/Footer'
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            userName: '',
            password: '',
            yzm: '',
            yzmData: '',
            random: '',
            toast:{
                isShow:false,
                icon:''
            }
        }
        this.submit = this.submit.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.changeYzm = this.changeYzm.bind(this)
    }
    componentDidMount() {
        let {user} = localStorage
        
        if (user && user !== '') {
            this.props.history.push('/me')
            return
        }
        this.changeYzm()
    }
    changeYzm(){
        yzmChange().then(res=>{
            console.log('验证码',res.data)
            this.setState({
                yzmData: res.data,
                random: +new Date()
            })
        })
    }
    inputChange(e){
        let target = e.target
        console.log(target.name)
        this.setState({
            [target.name]: target.value
        })
    }
    $message(data = {icon:'success',message:''}){
        this.setState({
            toast: {
                isShow: true,
                icon: data.icon === 'fail' ?  'icon-shibai' : 'icon-chenggong',
                message: data.message
            }
        })
        setTimeout(() => {
            this.setState({
                toast: {
                    isShow: false, 
                }
            })
        }, 1500);
    }
    submit(e){
        console.log(e)
        console.log(this.state)
        
        let {userName,yzm,yzmData,password} = this.state
        if (userName.trim() === ''){
            this.$message({
                icon:'fail',
                message: '请输入用户名'
            })
        }else if(password.trim() === ''){
            this.$message({
                icon: 'fail',
                message: '请输入密码'
            })
        } else if (yzm !== yzmData) {
            this.$message({
                icon: 'fail',
                message: '请输入正确的验证码'
            })
        }else{
            signin(userName,password).then(res=>{
                if (res.code === 200) {
                    this.$message({
                        message: '登录成功'
                    })
                    document.cookie = `token=${res.token};max-age=${30*24*60*60*1000}`
                    localStorage.setItem('user', userName)
                    localStorage.setItem('avator', res.avator)
                    setTimeout(() => {
                        this.props.history.push('/home')
                    }, 1500)
                } else if (res.code === 201) {
                    //新用户
                    this.$message({
                        message: '注册成功'
                    })
                    document.cookie = `token=${res.token};max-age=${30*24*60*60*1000}`
                    localStorage.setItem('user', userName)
                    setTimeout(() => {
                        this.props.history.push('/home')
                    }, 1500)
                }
            }).catch(e=>{
                this.$message({
                    icon:'fail',
                    message: e.message
                })
            })
        }
    }
    render(){
        let {icon,isShow,message} = this.state.toast
        return(
            <div>
                <Footer path="/" />
                <main>
                    <Toast icon={icon} message={message} isShow={isShow} />
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
                                        <input type="text" name="userName" value={this.state.userName}  onChange={this.inputChange} placeholder="用户名" />
                                    </div>
                                    <div className="input_wrap">
                                        <i className="iconfont icon-mima1"></i>
                                        <input type="password" name="password" value={this.state.password} onChange={this.inputChange} placeholder="密码" />
                                    </div>
                                    <div className="input_wrap">
                                        <i className="iconfont icon-yanzhengma1"></i>
                                        <input type="text" name="yzm" onChange={this.inputChange} placeholder="验证码" />
                                        <img onClick={this.changeYzm}  src={baseUrl +'/images/yzm.jpg?v='+this.state.random} alt="" />
                                    </div>
                                </div>
                                <div className="submit" onClick={this.submit}>立即注册/登录</div> 
                            </form>
                        </section>
                    </section> 
                </main>
            </div>
        )
    }
}
export default Login