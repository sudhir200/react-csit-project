import React, {Component} from 'react';
import {getCountries} from "../../apicall/getQuotes";
import {Card} from "antd";
import "./style.css"
import CountryCard from "../../commonComponents/commonCard/countryCard";

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
                <div className="countryWrapper" style={{margin: 100}}>
                    {/*<QuoteCard quote="hello this is a quote" quoteHeader="quote in home page"/>*/}
                    {
                        countries.map((country,index) =>
                            <CountryCard key={index} country={country}/>)
                    }
                </div>
            </div>
        );
    }
}

export default Home;