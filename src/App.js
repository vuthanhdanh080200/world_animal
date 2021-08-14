import { Route, Switch } from "react-router-dom";
import "./App.css";
import PostDetails from "./components/postDetails";
import Home from "./home/home";
import NavBarComp from "./components/navBar/navBarComp";
import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import AddPost from "./components/addPost";
import React, { Component } from "react";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react";
import NotFound from "./notFound/notFound";

export class App extends Component {
  isLogin = false;

  constructor() {
    super();
    makeObservable(this, {
      isLogin: observable,
      onSignOut: action,
      onUpdateLogin: action,
    });
  }
  componentDidMount() {
    this.onUpdateLogin();
  }

  onUpdateLogin() {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      this.isLogin = true;
    }
  }

  onSignOut() {
    this.isLogin = false;
    if (!this.isLogin) localStorage.removeItem("x-auth-token");
  }

  render() {
    return (
      <div className="App">
        <NavBarComp
          isLogin={this.isLogin}
          onUpdateLogin={this.onUpdateLogin.bind(this)}
          onSignOut={this.onSignOut.bind(this)}
        />
        <div>
          <Switch>
            <Route path="/post/:id" component={PostDetails} />
            <Route
              path="/signin"
              render={(props) => (
                <SignIn
                  {...props}
                  onUpdateLogin={this.onUpdateLogin.bind(this)}
                />
              )}
            />
            <Route
              path="/signup"
              render={(props) => (
                <SignUp
                  {...props}
                  onUpdateLogin={this.onUpdateLogin.bind(this)}
                />
              )}
            />
            <Route path="/addPost" component={AddPost} />
            <Route exact path="/" component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default observer(App);
