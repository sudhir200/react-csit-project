import axios from "axios";

export function getMovies() {
    return new Promise(function (resolve, reject) {
        axios({
            method: "get",
            url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
            headers: {
                'x-rapidapi-key': '3e66f35d1fmsh834e80b0ec2725dp1e3f23jsnddcd57bf8d0d',
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
            },
            params: {i: 'tt4154796', r: 'json'},
        }).then(r => {
            console.log('api success')
            resolve(r)
        })
            .catch(err => {
                console.log(err)
                console.log('api failed')

                reject(err)
            })
    })
}