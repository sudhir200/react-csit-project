import React, {Component} from 'react';
import Routes from "./routes";
import 'antd/dist/antd.css';
import {Button} from "antd";
import FileOne from "./functionApproach/fileOne";
let country1="China";
const country="Nepal";

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            element:'water'
        }
    }

    componentDidMount() {
        this.loginUser();

    }
    loginUser=()=>
    {

        this.setState({isLogin:true})
    }
    winterFunc=()=>
    {
        this.setState({elem:'ice'})
    }
    summerFunc=()=>
    {
        this.setState({elem:'vapour'})
    }
    myFunc=(param1,param2,param3)=>
    {
        console.log(param1)
        this.setState({element:param1}) // string
        // this.setState({element:param2.water}) //obj
        // this.setState({element:param3[0]}) //array
        // console.log(country)
        let a="";//string

        let b={"name":"",rollNo:2}; //object

        let c=[{"name":"",rollNo:2},{"name":"",rollNo:2},{"name":"",rollNo:2}];//array

        let array=[1,2,2,3,3,4,2,2]

        a="sudhir";
        b.name="sudhir";
        c[0].name="sudhir";



    }
    myFunc1=()=>
    {
        this.setState({element:'vapour'})
    }

    render() {
        const {element,isLogin}=this.state;
        return (
            <div>
                <Routes isLogin={this.state.isLogin}/>
            </div>
        );
    }
}

export default App;