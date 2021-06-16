import React, {Component} from 'react';
import Card from "@material-ui/core/Card";

class TestComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            userInfo:this.props.value,
            countries:this.props.countries||[]
        }

    }
    componentWillReceiveProps(nextProps) {
        this.setState({name:nextProps.value,countries:nextProps.countries})
    }

    render() {
        return (
            <div>
                {
                    this.state.countries.map(country =>
                        <Card onClick={()=>this.props.onClickCountry(country)}>
                            {country.name}
                        </Card>)
                }
            </div>
        );
    }
}

export default TestComponent;