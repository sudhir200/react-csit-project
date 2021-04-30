import React, {Component} from 'react';
import {getCountries} from "../../apicall/getQuotes";
import {Card} from "antd";
import "./style.css"
import CountryCard from "../../commonComponents/commonCard/countryCard";
import {Link} from "react-router-dom";
import Search from "antd/es/input/Search";
import {SearchOutlined} from "@ant-design/icons"

class Home extends Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            searchKey:''
        }
    }

    componentDidMount() {
        this.getAllCountries()
    }
    handleChange=(event)=>
    {
        this.setState({[event.target.name]:event.target.value});
    }
    getAllCountries = () => {
        getCountries().then(r => {
            console.log(r)
            this.setState({countries: r.data})
        }).catch(err => {

            console.log(err)
        });
    }

    linkToAbout = () => {
        window.location.href = "/about"
    }

    render() {
        const {countries} = this.state;
        return (
            <div>
                <div style={{margin:"20px 0"}} align="center">
                    <div align="center" style={{display:"inherit"}}>

                        <input  style={{width:500,height:50,borderRadius:20}} name="searchKey" value={this.state.searchKey} onChange={event => this.handleChange(event)} className="searchInput" type="text"/>
                        {/*<Search  className="searchInput" style={{width:500,height:50,borderRadius:20}}  />*/}
                        <SearchOutlined className="searchIcon" style={{fontSize:20,cursor:"pointer"}} />
                    </div>
                </div>
                <div className="countryWrapper" style={{margin: 100}}>
                    {/*<QuoteCard quote="hello this is a quote" quoteHeader="quote in home page"/>*/}
                    {
                        countries.map((country,index) =>
                            <Link to={`/country/${country.name}`}>
                                <CountryCard key={index} country={country}/>
                            </Link>

                            )
                    }
                </div>
            </div>
        );
    }
}

export default Home;