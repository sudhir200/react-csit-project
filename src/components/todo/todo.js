import React, {Component} from 'react';
import {database, randomIdGenerator} from "../../config";
import firebase from "firebase";
import {Button, Card, Checkbox, Drawer, message} from "antd";
import "./todo.css"
import {PlusCircleOutlined} from "@ant-design/icons"

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoAddItems: {},
            toDoList: [],
            addingNew: false
        }

    }


    componentDidMount() {
        this.getAllToDoList()
    }

    getAllToDoList = () => {
        let dbUsers = [];

        database.collection('to-dos').get().then((res) => {

            res.forEach(res => {
                console.log('---to-do data-----')
                console.log(res.data())
                dbUsers.push(res.data())
            })
            console.log('dbUsers')
            console.log(dbUsers)
            this.setState({toDoList: dbUsers})
            console.log(dbUsers)

        })
    }
    handleDelete = (id) => {
        let database = firebase.firestore();
        database.collection("to-dos").doc(id).delete()
            .then((res) => {
                this.getAllUsers();
            })
            .catch((error) => {
                console.log(error);

                console.error(error);
            });
    }

    handleUpdateTask=(e)=>
    {
        let database = firebase.firestore();
        database.collection("to-dos").doc(id).delete()
            .then((res) => {
                this.getAllUsers();
            })
            .catch((error) => {
                console.log(error);

                console.error(error);
            });
    }
    handleAddTask = (e) => {
        e.preventDefault();
        let randomId = randomIdGenerator();
        let database = firebase.firestore();
        console.log(this.state.toDoAddItems.task)
        console.log(this.state.toDoAddItems.description)
        database.collection("to-dos").doc(randomId).set({
            id: randomId,
            task: this.state.toDoAddItems.task,
            completed: false,
            description: this.state.toDoAddItems.description

        })
            .then((res) => {

                document.getElementById('add-task').reset();
                console.log(res);
                message.info('new task added')
                this.setState({addingNew:false})
            })
            .catch((error) => {
                console.log(error);

                console.error(error);
            });
        // addUser(inputRef.current['name'].value,inputRef.current['job'].value).then(r=>addedUser(r))
    }


    render() {
        const {toDoList, addingNew, toDoAddItems} = this.state;
        return (
            <div>
                <div className="todoListWrapper">
                    {toDoList ? toDoList.map((item) =>
                        <Card className="todo-card">
                            <div className="space-between">
                                <span>{item.task}</span>
                                <Checkbox checked={item.completed}/>
                            </div>
                            <div>
                                <span>{item.description}</span>
                            </div>

                        </Card>
                    ) : ''}
                    <div className="add-icon-wrap">
                        <PlusCircleOutlined onClick={(e) => {
                            this.setState({addingNew: !addingNew})
                        }} className="add-icon"/>
                    </div>

                </div>


                <Drawer
                    title="Basic Drawer"
                    placement={"right"}
                    width="700px"
                    style={{}}
                    closable={false}
                    onClose={() => this.setState({addingNew: false})}
                    visible={addingNew}
                    key={"placement"}
                >
                    <div className="displayGrid">
                        <form  id="add-task" onSubmit={(e) => this.handleAddTask(e)}>
                            <input onChange={(e) => {
                                toDoAddItems.task = e.target.value
                                this.setState({toDoAddItems: toDoAddItems})
                            }} required placeholder="please enter title" className="todo-input"
                                   value={toDoAddItems.task}/>
                            <input onChange={(e) => {
                                toDoAddItems.description = e.target.value
                                this.setState({toDoAddItems: toDoAddItems})
                            }} required placeholder="please enter description" className="todo-input"
                                   value={toDoAddItems.description}/>
                            <button className="add-task-button">Add task</button>
                        </form>

                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Todo;