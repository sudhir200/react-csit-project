import React, {Component} from 'react';
import {getSingleMovie, getYtsMovies} from "../../apicall/movies";
import {
    BackTop,
    Button,
    Empty,
    Input,
    message,
    Modal,
    Pagination,
    Rate,
    Skeleton,
    Tag,
    Tooltip,
    Typography
} from "antd";
import "./movies.scss"
import "./style.css"
import {CheckCircleOutlined, DownloadOutlined, EyeOutlined, UpCircleFilled} from "@ant-design/icons"
import YouTubePlayer from "react-player/youtube";

const genres = ['biography', 'action', 'fantasy', 'mystery', 'thriller', 'drama', 'sci-fi', 'animation', 'horror', 'comedy']

const {Title, Paragraph} = Typography;
const {Search} = Input;

class Movies extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moviesList: new Map(),
            loading: new Map(),
            dialogItem: [],
            openMovie: false,
        }
    }

    componentDidMount() {
        document.title="Movies";
        genres.forEach((genre) => {
            this.getMoviesList(genre, 1, '', 8);
        })

    }

    getMoviesList(genre, pageNo, query, limit) {
        this.state.loading.set(genre, !this.state.moviesList.get(genre))
        this.setState({loading: this.state.loading})
        getYtsMovies(limit, pageNo, genre, query).then(res => {
            this.state.moviesList.set(genre, res)
            this.state.loading.set(genre, false)
            this.setState({loading: this.state.loading, moviesList: this.state.moviesList})
        }).catch(err=>
        {
            message.warn(`could not fetch movies for ${genre}`)
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
        const {moviesList, dialogItem, openMovie, loading} = this.state;
        return (
            <div>
                <div className="titleWrapper">
                    {genres.map((genre) =>
                        <a href={`#${genre}`}>
                            <Tag icon={<CheckCircleOutlined/>}
                                 color={'#' + (Math.random() * 0xFFFFFF << 0).toString(16)}>{genre}</Tag>
                        </a>)}
                </div>


                {genres.map((genre) =>
                    <div id={genre}>

                        <div className="titleWrapper space-between">
                            <Title level={2}>{genre.toUpperCase()}</Title>
                            <Search allowClear style={{width: "25%"}} placeholder={`search movies in ${genre}`}
                                    onSearch={(searchTxt) => {
                                        this.getMoviesList(genre, 1, searchTxt, 20)
                                    }} enterButton/>
                            <Pagination onChange={(current, pageSize) => {
                                // document.getElementById(genre).scrollIntoView()
                                this.getMoviesList(genre, current, '', pageSize)
                            }} defaultCurrent={1} total={500}/>

                        </div>

                        <div className="grid-container">
                            {loading.get(genre) ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                                <Skeleton active={true}/>)) : ''}
                            {moviesList.get(genre) && moviesList.get(genre).movie_count && !loading.get(genre) ? moviesList.get(genre).movies.filter(movie => movie.large_cover_image).map(
                                (movie) =>
                                    <div>
                                        <div className="movie-card" >
                                            <img className="movie-img" src={movie.medium_cover_image}/>
                                            <div className="movie-infos movie-info-wrapper">
                                                <Title level={4} style={{color:"#ffffff"}}  ellipsis={{rows: 1, tooltip: true}} >{movie.title}</Title><br/>
                                                {'Rating: ' + movie.rating}
                                                <div className="movie-title">{movie.year}</div>
                                                <Paragraph ellipsis={{rows: 2, tooltip: true, symbol: 'more'}}
                                                           className="movie-description">{movie.summary}</Paragraph>
                                                <div className="scroll-container">
                                                    {movie.genres && movie.genres.map(item => <Tag
                                                        color="black">{item}</Tag>)}
                                                </div>
                                                {movie.language ? <div className="scroll-container">
                                                    <Tag color="blue"><b>{movie.language.toUpperCase()}</b></Tag>
                                                </div> : ''}

                                                <div style={{display: "grid", margin: "10px 0"}}>
                                                    <b>Torrent files</b>
                                                    <div className="scroll-container" style={{
                                                        gap: 10
                                                    }}>


                                                        {movie.torrents.map((item, index) =>
                                                            <Tooltip title={<div className="displayGrid">
                                                                <div>Seeds: {item.seeds}</div>
                                                                <div>Size: {item.size}</div>
                                                                <div>Quality: {item.quality}</div>
                                                                <div>Magnet link:<a href={`magnet:?xt=urn:btih:${item.hash}`}> <EyeOutlined /></a></div>
                                                            </div>}>
                                                                <a href={item.url}
                                                                   color="black"><Button
                                                                    type="primary" style={{marginRight: 10}}
                                                                    shape="round">Link {index + 1}<DownloadOutlined/></Button></a>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="detail-button" onClick={() => {
                                                    this.setState({dialogItem: movie, openMovie: true})
                                                }}>View details <EyeOutlined/></div>
                                            </div>
                                        </div>
                                    </div>
                                )

                                : ''}

                        </div>
                        {moviesList.get(genre) && moviesList.get(genre).movie_count === 0 ?
                            <div align="center">
                                <Empty description={<div>no movies found for your search in <b>{genre}</b></div>}/>
                            </div>
                            : ''}


                    </div>)
                }
                <BackTop>
                    <UpCircleFilled style={{fontSize: 25, color: "black"}}/>
                </BackTop>
                {openMovie ?
                    <Modal destroyOnClose={true} bodyStyle={{background: "#282c34"}}
                           style={{top: 10, background: "#282c34"}}
                           afterClose={() => this.setState({openMovie: false, dialogItem: []})} width="50%"
                           onCancel={() => {
                               this.setState({openMovie: false, dialogItem: []})
                           }} footer={null} title={<Title level={3}>{dialogItem.title}</Title>} visible={openMovie}>
                        {openMovie ?
                            <div className="movie-infos">
                                {dialogItem.yt_trailer_code ?
                                    <div>
                                        <Title className="movie-description" level={4}>Watch trailer</Title>
                                        <YouTubePlayer width={"100%"} height={500}
                                                       url={`https://youtube.com/watch?v=${dialogItem.yt_trailer_code}`}/>
                                    </div>
                                    : ''}
                                <Title className="movie-description marginTop30" level={4}>Summary</Title>
                                <span className=" movie-description">
                                {dialogItem.description_full}
                            </span>
                            </div> : ''}
                    </Modal> : ''}
            </div>
        );
    }
}

export default Movies;