import React, {Component} from 'react';
import {database, randomIdGenerator} from "../../config";
import firebase from "firebase";
import {Card, Checkbox, Divider, Drawer} from "antd";
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
            this.setState({toDoList: dbUsers})

        })
    }
    handleDelete = (id) => {
        let database = firebase.firestore();
        database.collection("to-dos").doc(id).delete()
            .then((res) => {
                this.getAllUsers();
            })
            .catch((error) => {

            });
    }

    handleUpdateTask = (id, event) => {
        let database = firebase.firestore();
        database.collection("to-dos").doc(id).update({
            completed: event.target.checked,

        })
            .then((res) => {
                this.getAllToDoList();
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
            task1: this.state.toDoAddItems.task1,
            task2: this.state.toDoAddItems.task2,
            task3: this.state.toDoAddItems.task3,

        })
            .then((res) => {
                this.getAllToDoList();
                document.getElementById('add-task').reset();
                this.setState({addingNew: false})
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
                        <Card className={`todo-card ${item.completed ? `completed-card` : ``}`}>
                            <div className="space-between">
                                <span className="main-header">{item.task}</span>
                                <Checkbox onChange={(event) => this.handleUpdateTask(item.id, event)}
                                          checked={item.completed}/>
                            </div>
                            <Divider/>

                            <div className="displayGrid">
                                <span>{item.task1||item.description}</span>
                                <span>{item.task2||''}</span>
                                <span>{item.task3||''}</span>
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
                        <form id="add-task" onSubmit={(e) => this.handleAddTask(e)}>
                            <input onChange={(e) => {
                                toDoAddItems.task = e.target.value
                                this.setState({toDoAddItems: toDoAddItems})
                            }} required placeholder="please enter title" className="todo-input"
                                   value={toDoAddItems.task}/>
                            <input onChange={(e) => {
                                toDoAddItems.task1 = e.target.value
                                this.setState({toDoAddItems: toDoAddItems})
                            }} required placeholder="please enter task 1" className="todo-input"
                                   value={toDoAddItems.task1}/>
                            <input onChange={(e) => {
                                toDoAddItems.task2 = e.target.value
                                this.setState({toDoAddItems: toDoAddItems})
                            }}  placeholder="please enter task 2" className="todo-input"
                                   value={toDoAddItems.task2}/>
                            <input onChange={(e) => {
                                toDoAddItems.task3 = e.target.value
                                this.setState({toDoAddItems: toDoAddItems})
                            }}  placeholder="please enter task 3" className="todo-input"
                                   value={toDoAddItems.task3}/>
                            <button className="add-task-button">Add task</button>
                        </form>

                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Todo;