import React, {Component} from 'react';
import {Card} from "antd";
import "./style.css"

class QuoteCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            quote:this.props.quote,
            quoteHeader:this.props.quoteHeader
        }
    }

    render() {
        const {quote,quoteHeader}=this.state;
        return (
            <div>
                <Card className="quoteCard">
                    <div className="textWrapper">
                        <span className="quoteTitle">{quoteHeader}</span>
                        <span className="quoteText">
                            {quote}
                        </span>
                    </div>
                </Card>
            </div>
        );
    }
}

export default QuoteCard;