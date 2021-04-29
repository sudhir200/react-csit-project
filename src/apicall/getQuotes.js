import axios from "axios";
import {message} from "antd";

export function getCountries()
{
    return new Promise(function (resolve, reject){
        axios({
            method:"get",
            url:"https://restcountries.eu/rest/v2/all"
        }).then(r=>resolve(r))
            .catch(err=> {

                reject(err)
            })
    })
}
export function getCountryById()
{
    return new Promise(function (resolve, reject){
        axios({
            method:"get",
            url:"https://restcountries.eu/rest/v2/all"
        }).then(r=>resolve(r))
            .catch(err=> {

                reject(err)
            })
    })
}