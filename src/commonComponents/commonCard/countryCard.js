import React, {Component} from 'react';
import {Card, Tag} from "antd";
import "./style.css"

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

    render() {
        return (
            <div>
                {this.state.country ? <Card className="countryCard1">
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
                                <div className="displayGrid">{this.state.country.latlng.map(item =>
                                    <span>{item}</span>)}</div>

                            </div>
                        </div>

                        <span>Population: {this.state.country.population}</span>
                        <span>Area: {this.state.country.area}</span>
                    </div>
                    <div className="wrapperDiv" style={{display: "grid"}}>
                        <span className="countryTitle">Languages</span>
                        {this.state.country.languages.map((lang) => <Tag className="commonTag"
                                                                         color="blue">{lang.name}</Tag>)}

                    </div>
                </Card> : ''}

            </div>
        );
    }
}

export default CountryCard;