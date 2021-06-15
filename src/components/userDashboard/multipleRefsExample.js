import React, {useEffect, useRef} from 'react';
import {Button, Checkbox, Col, message, Row, Upload} from "antd";
import firebase from "firebase";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons"
import {randomIdGenerator} from "../../config";

const MultipleInput = ({addedUser, mode, selectedUser,updatedUser}) => {
    const [imageUrl, setImageUrl] = React.useState('');
    const [finalUrl, setFinalUrl] = React.useState('');
    const [loadingImage, setLoading] = React.useState(false);
    const [userSelected, setSelectedUser] = React.useState(selectedUser);
    const inputRef = useRef({});
    useEffect(() => {
        inputRef.current['fName'].focus()
        if (mode === 'edit') {
            handleEdit();
        }

    }, []);


    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleEdit = () => {

    }
    const handleItems = (randomId) => {
        return {
            fName: inputRef.current['fName'].value,
            lName: inputRef.current['lName'].value,
            email: inputRef.current['email'].value,
            phone: inputRef.current['phoneNo'].value,
            createdDate: Date.now(),
            admin: inputRef.current['admin'].state.checked,
            description: inputRef.current['description'].value,
            job: inputRef.current['job'].value,
            id: mode==='edit'?userSelected.id:randomId,
            avatar: mode==='edit' && !finalUrl?userSelected.avatar:finalUrl,
        };
    }
    const handleChange = info => {
        setImageUrl(info.file.originFileObj);
        handleUpload()
    };
    const handleUpload = e => {
        let storage = firebase.storage()
        setLoading(true);
        console.log("uploading...");

        storage
            .ref("images/" + imageUrl.name)
            .put(imageUrl)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .then(url => {
                setFinalUrl(url);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                console.log(error);
            });
    };
    const handleEditUser=(e)=>
    {
            let database = firebase.firestore();
            database.collection("users").doc(userSelected.id).update(handleItems())
                .then((res) => {
                    updatedUser()
                })
                .catch((error) => {
                    console.log(error);

                    console.error(error);
                });
    }
    const handleAddUser = (e) => {
        let database = firebase.firestore();
        let randomId = randomIdGenerator();
        database.collection("users").doc().set(handleItems(randomId))
            .then((res) => {
                document.getElementById('add-user').reset();
                addedUser(res)
                console.log(res);
            })
            .catch((error) => {
                console.log(error);

                console.error(error);
            });
        // addUser(inputRef.current['name'].value,inputRef.current['job'].value).then(r=>addedUser(r))
    }
    const uploadButton = (
        <div>
            {loadingImage ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );
    const handleFormChange=(e)=>
    {
        console.log(e.target.name)
        console.log(e.target.value)
        userSelected[e.target.name]=e.target.value;
        console.log(userSelected)
        setSelectedUser(userSelected)
    }
    return (
        <form id={"add-user"} onSubmit={(e) => handleAddUser(e)}>
            <Row gutter={[16, 16]}>
                <Col align={"center"} span={24}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {mode === 'edit' && userSelected.avatar && !finalUrl || finalUrl ?
                            <img loading="lazy" src={mode === 'edit' ? userSelected.avatar : finalUrl} alt="avatar"
                                 style={{width: '100%'}}/> : uploadButton}
                    </Upload>
                </Col>
                <Col span={12}>
                    <input name="fName"  onChange={(e)=>handleFormChange(e)}  value={mode === 'edit' ? userSelected.fName : ''} className="input-user"
                           placeholder="first name" ref={el => inputRef.current['fName'] = el}/>

                </Col>
                <Col span={12}>
                    <input name="lName" onChange={(e)=>handleFormChange(e)}  value={mode === 'edit' ? userSelected.lName : ''} className="input-user"
                           placeholder="last name" ref={el => inputRef.current['lName'] = el}/>

                </Col>
                <Col span={12}>
                    <input name="email" onChange={(e)=>handleFormChange(e)} value={mode === 'edit' ? userSelected.email : ''} className="input-user" placeholder="email"
                           ref={el => inputRef.current['email'] = el}/>

                </Col>
                <Col span={12}>

                    <input name="phoneNo" onChange={(e)=>handleFormChange(e)} value={mode === 'edit' ? userSelected.phone : ''} className="input-user" placeholder="phone"
                           ref={el => inputRef.current['phoneNo'] = el}/>

                </Col>
                <Col span={12}>

                    <input name="job" onChange={(e)=>handleFormChange(e)} value={mode === 'edit' ? userSelected.job : ''} className="input-user" placeholder="job"
                           ref={el => inputRef.current['job'] = el}/>

                </Col>

                <Col span={12}>
                    <Checkbox  onChange={(e)=>inputRef.current['admin'].value=e} checked={mode === 'edit' ? userSelected.admin : ''} placeholder="admin"
                              className="input-user" ref={el => inputRef.current['admin'] = el}>Admin</Checkbox>
                </Col>
                <Col span={12}>
                    <textarea name="description" onChange={(e)=>handleFormChange(e)} value={mode === 'edit' ? userSelected.description : ''} placeholder="description"
                              className="input-user" ref={el => inputRef.current['description'] = el}/>
                </Col>


            </Row>
            {mode === 'add' ?
                <Button onClick={(e) => handleAddUser(e)}>Add User</Button> :
                <Button onClick={(e) => handleEditUser(e)}>Edit User</Button>
            }

        </form>
    );
}

export default MultipleInput;