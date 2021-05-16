import React, {Component} from 'react';
import {getCountries} from "../../apicall/getQuotes";
import "./style.css"
import CountryCard from "../../commonComponents/commonCard/countryCard";
import {Link} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons"
import {message} from "antd";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            searchCountries: [],
            searchKey: '',
        }
    }

    componentDidMount() {
        this.getAllCountries()
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if (event.target.value === "") {
            this.setState({searchCountries: []})
        }
    }
    getAllCountries = () => {
        getCountries().then(r => {
            console.log(r)
            this.setState({countries: r.data})
        }).catch(err => {
            message.error('Error')
            console.log(err)
        });
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

    render() {
        const {countries, searchCountries} = this.state;
        return (
            <div>
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

                <div className="countryWrapper" style={{margin: 100}}>
                    {/*filter(country => this.state.searchKey?country.name.toUpperCase().includes(this.state.searchKey.toUpperCase()):country)*/}
                    {countries.map((country, index) =>
                            <Link to={`/country/${country.name}`}>
                                <CountryCard key={index} country={country}/>
                            </Link>
                        )
                    }
                    {/*<QuoteCard quote="hello this is a quote" quoteHeader="quote in home page"/>*/}
                </div>
            </div>
        );
    }
}

export default Home;