import React, {Component} from 'react';
import {getMovies} from "../../apicall/movies";

class Movies extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            moviesList:[],
            loading:false
        }
    }
    componentDidMount() {
        let self=this;
        this.setState({loading:true})
        this.getMoviesList().then(function () {
            self.setState({loading: false})
        })
    }
    async getMoviesList (){
        getMovies().then(res=>{
            console.log(res)
        })
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Movies;