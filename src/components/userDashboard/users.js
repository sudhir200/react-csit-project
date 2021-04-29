import React from 'react';
import {useHistory,useParams} from "react-router-dom"

function Users() {
    const history=useHistory();
    const {userId,courseId}=useParams();
    console.log(userId)
    console.log(courseId)


    return (
        <div>
            <button onClick={()=>history.push('/')}>Home</button>
        </div>
    );
}

export default Users;