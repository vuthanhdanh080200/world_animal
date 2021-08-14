import React, { Component } from "react";
import { Form, Button, Image, InputGroup, FormControl } from "react-bootstrap";
import PostServices from "../services/postServices";

import Input from "./form/input";
import "./addPost.css";

export class AddPost extends Component {
  state = {
    post: {
      title: "",
      src: "",
      tags: "",
      type: "",
    },
  };

  postServices = new PostServices();

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submmited", this.state.post);
    const post = await this.postServices.createPost(this.state.post);
    this.props.history.push("/");
  };

  handleChange = (e) => {
    const post = { ...this.state.post };
    console.log(e.currentTarget.value);
    post[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ post });
  };

  handleImageUpload = (image) => {
    const post = { ...this.state.post };
    post["image"] = image;
    this.setState({ post });
  };

  render() {
    const { post } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="form"
          style={{
            marginTop: 20,
            minWidth: "80%",
            overflow: "hidden",
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Give your post a title</Form.Label>
              <Form.Control
                required
                name="title"
                value={post.title}
                onChange={this.handleChange}
                as="textarea"
                rows={3}
                placeholder="Describe your post"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Choose source type</Form.Label>
              <div style={{ flex: 1, flexDirection: "row" }}>
                <input
                  required
                  type="radio"
                  name="type"
                  value="image"
                  onChange={this.handleChange}
                />
                <label style={{ paddingInline: 5 }}>Image</label>
                <input
                  required
                  type="radio"
                  name="type"
                  value="video"
                  onChange={this.handleChange}
                />
                <label style={{ paddingInline: 5 }}>Video</label>
              </div>
            </Form.Group>
            <Input
              name="src"
              type="url"
              value={post.src}
              onChange={this.handleChange}
            />
            {post.type === "image" && (
              <Image
                src={post.src}
                style={{
                  padding: "20px",
                }}
                rounded
              />
            )}
            {post.type === "video" && (
              <iframe
                width="727"
                height="409"
                src={post.src}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            <br />
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddPost;
