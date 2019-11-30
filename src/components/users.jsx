import React, { Component } from "react";
import { loadData } from "../utils/loadData";
import { Link } from "react-router-dom";

class Authors extends Component {
  state = {
    Authors: [],
    id: " ",
    name: " ",
    email: " "
  };

  async componentDidMount() {
    const Authors = await this.getAuthors();

    console.log(Authors);

    this.setState({
      Authors
    });
  }
  getAuthors = async () => {
    const data = loadData(`http://localhost:3066/`);
    console.log(data);
    return data;
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = this.state;
    console.log("this the data", data);
    const response = await fetch("http://localhost:3066/form/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    console.log(response);
    const reply = await response;
    if (reply.status === 200) {
      alert("Comment Saved!");
    }
    if (reply.status !== 200) {
      alert("womp womp");
    }
  };

  render() {
    const { Authors } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your id
            <input
              type="text"
              placeholder="Your id"
              name="id"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Your Name
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Your Email
            <input
              type="text"
              placeholder="Your email"
              name="email"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <h1>Hi</h1>
        {Authors.map((auth, id) => (
          <div key={auth.id}>
            <Link to={`/auth/${auth.id}`}>
              <p>{auth.name}</p>
              <p>{auth.name}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Authors;
