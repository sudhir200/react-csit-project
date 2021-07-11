import React, {Component} from 'react';
import {Card, message, Tag} from "antd";
import "./style.css"
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

class CountryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.country
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({country: nextProps.country})
    }
    makeCountryFav=()=>
    {
        let country=this.state.country;
        country.isFavourite=country.isFavourite?false:true;
        this.setState({country:country})
        this.props.updateCountry();
    }

    render() {
        return (
            <div>
                {this.props.array? this.props.array.map((data)=><button onClick={()=>{
                    if(data==="RAM")
                    {
                        message.warn('Ram')
                    }
                }}>{data}</button>):''}
                {this.state.country ?
                    <Card className="countryCard1">
                        Indvid card
                        {this.state.country.isFavourite?
                            <HeartFilled onClick={()=>this.makeCountryFav()} className='favIcon'/> :
                            <HeartOutlined onClick={()=>this.makeCountryFav()} className='favIcon'/>}
                        <div style={{textAlign: "center"}}>

                            <img className="countryImg" src={this.state.country.flag}/>
                        </div>
                        <div className="wrapperDiv displayGrid">
                            <div className="displayFlex">
                                <div className="displayGrid">
                                    <span className="countryTitle">{this.state.country.name}</span>
                                    <span>{this.state.country.capital}</span>
                                </div>
                                <div>
                                    <div className="displayGrid">
                                        {this.state.country.latlng.map(item =>
                                            <span>{item}</span>)}
                                    </div>

                                </div>
                            </div>

                            <span>Population: {this.state.country.population}</span>
                            <span>Area: {this.state.country.area}</span>
                        </div>
                        <div className="wrapperDiv" style={{display: "grid"}}>
                            <span className="countryTitle">Languages</span>
                            {this.state.country.languages.map((lang) =>
                                <Tag className="commonTag" color="blue">{lang.name}</Tag>
                            )}

                        </div>
                    </Card> : ''}

            </div>
        );
    }
}

export default CountryCard;