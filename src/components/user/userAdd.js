import React, {Component} from 'react';
import {addUser, deleteUser, editUser, getUsers} from "../../apicall/users";

class UserAdd extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            users: [],
            job: '',
            editUserFlag: false
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        getUsers().then(res => {
            var newUser = {
                avatar: "https://reqres.in/img/faces/1-image.jpg",
                email: "george.bluth@reqres.in",
                first_name: "Sudhir",
                id: 100,
                last_name: "Bhattarai"
            }
            res.data.data.push(newUser)
            res.data.data.forEach(function (user, index) {
                    if (user.first_name === 'Emma') {
                        res.data.data.splice(index, 1)
                    }
                }
            )
            this.setState({users: res.data.data})

            console.log(res.data.data);
        })
    }
    addNewUser = (e) => {
        e.preventDefault();
        addUser(this.state.name, this.state.job).then(r => console.log(r)).catch(e => console.log(e))
    }
    editUser = (e, user) => {
        e.preventDefault();
        this.setState({editUser: true})
        editUser(user.name, user.job).then(r => console.log(r)).catch(e => console.log(e))
    }
    handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }
    handleExisting = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {users, editUserFlag} = this.state;
        return (
            <div align="center" style={{display: "grid", padding: 20}}>
                {users.filter(user => user.first_name !== 'George').sort().map(user =>

                    <div style={{color: user.first_name === 'Sudhir' ? 'blue' : 'green'}}>
                        <img src={user.avatar}/><br/>
                        {user.first_name}
                        <button onClick={(e) => {
                            this.setState({editUserFlag:true})
                        }}>edit</button>
                        {editUserFlag?
                            <form onSubmit={(e) => this.editUser(e)}>
                                <input value={user.first_name} name="name"
                                       onChange={(e) => this.handleExisting(e, 'name')}/><br/>
                                <input value={user.job} name="job"
                                       onChange={(e) => this.handleExisting(e, 'job')}/><br/>
                                <button type="submit">submit</button>
                            </form> : ''}
                    </div>)}
                <form onSubmit={(e) => this.addNewUser(e)}>
                    <input name="name" onChange={(e) => this.handleChange(e)}/><br/>
                    <input name="job" onChange={(e) => this.handleChange(e)}/><br/>
                    <button type="submit">submit</button>
                </form>
                <button onClick={()=>deleteUser()} >delete user</button>
            </div>
        );
    }
}

export default UserAdd;