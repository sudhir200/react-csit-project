import axios from "axios";

export function getMovies() {
    return new Promise(function (resolve, reject) {
        axios({
            method: "get",
            url: "https://mcuapi.herokuapp.com/api/v1/movies",
            // headers: {
            //     'x-rapidapi-key': '3e66f35d1fmsh834e80b0ec2725dp1e3f23jsnddcd57bf8d0d',
            //     'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
            // },
            // params: {i: 'tt4154796', r: 'json'},
        }).then(r => {
            console.log('api success')
            resolve(r.data.data)
        })
            .catch(err => {
                console.log(err)
                console.log('api failed')

                reject(err)
            })
    })
}
export function getYtsMovies(limit,page) {
    return new Promise(function (resolve, reject) {
        axios({
            method: "get",
            url: `https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}&genre=animation`,
            // headers: {
            //     'x-rapidapi-key': '3e66f35d1fmsh834e80b0ec2725dp1e3f23jsnddcd57bf8d0d',
            //     'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
            // },
            // params: {i: 'tt4154796', r: 'json'},
        }).then(r => {
            console.log('api success')
            resolve(r.data.data)
        })
            .catch(err => {
                console.log(err)
                console.log('api failed')

                reject(err)
            })
    })
}

export function getSingleMovie(movie_id) {
    return new Promise(function (resolve, reject) {
        axios({
            method: "get", //http type,
            url: `https://mcuapi.herokuapp.com/api/v1/movies/${movie_id}`

        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}