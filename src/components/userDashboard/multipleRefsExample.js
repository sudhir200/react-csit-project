import React, { useEffect, useRef } from 'react';
import {Row, Col, Button} from "antd";
import {addUser} from "../../apicall/users";

const MultipleInput = ({addedUser}) => {
    const inputRef = useRef({});
    useEffect(() => {
        inputRef.current['name'].focus()

    }, []);

  const handleAddUser=(e)=>
  {
    addUser(inputRef.current['name'].value,inputRef.current['job'].value).then(r=>addedUser(r))
  }
    return(
        <form onSubmit={(e) => handleAddUser(e)}>
            <Row gutter={[16, 16]}>
                <Col span={12} >
                    <input className="input-user" placeholder="name"  ref={el => inputRef.current['name'] = el} />

                </Col>
                <Col span={12} >
                    <input placeholder="job" className="input-user"  ref={el => inputRef.current['job'] = el} />
                </Col>

            </Row>
            <Button onClick={(e)=>handleAddUser(e)}>Add User</Button>

        </form>
    );
}

export default MultipleInput;