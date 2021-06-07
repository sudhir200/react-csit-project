import React, {Component} from 'react';
import {database, randomIdGenerator} from "../../config";
import firebase from "firebase";
import {Card, Checkbox, Typography, Divider, Drawer, Dropdown, Menu, Modal, Popconfirm, Skeleton} from "antd";
import "./todo.css"
import {PlusCircleOutlined, DeleteOutlined, CheckOutlined, MenuOutlined} from "@ant-design/icons"
import MenuItem from "antd/es/menu/MenuItem";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoAddItems: {},
            toDoList: [],
            subTasks: [],
            addingNew: false,
            loading:false,
            changeColor: new Map(),
            canAddSubTask: true,
        }

    }


    componentDidMount() {
        this.getAllToDoList()
    }

    getAllToDoList = () => {
        let dbUsers = [];
        this.setState({loading:true})
        database.collection('to-dos').get().then((res) => {

            res.forEach(res => {
                console.log('---to-do data-----')
                console.log(res.data())
                dbUsers.push(res.data())
            })
            this.setState({loading:false,toDoList: dbUsers})

        })
    }
    handleDelete = (id) => {
        let database = firebase.firestore();
        database.collection("to-dos").doc(id).delete()
            .then((res) => {
                this.state.changeColor.set(id, false)
                this.setState({changeColor: this.state.changeColor})
                this.getAllToDoList();
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
    handleUpdateSubTask = (id, item) => {
        let database = firebase.firestore();
        database.collection("to-dos").doc(id).update(item)
            .then((res) => {
                this.getAllToDoList();
            })
            .catch((error) => {
                console.log(error);

                console.error(error);
            });
    }
    handleSubtasks = () => {

    }
    handleAddTask = (e) => {
        e.preventDefault();
        let randomId = randomIdGenerator();
        let database = firebase.firestore();
        database.collection("to-dos").doc(randomId).set({
            id: randomId,
            task: this.state.toDoAddItems.task,
            completed: false,
            createdDate: Date.now(),
            color: this.state.toDoAddItems.color||'aliceblue',
            subTasks: this.state.toDoAddItems.subTasks,

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
        const {toDoList,loading, canAddSubTask, subTasks, addingNew, toDoAddItems} = this.state;
        return (
            <div className="marginBottom100">
                <div style={{margin:"50px 100px"}}  className="space-between">
                    <Typography.Title level={4}>To-do lists</Typography.Title>
                    {loading?'':<div>
                        <PlusCircleOutlined onClick={(e) => {
                            this.setState({addingNew: !addingNew})
                        }} className="add-icon"/>
                    </div>}
                </div>
                <div className="todoListWrapper">
                    {loading? [0, 1, 2, 3, 4, 5].map(item => (
                        <Skeleton active={true}/>)) : ''}
                    {toDoList && !loading ? toDoList.map((item) =>
                        <Card
                            style={{background: item.color ? item.color : !item.color && item.completed ? 'green' : ''}}
                            className={`todo-card ${item.completed ? `completed-card` : ``}`}>
                            <div className="marginTop10 space-between">
                                <span className="main-header">{item.task}</span>
                                <Checkbox style={{color: "red"}}
                                          onChange={(event) => this.handleUpdateTask(item.id, event)}
                                          checked={item.completed}/>
                            </div>
                            <Divider/>
                            {item.subTasks && item.subTasks.map((data) => <div className="displayGrid">
                                <div className={`space-between `}>
                                    <span style={{
                                        color: data.checked ? 'black' : '',
                                        textDecoration: data.checked ? 'line-through' : ''
                                    }} className="subtask">{data.value || item.description}</span>
                                    <Checkbox onChange={(event) => {
                                        data.checked = event.target.checked;
                                        this.setState({toDoList: toDoList})
                                        this.handleUpdateSubTask(item.id, item)
                                    }} checked={data.checked}/>
                                </div>

                                <Divider/>
                            </div>)}
                            <div>
                                {item.remarks ? <span className="subtask">Remarks: {item.remarks}</span> : ''}

                            </div>

                            <div className="dropdown-wrap space-between">

                                {this.state.changeColor.get(item.id) ?
                                    <Modal
                                        onCancel={() => {
                                            this.state.changeColor.set(item.id, !this.state.changeColor.get(item.id))
                                            this.setState({changeColor: this.state.changeColor})
                                        }
                                        } onOk={() => {
                                        this.handleUpdateSubTask(item.id, item)
                                        this.state.changeColor.set(item.id, !this.state.changeColor.get(item.id))
                                        this.setState({changeColor: this.state.changeColor})
                                    }}
                                        visible={this.state.changeColor.get(item.id)} className="displayGrid">
                                        <h5>Change Color</h5>
                                        <input type="color" id="body" value={item.color} name="body" defaultValue="#f6b73c"
                                               onChange={(e) => {
                                                   item.color = e.target.value;
                                                   this.setState({toDoList: toDoList})
                                               }}/>
                                        <input onChange={(e) => {
                                            item.remarks = e.target.value
                                            this.setState({toDoList: toDoList})
                                        }} placeholder="please enter remarks" className="todo-input"
                                               value={item.remarks}/>
                                        <Popconfirm
                                            placement="left"
                                            title={`Are you sure to delete this task`}
                                            onConfirm={() => this.handleDelete(item.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined/>
                                        </Popconfirm>

                                    </Modal> : ''}

                                <MenuOutlined onClick={() => {
                                    this.state.changeColor.set(item.id, !this.state.changeColor.get(item.id))
                                    this.setState({changeColor: this.state.changeColor})
                                }} className="menu-icon"/>
                            </div>
                        </Card>
                    ) : ''}


                </div>


                <Drawer
                    title="Add new task"
                    placement={window.innerWidth<700?"bottom":"right"}
                    width={window.innerWidth>700?"700px":"100%"}
                    height={window.innerWidth>700?"100%":"95%"}
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
                            {toDoAddItems.subTasks && toDoAddItems.subTasks.map((item, index) =>
                                <div className="space-between displayFlex">
                                    <input key={item} onChange={(e) => {
                                        let subtask = {};
                                        subtask.value = e.target.value;
                                        subtask.checked = false;
                                        toDoAddItems.subTasks[index] = subtask
                                        this.setState({toDoAddItems: toDoAddItems})
                                    }} required placeholder={`please enter task ${index + 1}`} className="todo-input"
                                           value={toDoAddItems.subTasks[index].value}/>
                                    <div className="iconsWrapper">
                                        <DeleteOutlined onClick={() => {
                                            toDoAddItems.subTasks.splice(index, 1)
                                            this.setState({toDoAddItems: toDoAddItems})
                                        }}/>
                                        <CheckOutlined onClick={() => {
                                            console.log(toDoAddItems)
                                            this.setState({canAddSubTask: true})
                                        }}/>

                                    </div>
                                </div>
                            )}

                            {canAddSubTask ?
                                <div className="space-between marginBottom100">
                                    <span>Add sub tasks</span>
                                    <PlusCircleOutlined onClick={() => {
                                        console.log(toDoAddItems)
                                        let subTasks = []
                                        let tasks = {}
                                        if (toDoAddItems.subTasks && toDoAddItems.subTasks.length >= 1) {
                                            console.log('if-toDoAddItems')
                                            console.log(toDoAddItems)

                                            toDoAddItems.subTasks.push(tasks)
                                        } else {
                                            subTasks.push(tasks)
                                            toDoAddItems.subTasks = subTasks
                                        }

                                        this.setState({canAddSubTask: false, toDoAddItems: toDoAddItems})
                                    }}/>
                                </div> : ''}
                            <div>
                                <h5>Change Color</h5>
                                <input required type="color" id="body" name="body" defaultValue="#f6b73c" value={toDoAddItems.color}
                                       onChange={(e) => {
                                           toDoAddItems.color = e.target.value;
                                           this.setState({toDoAddItems: toDoAddItems})
                                       }}/>
                            </div>
                            <button className="add-task-button marginTop30">Add task</button>
                        </form>

                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Todo;