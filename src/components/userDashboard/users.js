import React, {Component} from 'react';
import {getUsers} from "../../apicall/users";
import "./user.css"
import {Avatar, Card} from "antd";
import {Link} from "react-router-dom";
class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        let self = this;
        getUsers().then(function (res) {
            self.setState({users: res})
        })
    }

    render() {
        const {users} = this.state;
        return (
            <div >
                {users.data?
                    <div className="gridWrapper">

                        {users.data.map((user) =>
                            <Link  to={`/user/${user.id}`}>
                                <Card className="userCard">
                                    <div className="space-bwtn">
                                        <div>
                                            <img src={user.avatar} alt="user" draggable={false}/>

                                        </div>
                                        <div >
                                            <span className="header-title">{user.first_name+'   '+user.last_name}</span>
                                            <br/>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                            <br/>
                                            <a href={`tel:98655256466}`}>9864555555</a>
                                            <br/>
                                            <Avatar style={{backgroundColor:"darkblue"}}>{user.first_name.charAt(0)}</Avatar>
                                        </div>
                                    </div>


                                </Card>
                            </Link>
                      )

                        }

                    </div> : <div align="center">No data</div>}
            </div>
        );
    }
}

export default Users;