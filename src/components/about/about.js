import React, {Component} from 'react';
import QuoteCard from "../../commonComponents/quoteCard/quoteCard";

class About extends Component {
    render() {
        return (
            <div>
                <div style={{margin:100}}>
                    <QuoteCard quote="about page quote lorem ipsum" quoteHeader="quote in about page"/>
                </div>
            </div>
        );
    }
}

export default About;