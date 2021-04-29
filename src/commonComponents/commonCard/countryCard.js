import React, {Component} from 'react';
import  {Tag,Card} from "antd";
import "./style.css"

class CountryCard extends Component {
    constructor(props) {
        super(props);
        this.state={
            country:this.props.country
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps)
        this.setState({country:nextProps.country})
    }

    render() {
        return (
            <div>
                <Card className="countryCard1">
                    <div style={{textAlign:"center"}}>

                        <img className="countryImg" src={this.state.country.flag} />
                    </div>
                    <div className="wrapperDiv displayGrid">
                        <div className="displayFlex">
                            <div className="displayGrid">
                                <span className="countryTitle">Afghanistan, AF</span>
                                <span>Kabul</span>
                            </div>
                            <div>
                                <div className="displayGrid">{this.state.country.latlng.map(item=><span>{item}</span>)}</div>

                            </div>
                        </div>

                        <span>Population: {this.state.country.population}</span>
                        <span>Area: {this.state.country.area}</span>
                    </div>
                    <div className="wrapperDiv" style={{display:"grid"}}>
                        <span className="countryTitle">Languages</span>
                        {this.state.country.languages.map((lang)=><Tag className="commonTag" color="blue">{lang.name}</Tag>)}

                    </div>
                </Card>

            </div>
        );
    }
}

export default CountryCard;