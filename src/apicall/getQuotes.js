import axios from "axios";

export function getCountries() {
    console.log('api init')
    return new Promise(function (resolve, reject) {
        axios({
            method:"get",
            url:"https://restcountries.eu/rest/v2/all"
        }).then(r=> {
            console.log('api success')
            resolve(r)
        })
            .catch(err=> {
                console.log('api failed')

                reject(err)
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
