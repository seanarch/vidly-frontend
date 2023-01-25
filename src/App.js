import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./component/movies";
import NavBar from "./component/navBar";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import NotFound from "./component/common/notFound";
import MovieForm from "./component/movieForm";
import LoginForm from "./component/loginForm";
import "./App.css";
import RegisterForm from "./component/reigsterForm";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" exact component={MovieForm} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
