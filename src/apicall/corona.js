import axios from "axios";
export function getCoronaData()
{
  return new Promise(function (resolve, reject){
        axios.get('https://corona.askbhunte.com/api/v1/data/nepal').then((res)=>
        {
            resolve(res)
        }).catch(err=>
        {
            reject(err)
        })
    })
}export function getCoronaDataByMunicipality()
{
  return new Promise(function (resolve, reject){
        axios.get('https://data.askbhunte.com/api/v1/covid').then((res)=>
        {
            resolve(res)
        }).catch(err=>
        {
            reject(err)
        })
    })
}