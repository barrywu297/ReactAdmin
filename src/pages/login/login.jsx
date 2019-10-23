import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import './login.less'
import logo from './images/logo.svg'

/** 登陆的路由组件 */
class Login extends Component {
    handleSubmit = (e) => {
        //阻止事件的默认行为
        e.preventDefault();
        //对所有表单字段进行检验
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('提交登陆的ajax请求: ', values);
            } else {
                console.log('检验失败！');
            }
          });
        

        // //获取form对象
        // const form = this.props.form;
        // //获取表单项数据
        // const values = form.getFieldsValue();
        // console.log("handleSubmit():", values);
    }
    /**
     * 密码自定义验证
     * 用户名/密码的合法性要求
     * 1）必须输入
     * 2）必须大于4位
     * 3）必须小于12位
     * 4）必须是英文，数字或下划线组成
     */
    validatorPwd = (rule, value, callback) => {
        if(!value) {
            callback('密码必须输入');
        } else if(value.length < 4) {
            callback('密码长度必须大于4位');
        } else if(value.length > 12) {
            callback('密码长度必须小于12位');
        }
        else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文，数字或下划线组成');
        } else {
            callback(); //验证通过
        }
        //callback('xxx'); //验证失败，并指定提示文本
    }

    render() {
        //获取具有强大功能的from对象
        const form = this.props.form;
        const { getFieldDecorator } = form;

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React Admin</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /**
                                 * 用户名/密码的合法性要求
                                 * 1）必须输入
                                 * 2）必须大于4位
                                 * 3）必须小于12位
                                 * 4）必须是英文，数字或下划线组成
                                 */
                            }
                            {
                                getFieldDecorator('username', {//配置对象：属性名是特定的一些名称
                                    //声明式验证：直接使用别人定义好的验证规则来进行验证
                                    rules: [
                                        { required: true, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文,数字或下划线组成' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />,
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        { validator: this.validatorPwd }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )
                            }
                            
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

/**
 * 1.高阶函数
 *  1）一类特别的函数
 *      a.接受函数类型的参数
 *      b.返回值是函数
 *  2）常见
 *      a.定时器: setTimeout()/setInterval() 
 *      b.Promise: Promise(() => {}) then (value=> {}, reason =>{})
 *      c.数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
 *      d.函数对象的bind()
 *      e.Form.create()()/getFieldDecorator()()
 *  3)高阶函数更新动态，更加具有扩展性
 * 
 * 2.高阶组件
 *  1）本质是一个函数
 *  2）接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
 *  3）作用：扩展组件的功能
 *  4）高阶组件也是高阶函数：接受一个组件函数，返回是一个新的组件函数
 */

/** 
 * 包装From组件生成的一个新组件：Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性：form
 */

const WrappedLoginForm = Form.create()(Login);
export default WrappedLoginForm;

/**
 * 1.前台表单验证
 * 2.收集表单输入数据
 */