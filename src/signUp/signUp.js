import React, { Component } from "react";
import { Form, Button, Image } from "react-bootstrap";
import UploadButton from "../components/uploadButton";
import avatar from "../asset/avatar.png";
import Input from "../components/form/input";
import UserServices from "../services/userServices";
import styles from "./styles";

export class SignUp extends Component {
  state = {
    user: {
      email: "",
      username: "",
      password: "",
      avatar: avatar,
    },
    isFormValid: false,
  };

  userServices = new UserServices();

  componentDidMount() {}

  handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    const state = { ...this.state };
    state.isFormValid = true;
    this.setState(state);

    await this.userServices.signUp(this.state.user);
    this.props.history.push("/");
    this.props.onUpdateLogin();
  };

  handleChange = (e) => {
    const state = { ...this.state };
    state.user[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };

  handleImageUpload = (avatar) => {
    const user = { ...this.state.user };
    user["avatar"] = avatar;
    this.setState({ user });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="d-flex justify-content-center">
        <div className="form" style={styles.form}>
          <h3 style={styles.text}>Sign Up to Animal World!</h3>
          <Form validated={this.state.isFormValid} onSubmit={this.handleSubmit}>
            <Input
              name="email"
              type="email"
              value={user.email}
              onChange={this.handleChange}
            />
            <Input
              name="username"
              type="text"
              value={user.username}
              onChange={this.handleChange}
            />
            <Input
              name="password"
              type="password"
              value={user.password}
              onChange={this.handleChange}
            />

            <UploadButton
              buttonName="Avatar file"
              handleImageUpload={this.handleImageUpload}
            />
            <Image src={user.avatar} style={styles.img} rounded />
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignUp;
