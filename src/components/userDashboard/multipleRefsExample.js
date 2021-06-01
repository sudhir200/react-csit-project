import React, { useEffect, useRef } from 'react';
import {Row, Col, Button} from "antd";
import {addUser} from "../../apicall/users";
import firebase from "firebase";

const MultipleInput = ({addedUser}) => {
    const inputRef = useRef({});
    useEffect(() => {
        inputRef.current['name'].focus()

    }, []);

  const randomIdGenerator=()=>
  {
      return Date.now()+inputRef.current['name'].value;
  }

  const handleAddUser=(e)=>
  {
      let database=firebase.firestore();
      database.collection("users").doc(randomIdGenerator()).set({
          name: inputRef.current['name'].value,
          createdDate: Date.now(),
          description:inputRef.current['description'].value,
          job: inputRef.current['job'].value,
          id: randomIdGenerator(),
          avatar: "https://reqres.in/img/faces/2-image.jpg" /*inputRef.current['avatar'].value*/,
      })
          .then((res) => {
              document.getElementById('add-user').reset();
              addedUser(res)
              console.log(res);
          })
          .catch((error) => {
              console.log(error);

              console.error( error);
          });
    // addUser(inputRef.current['name'].value,inputRef.current['job'].value).then(r=>addedUser(r))
  }
    return(
        <form id={"add-user"} onSubmit={(e) => handleAddUser(e)}>
            <Row gutter={[16, 16]}>
                <Col span={12} >
                    <input className="input-user" placeholder="name"  ref={el => inputRef.current['name'] = el} />

                </Col>
                <Col span={12} >
                    <input placeholder="job" className="input-user"  ref={el => inputRef.current['job'] = el} />
                </Col>
                <Col span={12} >
                    <textarea placeholder="job" className="input-user"  ref={el => inputRef.current['description'] = el} />
                </Col>
                <Col span={12} >
                    <input type="file" placeholder="avatar"  ref={el => inputRef.current['avatar_img'] = el} />
                </Col>

            </Row>
            <Button onClick={(e)=>handleAddUser(e)}>Add User</Button>

        </form>
    );
}

export default MultipleInput;