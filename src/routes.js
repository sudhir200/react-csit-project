import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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

class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Header1 isLogin={false}/>
                    {this.props.isLogin ?
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/movies" component={Movies}/>
                            <Route exact path="/users" component={Users}/>
                            <Route exact path="/user/add" component={UserAdd}/>
                            <Route exact path="/country/:name" component={GetCountryByName}/>
                            <Route exact path="/user/:userId/course/:courseId" component={Users}/>
                            <Route exact path="/user/:userId" component={IndUser}/>
                            <Route exact path="/test" component={FileOne}/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path="/home" component={Home}/>
                            <Route exact path="/about" component={About}/>
                        </Switch>
                    }
                </Router>

            </div>
        );
    }
}

export default Routes;