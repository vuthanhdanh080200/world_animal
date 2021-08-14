import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import UserServices from "../services/userServices";
import "./signIn.css";
import styles from "./styles";

import Input from "../components/form/input";

export class SignIn extends Component {
  state = {
    account: { username: "", password: "" },
  };

  userServices = new UserServices();

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submmited", this.state.account);
    const user = await this.userServices.signIn(this.state.account);
    this.props.history.push("/");
    this.props.onUpdateLogin();
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    let { account } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center form-container">
        <div
          className="form"
          style={{
            width: 500,
          }}
        >
          <h3 style={{ textAlign: "center" }}>Sign In to Animal World!</h3>
          <Form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              type="text"
              value={account.username}
              onChange={this.handleChange}
            />

            <Input
              name="password"
              type="password"
              value={account.password}
              onChange={this.handleChange}
            />

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignIn;
