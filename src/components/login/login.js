import React, {Component} from 'react';
import {Avatar, Typography, Button, Card, Divider, Input} from "antd";
import firebase from "firebase";
import "./login.css"
import {UserOutlined,EyeTwoTone,EyeInvisibleOutlined,LockOutlined,GoogleOutlined,FacebookOutlined} from "@ant-design/icons"
const { Title } = Typography;

class Login extends Component {
    handleLogin = (provider) => {
        // if(provider==='f')
        // {
        //
        // }
        var provider = new firebase.auth.GoogleAuthProvider();
        var token = '123';
        firebase.auth().signInWithPopup(provider).then(res => {
                this.setState({user: res.additionalUserInfo.profile})
                localStorage.setItem('userData', JSON.stringify(res.additionalUserInfo.profile))
                window.location.reload();
            }
        )
    }
    render() {
        const buttonStyle= {height:56,borderRadius:6,fontWeight:"bolder"}
        return (
            <div className="pageContainer">
                <section className="container">
                    <div className="image-wrapper">
                    </div>
                    <div className="card-wrapper animation">
                        <article>
                            <div>
                                <div className="login-card" >
                                    <div className="login-header">Login to continue</div>
                                    <UserOutlined className="smile-icon"/>
                                    <div className="buttonWrapper">
                                        <Input className="login-input"  prefix={<UserOutlined className="site-form-item-icon" />}   placeholder="Enter your username"/>
                                        <Input.Password className="login-input"
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            placeholder="input password"
                                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                        <Button style={buttonStyle} type="default" color="primary">Login</Button>
                                    </div>

                                    <Divider orientation="center">
                                        OR
                                    </Divider>
                                    <div className="buttonWrapper">
                                        <button className="loginButton facebook-button" onClick={() => this.handleLogin('f')}  type="primary"><span>Sign in with facebook</span> <FacebookOutlined className="social-icon facebook-icon"/></button>
                                        <button className="loginButton google-button" onClick={() => this.handleLogin('g')}   type="primary"><span>Sign in with google</span><GoogleOutlined className="social-icon google-icon"/></button>
                                    </div>

                                </div>
                            </div>
                        </article>
                    </div>

                </section>
                {/*<div className="login-page-wrapper">*/}


                {/*    <div className="login-page">*/}

                {/*    </div>*/}
                {/*    <div  className="login-button-circle">as*/}
                {/*        <Button onClick={() => this.handleLogin()} type="primary">Login</Button>*/}
                {/*    </div>*/}
                {/*</div>*/}



            </div>
        );
    }
}

export default Login;