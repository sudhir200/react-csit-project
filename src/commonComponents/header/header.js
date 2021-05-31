import React, {Component} from 'react';
import {SmileOutlined} from "@ant-design/icons"
import "./style.css"
import {Link} from "react-router-dom";
import {Avatar, Button, Popover} from "antd";
import {TestContext as UserContext} from "../../components/context/testContext"
import firebase from "firebase";

class Header1 extends Component {
    static contextType = UserContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: !!JSON.parse(localStorage.getItem('userData')),
            userInfo: JSON.parse(localStorage.getItem('userData')) || {},

        }

    }

    componentDidMount() {
        console.log(this.context)
        // this.setState({user:this.context})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // this.setState({isLogin: nextProps.isLogin})
    }

    handleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        var token = '123';
        firebase.auth().signInWithPopup(provider).then(res => {
                this.setState({user: res.additionalUserInfo.profile})
                localStorage.setItem('userData', JSON.stringify(res.additionalUserInfo.profile))
            }
        )
    }


    render() {
        const {userInfo} = this.state;
        return (
            <div>
                <div className="header-top">
                    <div>
                        <SmileOutlined style={{fontSize: 30, color: "#fefefe"}} className="logoIcon"/>
                        <span className="titleText">CSIT LECTURE</span>
                    </div>
                    <div style={{paddingTop: 30}}>
                        <Link style={{textDecoration: "none"}} to={"/"}><span className="titleText item">home</span>
                        </Link>
                        <Link style={{textDecoration: "none"}} to={"/about"}><span
                            className="titleText item">About</span> </Link>
                        <Link style={{textDecoration: "none"}} to={"/movies"}><span
                            className="titleText item">Movies</span> </Link>
                        <Link style={{textDecoration: "none"}} to={"/users"}><span
                            className="titleText item">Users</span> </Link>
                        <Link style={{flexGrow: 0.5, textDecoration: "none"}} to={"/todo"}><span
                            className="titleText item">TO-DO list</span> </Link>
                    </div>
                    <div style={{paddingTop: 30, marginRight: 10}}>

                        {this.state.isLogin ?
                            <Popover trigger="click" content={
                                <div>
                                    <Button onClick={()=>{
                                        localStorage.clear();
                                        window.location.href="/";
                                    }}>Logout</Button>
                                </div>} title={null}>
                                <Avatar src={userInfo.picture}/>
                            </Popover> :
                            <Button onClick={() => this.handleLogin()} type="primary">Login</Button>}
                    </div>


                </div>

            </div>
        );
    }
}

export default Header1;