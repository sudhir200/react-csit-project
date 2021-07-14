import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Home from "./components/homepage/home";
import About from "./components/about/about";
import Users from "./components/userDashboard/users";
import Header1 from "./commonComponents/header/header";
import UserAdd from "./components/user/userAdd";
import CountryCard from "./commonComponents/commonCard/countryCard";
import GetCountryByName from "./components/country/countryByName";
import FileOne from "./functionApproach/fileOne";
import Movies from "./components/movies/movies";
import IndUser from "./components/userDashboard/indUser";
import login from "./components/login/login";
import Todo from "./components/todo/todo";
import ClassExample from "./components/Class/classExample";
import FunctionExample from "./components/Function/functionExample";
import Corona from "./components/corona/corona";

class Routes extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isLogin:props.isLogin
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({isLogin:nextProps.isLogin})
    }

    render() {
        return (
            <div>
                <Router>
                    {this.props.isLogin ?
                        <Header1 isLogin={this.props.isLogin}/>:''}

                    {this.props.isLogin ?
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/class" component={ClassExample}/>
                            <Route exact path="/function" component={FunctionExample}/>
                            <Route exact path="/movies" component={Movies}/>
                            <Route exact path="/users" component={Users}/>
                            <Route exact path="/corona" component={Corona}/>
                            <Route exact path="/user/add" component={UserAdd}/>
                            <Route exact path="/country/:name" component={GetCountryByName}/>
                            <Route exact path="/user/:userId/course/:courseId" component={Users}/>
                            <Route exact path="/user/:userId" component={IndUser}/>
                            <Route exact path="/test" component={FileOne}/>
                            <Route exact path="/todo" component={Todo}/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path="/" component={login}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    }
                </Router>

            </div>
        );
    }
}

export default Routes;