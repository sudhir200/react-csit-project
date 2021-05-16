import axios from "axios";

export function getCountries() {
    return new Promise(function (resolve, reject) {
        axios({
            method:"get",
            url:"https://restcountries.eu/rest/v2/all"
        }).then(r=>resolve(r))
            .catch(err=> {

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
