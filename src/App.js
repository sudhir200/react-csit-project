import React, {Component} from 'react';
import Routes from "./routes";

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isLogin:true
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Routes isLogin={this.state.isLogin}/>
            </div>
        );
    }
}

export default App;