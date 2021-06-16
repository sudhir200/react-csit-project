import React, {Component} from 'react';
import {Col, Collapse, Divider, message} from "antd";
import TestComponent from "./testComponent";
import TestComponentFunc from "./testComponentFunc";
import {getCountries} from "../../apicall/getQuotes";

const inputStyle =
    {
        color: 'red',
        fontSize: 20,
        margin: "10px 0",
        width: "100%"

    }

class ClassExample extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            state1: 'value1',
            state2: 'value2',
            state3: false,
            state4: {},
            countries: []
        }
    }

    componentDidMount() {
        console.log(!this.state.state3)
        document.title = 'Class';

    }

    handleInputChange = (e) => {
        let target = e.target;
        this.state.state4[target.name] = target.value
        this.setState({state4: this.state.state4})
    }
    inputElem = (name, id, value, required) => {
        return (
            <Col span={12}>
                <input
                    style={inputStyle}
                    onChange={(e) => this.handleInputChange(e, name)}
                    name={name}
                    id={id}
                    required={required}
                    placeholder={`Enter ${name.toUpperCase().replace(/_/g, ' ')}`}
                    value={value}
                />
            </Col>

        )
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({state1: 'value1 changed.', state3: !this.state.state3})
        getCountries().then(res => {
                console.log(res)
                this.setState({countries: res.data})

            }
        )
    }
    clickedCountry = (country) => {
        message.warn(`${country.name} clicked!`)
    }

    render() {
        const {state1, state2, state3, state4, countries} = this.state;
        return (
            <div align="center">
                Class Example<br/>
                {this.state.state1}<br/>
                {this.state.state2}<br/>
                {state1}<br/>
                {state2}<br/>
                {state3 ? 'true' : 'false'}<br/>
                <form onSubmit={(e)=>this.handleClick(e)}>
                    {this.inputElem('name', '1', state4.name,true)}
                    {this.inputElem('roll_no', '2', state4.roll_no,true)}
                    {this.inputElem('phone', '3', state4.phone,true)}
                    {this.inputElem('email', '4', state4.email,false)}
                    {this.inputElem('address', '5', state4.address,false)}
                    <button style={{background: !state3 ? 'red' : 'green'}} type="submit" >click</button>
                </form>

                <Divider/>
                <fieldset>
                    <Collapse defaultActiveKey={1}>
                        <Collapse.Panel key={1} header='Class Component'>
                            <TestComponent
                                key={1}
                                onClickCountry={(value) => this.clickedCountry(value)}
                                value={state4}
                                countries={this.state.countries}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel key={2} header='Function Component'>
                            <TestComponentFunc
                                onClickCountry={(value) => {
                                    console.log(value)
                                    message.warn(`${value.name} clicked!`)
                                }}
                                value={state4}
                                countries={this.state.countries}/>
                        </Collapse.Panel>
                    </Collapse>


                </fieldset>

            </div>
        );
    }
}

export default ClassExample;