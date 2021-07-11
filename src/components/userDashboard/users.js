import React, {Component} from 'react';
import "./user.css"
import {Popconfirm, Tag, Button, Card, Modal, Image, Empty} from "antd";
import MultipleInput from "./multipleRefsExample";
import firebase from "firebase";
import {TestContext} from "../context/testContext";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import {database} from "../../config";

class Users extends Component {
    static contextType = TestContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            users: [],
            loading:false,
            selectedUser: {},
            addUser: false,
            mode:null
        }
    }

    componentDidMount() {
        document.title="Users";
        this.getAllUsers();
    }

    getAllUsers = () => {

        let dbUsers = [];
        this.setState({loading:true})

        database.collection('users').get().then((res) => {
            res.forEach(res => {
                dbUsers.push(res.data())
            })
            console.log(dbUsers)
            this.setState({loading:false,users: dbUsers})
            this.setState({addUser: false})

        })
    }
    updateUser = (res) => {
        console.log('res')
        console.log(res)
        this.getAllUsers();
        this.setState({addUser: false})
    }
    handleDelete = (id) => {
        let database = firebase.firestore();
        database.collection("users").doc(id).delete()
            .then((res) => {
                this.getAllUsers();
            })
            .catch((error) => {
                console.log(error);

                console.error(error);
            });
    }

    render() {
        const {users,loading} = this.state;
        return (
            <div>
                <div className="paddingLeftRight20 space-between">
                    <h2>Users</h2>
                    <Button onClick={() => this.setState({mode:'add',addUser: true})}>Add User</Button>
                </div>
                {users.length && !loading?
                    <div className="userWrapper">
                        {users.map((user) =>
                            <div className="userCard">
                                <div className="space-bwtn">
                                    <div  style={{display:"block"}}>
                                        <Image className="user-img" src={user.avatar || null} alt="user" draggable={false}/>
                                    </div>
                                    <div>
                                        <span className="header-title">{user.fName + ' ' + user.lName}</span>
                                        <br/>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                        <br/>
                                        <a href={`tel:${user.phone}`}>{user.phone}</a>
                                        <br/>
                                        {user.admin?<Tag color="green">Admin</Tag>:'' }

                                        {/*<Avatar style={{backgroundColor:"darkblue"}}>{user.name.charAt(0)}</Avatar>*/}
                                    </div>
                                    <Popconfirm
                                        placement="left"
                                        title={`Are you sure to delete ${user.fName}`}
                                        onConfirm={() => this.handleDelete(user.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                      <DeleteOutlined className="delete-icon"/>
                                    </Popconfirm>
                                    <EditOutlined onClick={()=> {
                                        this.setState({selectedUser:user,mode:'edit',addUser:true})
                                    }} className="edit-icon"/>



                                </div>
                                <span>{user.description}</span>

                            </div>
                        )

                        }

                    </div> : <div align="center"><Empty description="no users found"/></div>}
                <Modal footer={null} title={this.state.mode==='add'?"Add User":"Edit User"} visible={this.state.addUser} onOk={() => console.log('123')}
                       onCancel={() => this.setState({addUser: false})}>
                    <MultipleInput selectedUser={this.state.selectedUser} mode={this.state.mode} updatedUser={()=>this.getAllUsers()}  addedUser={(res) => this.updateUser(res)} firstName={""} lastName={""} Email={""}/>
                </Modal>
            </div>
        );
    }
}

export default Users;