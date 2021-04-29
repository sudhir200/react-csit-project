import axios from "axios";
import {message} from "antd";

export function addUser(name,job)
{
    let data={
        "name":name,
        "job":job
    }
    return new Promise(function (resolve, reject){
        axios({
            method:"post",
            url:"https://reqres.in/api/users",
            data:data
        }).then(r=>resolve(r))
            .catch(err=> {

                reject(err)
            })
    })
}
export function editUser(name,job)
{
    let data={
        "name":name,
        "job":job
    }
    return new Promise(function (resolve, reject){
        axios({
            method:"put",
            url:"https://reqres.in/api/users",
            data:data
        }).then(r=>resolve(r))
            .catch(err=> {

                reject(err)
            })
    })
}
export function getUsers()
{
    return new Promise(function (resolve, reject){
        axios({
            method:"get",
            url:`https://reqres.in/api/users?page=${1}`,
        }).then(r=>resolve(r))
            .catch(err=> {

                reject(err)
            })
    })
}
export function deleteUser()
{
    return new Promise(function (resolve, reject){
        axios({
            method:"delete",
            url:`https://reqres.in/api/${762}`,
        }).then(r=>resolve(r))
            .catch(err=> {

                reject(err)
            })
    })
}
