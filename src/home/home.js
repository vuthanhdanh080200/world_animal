import React, { Component } from "react";
import CardCus from "../components/card/cardCus";
import PostServices from "../services/postServices";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react";

export class Home extends Component {
  posts = [];
  postServices = new PostServices();
  offset = 0;
  constructor() {
    super();
    makeObservable(this, {
      posts: observable,
      offset: observable,
      handleVote: action,
      getMorePost: action,
    });
  }

  async componentDidMount() {
    this.getMorePost();
    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >
        document.body.scrollHeight - 500
      )
        this.getMorePost();
    });
  }

  getMorePost = async () => {
    let posts = await this.postServices.getPostByOffset(this.offset);
    this.posts.push(...posts);
    this.offset += 10;
  };

  handleVote = async (isUpVote, postId) => {
    if (isUpVote) {
      await this.postServices.upVote(postId);
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].postId === postId) this.posts[i].upVote += 1;
      }
    } else {
      await this.postServices.downVote(postId);
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].postId === postId) this.posts[i].downVote += 1;
      }
    }
  };

  render() {
    const { posts } = this;
    return (
      <div>
        {posts.map((item, index) => (
          <div className="" key={index}>
            <CardCus card={item} key={index} handleVote={this.handleVote} />
          </div>
        ))}
      </div>
    );
  }
}

export default observer(Home);
