import BaseService from "../common/baseService";
import { environments } from "../environments/enviroments";
import axios from "axios";

const http = axios.create({
  baseURL: environments.baseUrl + "posts/",
  timeout: 1000,
});

export class PostServices extends BaseService {
  constructor() {
    super(http);
  }

  async getPostByOffset(offset) {
    const results = await this.get(`${offset}`);
    return results.data;
  }

  async createPost(post) {
    const results = await this.post("", post);
    console.log("create post", results);
    return results.data;
  }

  async updatePost(postId, post) {
    const results = await this.put(`${postId}`, post);
    console.log("update post", results);
    return results.data;
  }

  async deletePost(postId) {
    const results = await this.delete(`${postId}`);
    return results.data;
  }

  async upVote(postId) {
    const results = await this.get(`upvote/${postId}`);
    return results.data;
  }

  async downVote(postId) {
    const results = await this.get(`downvote/${postId}`);
    return results.data;
  }
}

export default PostServices;
