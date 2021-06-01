import React, {Component} from 'react';
import {getUsers} from "../../apicall/users";
import "./user.css"
import {Modal, Avatar, Button, Card, message} from "antd";
import {Link} from "react-router-dom";
import AddUser from "./addUser";
import MultipleInput from "./multipleRefsExample";
import firebase from "firebase";
import {TestContext} from "../context/testContext";
import {DeleteOutlined} from "@ant-design/icons"
import {database, firebaseConfig} from "../../config";

class Users extends Component {
    static contextType = TestContext;
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

        let dbUsers=[];

        database.collection('users').get().then((res)=>
        {

            res.forEach(res=>{
                console.log(res.data())
                dbUsers.push(res.data())
            })
            this.setState({users:dbUsers})
            console.log(dbUsers)

        })
    }
    updateUser=(res)=>
    {
        console.log('res')
        console.log(res)
        this.getAllUsers();
        this.setState({addUser:false})
    }
    handleDelete=(id)=>
    {
        let database=firebase.firestore();
        database.collection("users").doc(id).delete()
            .then((res) => {
                this.getAllUsers();
            })
            .catch((error) => {
                console.log(error);

                console.error( error);
            });
    }
    render() {
        const {users} = this.state;
        return (
            <div >
                <div className="paddingLeftRight20 space-bwtn">
                    <h2>Users</h2>
                    <Button onClick={()=>this.setState({addUser:true})}>Add User</Button>
                </div>
                {users.length?
                    <div className="userWrapper">

                        {users.map((user) =>
                                <Card className="userCard">
                                    <div className="space-bwtn">
                                        <div>
                                            <img src={user.avatar||null} alt="user" draggable={false}/>
                                        </div>
                                        <div >
                                            <span className="header-title">{user.name}</span>
                                            <br/>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                            <br/>
                                            <a href={`tel:98655256466}`}>9864555555</a>
                                            <br/>
                                            <DeleteOutlined onClick={()=>this.handleDelete(user.id)}/>
                                            {/*<Avatar style={{backgroundColor:"darkblue"}}>{user.name.charAt(0)}</Avatar>*/}
                                        </div>
                                    </div>


                                </Card>
                      )

                        }

                    </div> : <div align="center">No data</div>}
                <Modal footer={null} title="Basic Modal" visible={this.state.addUser} onOk={()=>console.log('123')} onCancel={()=>this.setState({addUser:false})}>
                    <MultipleInput addedUser={(res)=>this.updateUser(res)} firstName={""} lastName={""} Email={""}/>
                </Modal>
            </div>
        );
    }
}

export default Users;