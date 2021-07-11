import axios from "axios";

export function getCountries(retryTimes) {
    return new Promise(function (resolve, reject) {
        axios(
            {
                method: "get",
                url: "https://restcountries.eu/rest/v2/all"
            }
        ).then(r => {
            resolve(r)
        })
            .catch(err => {
                if(retryTimes===1)
                {
                    console.log('api failed')
                    reject(err)
                }
                else
                {
                    getCountries(retryTimes-1).then(res=>
                        {
                            resolve(res)
                        }
                    ).catch(err=>
                    {
                        reject(err)
                    })
                }


            })
    })
}

export function getCountryById(name) {
    return new Promise(function (resolve, reject) {
        axios({
            method: "get",
            url: `https://restcountries.eu/rest/v2/name/${name}`
        }).then(r => resolve(r.data))
            .catch(err => {

                reject(err)
            })
    })
}
