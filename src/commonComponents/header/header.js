import React, {Component} from 'react';
import {SmileOutlined} from "@ant-design/icons"
import "./style.css"
import {Link} from "react-router-dom";

class Header1 extends Component {
    render() {
        return (
            <div>
                <div className="header-top">
                    <div>
                        <SmileOutlined style={{fontSize:30,color:"#fefefe"}} className="logoIcon" />
                        <span className="titleText" >Happy Quotes</span>
                        <Link style={{textDecoration:"none"}} to={"/"}><span className="titleText item">home</span> </Link>
                        <Link style={{textDecoration:"none"}} to={"/about"}><span className="titleText item">About</span> </Link>
                        {!this.props.isLogin?'Logout':'Login'}
                    </div>
                </div>

            </div>
        );
    }
}

export default Header1;