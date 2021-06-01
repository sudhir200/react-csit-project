import React, {Component} from 'react';
import {getMovies, getSingleMovie, getYtsMovies} from "../../apicall/movies";
import {Skeleton, Card, Typography, Tag, Button} from "antd";
import "./movies.scss"
import "./style.css"
import MarvelMovies from "./marvelMovies";

const { Title,Paragraph } = Typography;
class Movies extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moviesList: [],
            loading: false
        }
    }

    componentDidMount() {
        this.getMoviesList();
    }

    getMoviesList() {
        this.setState({loading: true})
        getYtsMovies(50,1).then(res => {
            console.log(res)
            this.setState({loading: false, moviesList: res.movies})
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

                <MarvelMovies/>
                <div className="titleWrapper">                    <Title level={2}>Other movies</Title>
                </div>
                <div className="grid-container">
                    {moviesList?moviesList.filter(movie=>movie.large_cover_image).map(
                        (movie) =>
                            <div>
                                <div className="movie-card">
                                    <img className="movie-img" src={movie.medium_cover_image}/>
                                    <div className="movie-infos">
                                        <span className="movie-title">{movie.title}</span>
                                        <Paragraph  ellipsis={{rows: 4, expandable: true, symbol: 'more'}} className="movie-description">{movie.summary}</Paragraph>
                                        {movie.genres.map(item=><Tag color="black">{item}</Tag> )}
                                        <div style={{display:"grid",margin:"10px 0"}}>
                                            <b >Torrent files</b>
                                            <div className="space-bwtn">

                                                {movie.torrents.map((item,index)=><a href={item.url} color="black"><Button type="primary" style={{marginRight:10}}>Link {index+1}</Button></a> )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )

                    :''}

                </div>

            </div>
        );
    }
}

export default Movies;