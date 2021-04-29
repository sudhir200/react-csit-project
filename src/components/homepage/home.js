import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Header1 from "../../commonComponents/header/header"
import QuoteCard from "../../commonComponents/quoteCard/quoteCard";
import {getCountries} from "../../apicall/getQuotes";
import {Card, message} from "antd";
import "./style.css"

class Home extends Component {
    constructor() {
        super();
        this.state={
            countries:[]
        }
    }
    componentDidMount() {
        this.getAllCountries()
    }
    getAllCountries=()=>
    {
        getCountries().then(r => {
            console.log(r)
            this.setState({countries:r.data})
        }).catch(err=>
        {
            console.log(alert('err'))
        });
    }

    linkToAbout=()=>
    {
        window.location.href="/about"
    }
    render() {
        const {countries}=this.state;
        return (
            <div >
                <div className="countryWrapper" style={{margin:100}}>
                    {/*<QuoteCard quote="hello this is a quote" quoteHeader="quote in home page"/>*/}
                    {
                        countries.map((country)=><Card className="countryCard">
                            <span>
                                 <b>
                                {country.name}
                            </b>
                            </span>
                            <div>
                                <img height={400} width={300} src={country.flag} alt={country.name}/>

                            </div>

                        </Card>)
                    }
                </div>
            </div>
        );
    }
}

export default Home;