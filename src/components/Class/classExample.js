import React, {Component} from 'react';
import {Col, message} from "antd";
const inputStyle =
    {
        color: 'red',
        fontSize: 20,
        margin: "10px 0",
        width:"100%"

    }
class ClassExample extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            state1:'value1',
            state2:'value2',
            state3:false,
            state4: {},
        }
    }
    componentDidMount() {
        console.log(!this.state.state3)
        document.title='Class';
    }
    handleInputChange = (e) => {
        let target=e.target;
        this.state.state4[target.name]=target.value
        this.setState({state4:this.state.state4})
    }
    inputElem = (name, id, value,placeholder) => {
        return (
            <Col span={12}>
                <input
                    style={inputStyle}
                    onChange={(e) => this.handleInputChange(e, name)}
                    name={name}
                    id={id}
                    placeholder={`Enter ${name.toUpperCase().replace(/_/g,' ')}`}
                    value={value}
                />
            </Col>

        )
    }

    handleClick=(e)=>
    {
        console.log(e)
        this.setState({state1:'value1 changed.',state3:!this.state.state3})

    }

    render() {
        const {state1,state2,state3,state4}=this.state;
        return (
            <div align="center">
                Class Example<br/>
                {this.state.state1}<br/>
                {this.state.state2}<br/>
                {state1}<br/>
                {state2}<br/>
                {state3?'true':'false'}<br/>
                {this.inputElem('name', '1', state4.name)}
                {this.inputElem('roll_no', '2', state4.roll_no)}
                {this.inputElem('phone', '3', state4.phone)}
                {this.inputElem('email', '4', state4.email)}
                {this.inputElem('address', '5', state4.address)}this.
                <button style={{background:!state3?'red':'green'}}  onClick={(e)=>this.handleClick(e)}>click</button>

            </div>
        );
    }
}

export default ClassExample;