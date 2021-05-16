import React, {Component} from 'react';
import {LoadingOutlined} from "@ant-design/icons"
import Title from "antd/es/skeleton/Title";

class FileOne extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: new Map(),
            array:[{name: "ram"}, {name: "ram1"}, {name: "ram2"}, {name: "ram3"}, {name: "ram4"}],
            index:2
        }
    }
    componentDidMount() {
        this.fetchLocation();
    }

    filterArray=()=>
    {
    return  this.state.array.filter(function (name){
         if(name.name==="ram3")
         {
             console.log(name)
         }
     });

    }
    fetchLocation=()=>
    {
        console.log((window.location.hash))
        console.log(document.getElementById(window.location.hash));
        document.getElementById(window.location.hash.replace(/#/g,'')).scrollIntoView();
    }
    render() {
        const {user} = this.state;
        return (
            <div>
                <div align="center" id="myDiv" style={{paddingBottom:"100vh",marginTop:"100vh"}}>
                   <h1>
                       this is test
                   </h1>
                </div>

            </div>
        );
    }
}

export default FileOne;