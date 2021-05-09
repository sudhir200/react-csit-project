import React from 'react';
import {Button} from "antd";

function FileOne() {
    // const [element,setElem]=React.useState('water');
    const [userInfo, setUserInfo] = React.useState({user_name: '', pass: ''});
    const [user_name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [array1, setArray] = React.useState([{user_name: 'sudhir', rollNo: '1234'}, {
        user_name: 'ram',
        rollNo: 'ram123'
    }, {user_name: 'hari', rollNo: 'hari123'}, {user_name: 'shyam', rollNo: '123'}]);
    const [label, setLabel] = React.useState('Enter');
    let [counter, setCounter] = React.useState(5);


    const myFunc = () => {
        // array1.push({user_name: 'Harry',rollNo: 22})
        // console.log(array1)
        // setArray(array1)
        // let array = ["sudhir", "ram", "shyam"];
        let array1 = ["sudhir1", "ram1", "shyam1"];
        array1.forEach(item=>
        {
            if(item==='ram1')
            {

                console.log(item)
            }
        })
        // console.log(array.concat(array1.reverse()))
        //
        if (user_name)  //comparision
        {
            if(user_name!=='Sudhir')
            {

                alert('you are not sudhir')
            }
            else if(user_name==='Sudhir')
            {

                alert('you are not sudhir')
            }
            else
            {

            }
        }

        else if(!user_name) //logical
        {

            console.log('choose user')
            document.getElementById('userId').focus();
            document.getElementById('userId').style.borderColor="red";
            document.getElementById('userId').style.outline="none";
            setLabel('Enter user name')

        }


        // console.log(counter)
        // let clickCount=counter--;
        // setCounter(clickCount)
        //
        // console.log(user_name);
        // console.log(password);

    }

    function myFunc1() {
        console.log(userInfo);


    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onPassChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <br/>
            <input id="userId" onInput={(e) => onNameChange(e)} value={user_name}/><br/><br/>
            <input onInput={(e) => onPassChange(e)} value={password}/><br/><br/>

            <Button onClick={() => {
                myFunc()

            }} type="primary">Click</Button>
            {array1.filter(item=>item.user_name!=='sudhir').reverse().sort(item=>item.user_name).map((value, index) =>
                <div>
                    {index + 1}. {value.user_name}:
                    <span>{value.rollNo}</span>
                </div>)}
            {/*<Routes isLogin={isLogin}/>*/}
        </div>
    );
}

export default FileOne;