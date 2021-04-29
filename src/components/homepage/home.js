import React, {Component} from 'react';
import {getCountries} from "../../apicall/getQuotes";
import {Card} from "antd";
import "./style.css"
import CountryCard from "../../commonComponents/commonCard/countryCard";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            countries: []
        }
    }

    componentDidMount() {
        this.getAllCountries()
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

                    <input style={{width:500,height:50,borderRadius:20,border:"1px solid blue"}} type="text"/>
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