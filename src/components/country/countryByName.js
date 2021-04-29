import React, {Component} from 'react';
import {getCountryById} from "../../apicall/getQuotes";
import CountryCard from "../../commonComponents/commonCard/countryCard";

class CountryByName extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            countryData:[]
        }
    }
    componentDidMount() {
        this.getCountry()
    }
    getCountry=()=>
    {
        getCountryById(this.props.match.params.name).then(res => {
            console.log(res[0])
            this.setState({countryData: res[0]})
        })
    }


    render() {
        return (
            <div align="center" style={{margin:"30px 0"}}>
                <img className="countryImg" src={this.state.countryData.flag}/>
                <h2>{this.state.countryData.name}</h2>
            </div>
        );
    }
}

export default CountryByName;