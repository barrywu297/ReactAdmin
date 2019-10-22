import React, { Component } from 'react';
import './login.less'
import logo from './images/logo.svg'

/** 登陆的路由组件 */
class Login extends Component {
    render() {
        return (
           <div className="login">
               <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React Admin</h1>
               </header>
               <section className="login-content">
                    <h1>用户登录</h1>
                    <div>输入账号密码</div>
               </section>
           </div>
        );
    }
}

export default Login;