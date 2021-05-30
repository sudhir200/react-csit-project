import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";

function Header1({name,rollNo,onUserClick}) {
    const [userName,setName]=React.useState(name)
    const [userRoll,setRoll]=React.useState(rollNo)
    const history=useHistory();

    console.log(history)


    useEffect(() => {

        // // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
    });


    const changeName=()=>
    {
        setName('Ram')
        onUserClick('Child component clicked')
    }
    return (
        <div style={{display:"grid"}}>
            <span>{name},{rollNo}</span>
            <button onClick={changeName}>change names</button>
        </div>
    );
}

export default Header1;