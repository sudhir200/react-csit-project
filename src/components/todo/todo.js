import React, {Component} from 'react';
import {database, randomIdGenerator} from "../../config";
import firebase from "firebase";
import {Card, Checkbox, Divider, Drawer} from "antd";
import "./todo.css"
import {PlusCircleOutlined,DeleteOutlined,CheckOutlined} from "@ant-design/icons"

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoAddItems: {},
            toDoList: [],
            subTasks: [],
            addingNew: false,
            canAddSubTask: true,
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
    handleSubtasks = () => {

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
            subTasks:this.state.toDoAddItems.subTasks,

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
        const {toDoList,canAddSubTask, subTasks, addingNew, toDoAddItems} = this.state;
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

                            {item.subTasks&&item.subTasks.map((data)=><div className="displayGrid">
                                <div className="space-between">
                                    <span>{data.value || item.description}</span>
                                    <Checkbox checked={item.checked}/>
                                </div>
                                <Divider/>
                            </div>)}

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
                            {toDoAddItems.subTasks && toDoAddItems.subTasks.map((item,index) =>
                                <div className="space-between displayFlex">
                                    <input key={item} onChange={(e) => {
                                        let subtask={};
                                        subtask.value=e.target.value;
                                        subtask.checked=false;
                                        toDoAddItems.subTasks[index]=subtask
                                        this.setState({toDoAddItems: toDoAddItems})
                                        console.log(toDoAddItems.subTasks)

                                    }} required placeholder={`please enter task ${index+1}`} className="todo-input"
                                           value={toDoAddItems.subTasks[index].value}/>
                                           <div className="iconsWrapper">
                                               <DeleteOutlined onClick={() => {
                                                   toDoAddItems.subTasks.splice(index,1)
                                                   this.setState({toDoAddItems:toDoAddItems})
                                               }}/>
                                               <CheckOutlined onClick={() => {
                                                   console.log(toDoAddItems)
                                                   this.setState({canAddSubTask:true})
                                               }}/>

                                           </div>
                                </div>
                         )}
                            {canAddSubTask?<div className="space-between">
                                <span>Add sub tasks</span>
                                <PlusCircleOutlined onClick={() => {
                                    console.log(toDoAddItems)
                                    let subTasks = []
                                    let tasks={}
                                    if(toDoAddItems.subTasks && toDoAddItems.subTasks.length>=1)
                                    {
                                        console.log('if-toDoAddItems')
                                        console.log(toDoAddItems)

                                        toDoAddItems.subTasks.push(tasks)
                                    }
                                    else
                                    {
                                        console.log('else')
                                        console.log(toDoAddItems)
                                        subTasks.push(tasks)
                                        toDoAddItems.subTasks=subTasks
                                    }

                                    this.setState({canAddSubTask:false,toDoAddItems: toDoAddItems})
                                }}/>
                            </div>:''}
                            <button className="add-task-button">Add task</button>
                        </form>

                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Todo;