import React, {useEffect, useRef} from 'react';
import {Col, Collapse, Divider, message} from "antd";
import "./style.css"
import {getCountries} from "../../apicall/getQuotes";
import TestComponent from "../Class/testComponent";
import TestComponentFunc from "../Class/testComponentFunc";

function FunctionExample() {
    const [state1, setRam] = React.useState('value1')
    const [state2, setState2] = React.useState('value2')
    const [state3, setState3] = React.useState(false)
    const [state4, setState4] = React.useState({})
    const [countries, setCountries] = React.useState([])
    const inputRef = useRef({});
    const inputStyle =
        {
            color: 'red',
            fontSize: 20,
            margin: "10px 0",
            width: "100%"

        }
    const buttonStyle =
        {
            color: 'red',
            fontSize: 20,
            margin: "10px 0",
            width: "100%"
        }
    useEffect(() => {
        inputRef.current['email'].focus()

        document.title = 'Function example'

    }, []);

    const handleClick = (e) => {
        setRam('value1 changed')
        setState3(!state3)

    }
    const handleClick1 = (e) => {
        setRam('value1 changed')
        setState3(!state3)
        getCountries().then(res=>
            {
                setCountries(res.data)
            }
        )

    }
    const handleClick2 = (e) => {
        setRam('value1 changed')
        setState3(!state3)

    }
    const handleInputChange = (e) => {
        let target = e.target;
        state4[target.name] = target.value
        console.log(state4)

        setState4(state4)
    }
    const inputElem = (name, id, value, type) => {
        return (
            <Col span={12}>
                <input
                    style={inputStyle}
                    onChange={(e) => handleInputChange(e, name)}
                    name={name}
                    id={id}
                    type={type}
                    placeholder={`Enter ${name.toUpperCase().replace(/_/g, ' ')}`}
                    value={value}
                    ref={el => inputRef.current[name] = el}
                />
            </Col>

        )
    }
    const buttonElem = (className, text) => {
        return (
            <Col span={12}>
                <button className={`commonButton ${className}`} onClick={(e) => {
                    if (className === 'button1') {
                        handleClick1(e)
                    } else {
                        handleClick2(e)
                    }
                }}>{text}</button>
                {/*<button className="class1 class2"  onClick={(e) => handleClick(e)}>{text}</button>*/} {/*normal html practice*/}
            </Col>

        )
    }

    return (
        <div align="center">
            Function Example<br/>
            {state1}<br/>
            {state3 ? 'true' : 'false'}<br/>
            {inputElem('name', '1', state4.name,'text')}
            {inputElem('roll_no', '2', state4.roll_no,'number')}
            {inputElem('phone', '3', state4.phone,'tel')}
            {inputElem('email', '4', state4.email,'email')}
            {inputElem('address', '5', state4.address,'text')}
            {buttonElem('button1', 'Click me')}
            {buttonElem('button2', 'Add user')}
            <Divider/>
            <Collapse defaultActiveKey={1}>
                <Collapse.Panel key={1} header='Class Component'>
                    <TestComponent
                        key={1}
                        onClickCountry={(value) => {
                            message.warn(`${value.name} clicked!`)
                        }}
                        value={state4}
                        countries={countries}
                    />
                </Collapse.Panel>
                <Collapse.Panel key={2} header='Function Component'>
                    <TestComponentFunc
                        onClickCountry={(value) => {
                            console.log(value)
                            message.warn(`${value.name} clicked!`)
                        }}
                        value={state4}
                        countries={countries}/>
                </Collapse.Panel>
            </Collapse>
        </div>
    );
}

export default FunctionExample;