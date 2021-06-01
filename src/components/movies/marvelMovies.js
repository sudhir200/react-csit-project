import React, {Component} from 'react';
import "./movies.scss"
import {getMovies, getSingleMovie} from "../../apicall/movies";
import {Typography, Skeleton, message} from "antd";
const { Title,Paragraph } = Typography;

class MarvelMovies extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moviesList: [],
            loading: false,
            expand: new Map(),
        }
    }

    componentDidMount() {
        this.getMoviesList();
    }

    getMoviesList() {
        this.setState({loading: true})
        getMovies().then(res => {
            res.forEach(movie=>{
                this.state.expand.set(movie.id,true)
            })
            this.setState({loading: false,expand:this.state.expand, moviesList: res})
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
            <div>
                <div className="titleWrapper">
                    <Title level={2}>Marvel movies</Title>

                </div>

                <div className="grid-container overlay">
                    {loading?
                        [0,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,45].map(item=>(<Skeleton active={true}/>)):''
                    }
                    {moviesList.filter(item=>item.cover_url).map(
                        (movie) =>
                            <div>
                                <div id={movie.id} className="movie-card" >
                                    <img loading="lazy" alt={movie.title} className="movie-img" src={movie.cover_url}/>
                                    <div className="movie-infos">
                                        <span className="movie-title">{movie.title}</span>
                                        <Paragraph  ellipsis={{rows: 4, expandable: true, symbol: 'more'}} className="movie-description">{movie.overview}</Paragraph>
                                    </div>
                                </div>
                            </div>
                    )

                    }
                </div>
            </div>
        );
    }
}

export default MarvelMovies;