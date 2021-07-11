import React, {Component} from 'react';
import {getCountries} from "../../apicall/getQuotes";
import "./style.css"
import CountryCard from "../../commonComponents/commonCard/countryCard";
import {Link, Switch} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons"
import {Card, message} from "antd";
import QuoteCard from "../../commonComponents/quoteCard/quoteCard";
import {TestConsumer} from "../context/testContext";
import ReactPlayer from 'react-player/youtube'
import Header1 from "../../commonComponents/header/header";
import {eventAnalyst} from "../../utilFunctions/analytics";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            countries: localStorage.getItem('countries-list')?JSON.parse(localStorage.getItem('countries-list')):[],
            searchCountries: [],
            customArray: ["RAM","Shyam","hari","hariram","RAM2","RAM3","RAM4",],
            searchKey: '',
            loading:false
        }
    }

    componentDidMount() {
        console.log('componentDidMount...')
        document.title="Home";
        this.getAllCountries()
    }

    handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value});
        if (event.target.value === "") {
            this.setState({searchCountries: []})
        }
    }
    getAllCountries = () => {

        this.setState({loading:true})
        eventAnalyst('countries','fetch_countries','initiated',``)
        if(!this.state.countries.length>0)
        {
            getCountries().then(r => {
                localStorage.setItem('countries-list',JSON.stringify(r.data))
                this.setState({countries: r.data})
                eventAnalyst('countries','fetch_countries_success','completed',`fetch countries success`)

            }).catch(err => {
                console.log('error...')
                eventAnalyst('countries','fetch_countries_failed','completed',`fetch countries failed`)

                message.error('Error')
                console.log(err)
            });
        }


    }
    getCountryByName = () => {
        console.log(this.state.countries)
        let self = this;
        let searchCountry = [];

        this.state.countries.forEach(country => {
            let searchKey=this.state.searchKey.toUpperCase()
            console.log(searchKey)
            if (country.name === this.state.searchKey || country.alpha3Code===searchKey) {
                    searchCountry.push(country)
                }
            }
        )
        self.setState({searchCountries: searchCountry})
        // return this.state.countries.filter(country=>country.name===this.state.searchKey)
        // getCountryById(this.state.searchKey).then(res=>{
        //     console.log(res)
        //     this.setState({countries:res.data})
        //
        // })
    }

    linkToAbout = () => {
        window.location.href = "/about"
    }
    handleEnter=(event)=>
    {
        if(event.code==='Enter' && this.state.searchKey.length>=3)
        {
            this.getCountryByName();
        }
    }
    updateList=()=>
    {
        this.setState({searchKey:'',countries:this.state.countries})
        localStorage.setItem('countries-list',JSON.stringify(this.state.countries))
    }
    render() {
        const {countries, searchCountries} = this.state;
        return (

                        <div>
                            <div align="center" className="displayGrid">
                                <Link to={'/class'}>Class Example</Link>
                                <Link to={'/function'}>Function Example</Link>
                            </div>

                            {/*<ReactPlayer*/}
                            {/*    className='react-player'*/}
                            {/*    url='https://www.youtube.com/watch?v=ysz5S6PUM-U'*/}
                            {/*    width='100%'*/}
                            {/*    height='100%'*/}
                            {/*/>*/}


                            <div style={{margin: "20px 0"}} align="center">
                            <div align="center" style={{display: "inherit"}}>
                                {/*onMouseOver={()=>message.warn('search by country name')} onMouseOut={()=>message.warn('removed mouse')}*/}
                                {/*onKeyPress={(event)=>{this.handleEnter(event)}}*/}
                                <input    style={{width: 500, height: 50, borderRadius: 20}} name="searchKey"
                                          value={this.state.searchKey} onInput={event => this.handleChange(event)}
                                          className="searchInput" type="text"/>
                                {/*<Search  className="searchInput" style={{width:500,height:50,borderRadius:20}}  />*/}
                                <SearchOutlined onClick={() => this.getCountryByName()} className="searchIcon"
                                                style={{fontSize: 20, cursor: "pointer"}}/>
                            </div>
                        </div>
                        {/*<div align="center">*/}
                        {/*    /!*array-to-map--------.map(actualmethod)..(name-user defined var),=><div></div>)*!/*/}
                        {/*    {this.state.customArray.map((name,index)=><div>{index+1} {name}</div>)}*/}
                        {/*</div>*/}
                        {/*<div align="center">*/}
                        {/*    {["ram",1,2,3,4,"52"].map((number,index)=><button>{index}.{number}</button>)}*/}
                        {/*</div>*/}
                        <div className="countryWrapper" style={{gridTemplateColumns:"repeat(5,1fr)",margin: 100}}>
                            <h3>Favourite Countries</h3>

                            {countries.filter((country)=>country.isFavourite).map((country,index)=>
                                <CountryCard updateCountry={()=>this.updateList()} key={index} country={country}/>)
                            }

                        </div>
                        <h3 style={{margin: 100}}>Countries</h3>
                        <div className="countryWrapper" style={{gridTemplateColumns:"repeat(5,1fr)",margin: 100}}>


                            {/*<div style={{display:"grid"}}>*/}
                            {/*    <Card style={{textAlign:"center",display:"block",height:100,marginBottom:20,color:"darkblue",fontWeight:"bolder"}}>*/}
                            {/*        <span>Number of Countries: </span><br/>*/}
                            {/*        <span>{countries.length}</span>*/}
                            {/*    </Card>*/}
                            {/*</div>*/}

                            {countries.filter((country)=>this.state.searchKey && !country.isFavourite?country.name.toUpperCase().includes(this.state.searchKey.toUpperCase()):!country.isFavourite).map((country,index)=>
                                <CountryCard array={country.name.charAt(0)==='N'?this.state.customArray:[]}  updateCountry={()=>this.updateList()} key={index} country={country}/>)
                            }

                            {/*filter(country => this.state.searchKey?country.name.toUpperCase().includes(this.state.searchKey.toUpperCase()):country)*/}
                            {/*{countries.map((country, index) =>*/}
                            {/*        <Link to={`/country/${country.name}`}>*/}
                            {/*            {index}*/}
                            {/*            <CountryCard key={index} country={country}/>*/}
                            {/*        </Link>*/}
                            {/*    )*/}
                            {/*}*/}
                        </div>
                    </div>

        );
    }
}

export default Home;