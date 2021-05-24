import React, {Component} from 'react';
import {getUsers} from "../../apicall/users";
import "./user.css"
import {Modal, Avatar, Button, Card, message} from "antd";
import {Link} from "react-router-dom";
import AddUser from "./addUser";
import MultipleInput from "./multipleRefsExample";
class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: [],
            addUser:false
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
    updateUser=(res)=>
    {
        res.first_name=res.name.toUpperCase();
        res.last_name=res.job;
        res.avatar="https://reqres.in/img/faces/2-image.jpg";
        this.state.users.data.push(res)
        this.setState({users: this.state.users,addUser:false})
        message.success('User added')
    }
    render() {
        const {users} = this.state;
        return (
            <div >
                <div className="paddingLeftRight20 space-bwtn">
                    <h2>Users</h2>
                    <Button onClick={()=>this.setState({addUser:true})}>Add User</Button>
                </div>
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
                <Modal footer={null} title="Basic Modal" visible={this.state.addUser} onOk={()=>console.log('123')} onCancel={()=>this.setState({addUser:false})}>
                    <MultipleInput addedUser={(res)=>this.updateUser(res.data)} firstName={""} lastName={""} Email={""}/>
                </Modal>
            </div>
        );
    }
}

export default Users;