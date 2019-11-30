import React, { Component } from "react";
import { loadData } from "../utils/loadData";

class Post extends Component {
  state = {
    post: [],
    comments: [],
    username: [],
    comment: []
  };
  async componentDidMount() {
    const post = await this.getPost(this.props.match.params.id);
    this.setState({
      post: post
    });
  }
  getPost = async id => {
    const data = await loadData(`http://localhost:3066/post/${id}`);
    return data;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, comment } = this.state;
    const post = this.props.match.params.id;

    const data = { post, username, comment };
    this.addComment(data);
  };

  handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target.value);

    this.setState({
      [name]: value
    });
  };

  addComment = async data => {
    const response = await fetch("http://localhost:3066/post/add/comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const reply = await response;
    if (reply.status === 200) {
      alert("Comment Saved!");
    }
    if (reply.status !== 200) {
      alert("womp womp");
    }
  };

  render() {
    const { post, name, comment, comments } = this.state;

    console.log(post.title);
    return (
      <>
        <div>
          <ul>
            <h1>Hi there</h1>
            <h4>{post.title}</h4>
            <h1>{post.content}</h1>
          </ul>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Your Name
                <input
                  type="text"
                  value={name}
                  placeholder="Your Name"
                  name="username"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Your Comment:
                <textarea
                  name="comment"
                  value={comment}
                  placeholder="Your Comment"
                  onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
              </label>
            </form>
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  <h3>{comment.username} says:</h3>
                  <p>{comment.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
