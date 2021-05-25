import React, {Component} from 'react';
import {getMovies, getSingleMovie} from "../../apicall/movies";
import {Card} from "antd";
import "./style.css"

class Movies extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moviesList: [],
            loading: false
        }
    }

    componentDidMount() {
        let self = this;
        this.setState({loading: true})
        this.getMoviesList().then(function () {
            self.setState({loading: false})
        })
        this.getMovieById()
    }

    async getMoviesList() {
        this.setState({loading: true})
        getMovies().then(res => {
            this.setState({loading: false, moviesList: res})
        })
    }

    getMovieById = () => {
        getSingleMovie(2).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        const {moviesList, loading} = this.state;
        return (
            <div className="gridWrapper">
                {moviesList.map(
                    (movie) =>
                        <div>
                            <Card>
                                <span style={{}}>{movie.title}</span>
                                <img className="movie-img" src={movie.cover_url}/>
                            </Card>
                        </div>
                )

                }

            </div>
        );
    }
}

export default Movies;